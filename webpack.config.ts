
import { Configuration, container } from 'webpack';
// https://github.com/module-federation/module-federation-examples/blob/d5cf265c2d4fd040797cbae806badd8267ad5b8f/advanced-api/dynamic-remotes-synchronous-imports/app1/webpack.config.js
const deps = require("./package.json").dependencies;

export function getWebpackConfig(mode: 'none' | 'development' | 'production' = 'development'): Configuration {
    return {
        mode: mode,
        output: {
            publicPath: 'http://localhost:4200/',
            uniqueName: 'home',
        },
        experiments: {
            topLevelAwait: true,
        },
        optimization: {
            runtimeChunk: false,
        },
        plugins: [
            new container.ModuleFederationPlugin({
                name: 'home',
                library: { type: 'var', name: 'home' },
                filename: `${mode === 'production' ? 'remoteHome.js?id=[chunkhash]' : 'remoteHome.js'}`,
                exposes: {
                    HomeComponent: './src/app/modules/home/home.component.ts'
                },
                shared: {
                    '@angular/core': {
                        eager: true,
                        singleton: true,
                        strictVersion: true,
                        requiredVersion: deps['@angular/core']
                    },
                    '@angular/common': {
                        eager: true,
                        singleton: true,
                        strictVersion: true,
                        requiredVersion: deps["@angular/common"]
                    },
                    '@angular/router': {
                        eager: true,
                        singleton: true,
                        strictVersion: true,
                        requiredVersion: deps["@angular/router"],
                    },
                    'utils': { singleton: true, eager: true },
                    '@ngxs/store': { singleton: true, eager: true },
                    '@ngxs/devtools-plugin': {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps["@ngxs/devtools-plugin"]
                    },
                    'ngx-quicklink': {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps["ngx-quicklink"]
                    },
                    'lodash-es': {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps["lodash-es"]
                    },
                    'rxjs': {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps["rxjs"]
                    },
                }
            })
        ]
    };
}

export const webpackConfig: Configuration = getWebpackConfig('development');

// Angular Compiler need it
export default webpackConfig;
