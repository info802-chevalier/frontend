const path = require("path");

module.exports = {
  entry: "./src/index.js", // Point d'entrée
  output: {
    filename: "bundle.js", // Fichier de sortie
    path: path.resolve(__dirname, "public"), // Destination
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Transforme le code ES6+ en JS compatible
        },
      },
    ],
  },
  mode: "development", // Mode (dev ou production)
};
