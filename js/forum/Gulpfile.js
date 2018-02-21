var gulp = require('flarum-gulp');

gulp({
  modules: {
    'tituspijean/flarum-ext-auth-ldap': 'src/**/*.js'
  }
});
