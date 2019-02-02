# bem-template-loader
Template preprocessor for Vue SFC to simplify BEM classes usage.

```js
// ...

resolveLoader: {
   modules: [
      path.resolve(config.clientBuildPath, 'node_modules'),
      path.resolve(config.clientBuildPath, 'build'),
   ],
},

// ...

module: {
   rules: [
      // ...
      {
         test: /\.vue$/,
         loader: 'vue-loader',
         options: {
            loaders: {
               js: 'babel-loader',
               html: 'bem-loader',
            },
         },
      },
      // ...
   ],
},

// ...

```
