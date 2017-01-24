var gulp = require('flarum-gulp');

gulp({
  modules: {
    'flarum/auth/saml2': 'src/**/*.js'
  }
});
