import path from 'path';
import url from 'url';
import miniCssExtractPlugin from 'mini-css-extract-plugin';
import cssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';

const root = path.dirname(
  path.normalize(path.join(url.fileURLToPath(import.meta.url), '..')),
);

export default () => ({
  devtool: 'source-map',
  entry: path.join(root, 'src', 'luffer-carousel-vanilla.ts'),
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      { test: /\.css$/, use: [miniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.(svg)$/, type: 'asset/inline' },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new cssMinimizerWebpackPlugin(), new miniCssExtractPlugin()],
  },
  output: {
    clean: true,
    filename: 'luffer-carousel-vanilla.js',
    globalObject: 'this',
    library: {
      type: 'module',
    },
    path: path.resolve(root, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
});
