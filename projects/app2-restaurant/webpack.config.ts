import { Configuration, container } from 'webpack';
const deps = require("./../../package.json").dependencies;

export function getWebpackConfig(mode: 'none' | 'development' | 'production' = 'development'): Configuration {
    return {
        output: {
            publicPath: 'http://localhost:4204/',
            uniqueName: 'restaurant',
        },
        experiments: {
            topLevelAwait: true,
        },
        optimization: {
            runtimeChunk: false,
        },
        plugins: [
            new container.ModuleFederationPlugin({
                name: 'restaurant',
                library: { type: 'var', name: 'restaurant' },
                filename: `${mode === 'production' ? 'remoteRestaurant.js?id=[chunkhash]' : 'remoteRestaurant.js'}`,
                exposes: {
                    RestaurantModule: 'projects/app2-restaurant/src/app/restaurant/restaurant.module.ts'
                },
                shared: {
                    '@angular/core': {
                        eager: true,
                        singleton: true,
                        strictVersion: true,
                        requiredVersion: deps["@angular/router"]
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
                        requiredVersion: deps["@angular/router"]
                    },
                    'place-my-order-assets': { eager: true, singleton: true },
                }
            })
        ]
    };
}

export const webpackConfig: Configuration = getWebpackConfig('development');

export default webpackConfig;
