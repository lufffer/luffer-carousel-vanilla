import path from 'path';
import url from 'url';
import htmlWebpackPLugin from 'html-webpack-plugin';
import miniCssExtractPlugin from 'mini-css-extract-plugin';

const root = path.dirname(
  path.normalize(path.join(url.fileURLToPath(import.meta.url), '..'))
);

export default () => ({
  devServer: {
    hot: true,
    static: path.join(root, 'dist'),
    watchFiles: [path.join(root, 'src', '**', '*.html')],
  },
  devtool: 'eval-source-map',
  entry: path.join(root, 'src', 'index.ts'),
  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, use: [miniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.(jpg|svg)$/, type: 'asset/resource' },
    ],
  },
  output: {
    clean: true,
    filename: 'bundle.js',
    path: path.resolve(root, 'dist'),
  },
  plugins: [
    new htmlWebpackPLugin({ template: path.join(root, 'src', 'index.html') }),
    new miniCssExtractPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
});
