var gulp = require('flarum-gulp');

gulp({
  modules: {
    'flarum/auth/ldap': 'src/**/*.js'
  }
});
