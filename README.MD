Ce projet front-end utilise **Node.js**, **Babel** et **Webpack** pour compiler et bundler le code JavaScript. Il est conçu pour fonctionner avec l'API backend du projet et afficher les données de manière interactive.

### Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **Node.js** : Vous pouvez le télécharger et l'installer depuis [nodejs.org](https://nodejs.org/).
- **npm** : Fournit avec Node.js. Il est utilisé pour gérer les dépendances du projet.

### Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/info802-chevalier/frontend.git
   ```

2. Installez les dépendances:
   ```
   npm install
   ```

### Configuration Webpack

Le projet utilise Webpack pour gérer les fichiers JavaScript et autres ressources. Voici la structure de base de la configuration Webpack dans le fichier **`webpack.config.js`** :

```js
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
```

### Développement

1. Compiler les fichiers .js

   ```bash
   npx webpack
   ```

2. Lancer le projet

   ```bash
   npm start
   ```

   Le projet est disponible à l'adresse [http://localhost:3000](http://localhost:3000)

3. (Optionnel)
   Le fichier **`api.js`** dans **`./src/services/api.js`** est configuré pour fonctionner avec le déploiement Vercel.
   Pour utiliser l'api en local, changez la variable globale **`API_URL`** du fichier par : **`http://localhost:5000/api`**
