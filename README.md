# Flarum LDAP authentication

This extension enables users to log into [Flarum](https://github.com/flarum/core) through LDAP.

## How to install

`composer require tituspijean/flarum-ext-auth-ldap` and activate it in Flarum's administration panel.

## Configuration


## How to develop (With docker & make)

- `make restart`
- `make install`
- Go to http://flarum.localhost
- * MySQL host: mysql
- * MySQL DB: mysql
- * MySQL user: flarum
- * MySQL password: flarum
- Go to Admin panel and enable extension
- * LDAP domain: ldap
- * LDAP DN: dc=flarum,dc=com
- * Check connect with Ldap admin
- * LDAP admin: cn=admin,dc=flarum,dc=com
- * LDAP admin password: flarum
- * LDAP search user fields: cn,mail
- * LDAP user mail: mail
- * LDAP user username: cn

