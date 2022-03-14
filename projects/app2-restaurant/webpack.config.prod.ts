import { getWebpackConfig } from './webpack.config';
import { Configuration } from 'webpack';

export const prodWebpackConfig: Configuration = {
    ...getWebpackConfig('production'),
    output: {
        publicPath: 'ttp://localhost:81/', // production server,
        uniqueName: 'restaurant',
    },
};

export default prodWebpackConfig;
