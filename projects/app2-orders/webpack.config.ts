import { Configuration, container } from 'webpack';
const deps = require('./../../package.json').dependencies;

export function getWebpackConfig(mode: 'none' | 'development' | 'production' = 'development'): Configuration {
    return {
        output: {
            publicPath: 'http://localhost:4205/',
            uniqueName: 'orders',
        },
        experiments: {
            topLevelAwait: true,
        },
        optimization: {
            runtimeChunk: false,
        },
        plugins: [
            new container.ModuleFederationPlugin({
                name: 'orders',
                library: { type: 'var', name: 'orders' },
                filename: `${mode === 'production' ? 'remoteOrders.js?id=[chunkhash]' : 'remoteOrders.js'}`,
                exposes: {
                    OrderModule: './projects/app2-orders/src/app/order/order.module.ts',
                    OrderComponent: './projects/app2-orders/src/app/order/order.component.ts'
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
                        requiredVersion: deps['@angular/common']
                    },
                    '@angular/router': {
                        eager: true,
                        singleton: true,
                        strictVersion: true,
                        requiredVersion: deps["@angular/router"]
                    },
                    'utils': { singleton: true, eager: true },
                    '@ngxs/store': {
                        eager: true,
                        singleton: true,
                        requiredVersion: deps["ngxs/store"]
                    },
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

export default webpackConfig;
