import { getWebpackConfig } from './webpack.config';
import {Configuration} from 'webpack';

export const prodWebpackConfig: Configuration = {
  ...getWebpackConfig('production'),
  output: {
    publicPath: 'http://localhost:80/', // production server,
    uniqueName: 'home'
  },
};

export default prodWebpackConfig;
