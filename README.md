# bem-template-loader
Template preprocessor for Vue SFC to simplify BEM classes usage.

```js
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

},

// ...

```
