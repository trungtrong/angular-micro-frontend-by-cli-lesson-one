import webpackConfig from './webpack.config';
import {Configuration} from 'webpack';

export const prodWebpackConfig: Configuration = {
  ...webpackConfig,
  output: {
    publicPath: 'http://localhost:80/', // production server,
    uniqueName: 'home'
  },
};

export default prodWebpackConfig;
