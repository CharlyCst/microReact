const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  const pluggins = [
    new HtmlWebpackPlugin({
      inlineSource: ".(ts|tsx|jsx|js|css)$",
      template: "index.html"
    })
  ];
  // Inline JS for production build
  if (env && env.production)
    pluggins.push(new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin));

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

    plugins: pluggins
  };
};
