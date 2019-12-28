const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  // Add inline plugging in production mode
  const plugins =
    env && env.production
      ? [
          new HtmlWebpackPlugin({
            inlineSource: ".(ts|tsx|jsx|js|css)$",
            template: "index.html"
          }),
          new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
        ]
      : [];

  return {
    mode: "development",

    entry: "./src/index.tsx",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx"]
    },

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        }
      ]
    },

    plugins: plugins
  };
};
