# Flarum LDAP authentication

This extension enables users to log into [Flarum](https://github.com/flarum/core) through LDAP.

## How to install

`composer require tituspijean/flarum-ext-auth-ldap` and activate it in Flarum's administration panel.

## Languages

This extension is translated in French and English.

## Configuration

![Screenshot](https://user-images.githubusercontent.com/8769166/82216722-aa61f500-9919-11ea-81d8-a06107c8020a.png)

- `LDAP server name`: sets the end of the `Login with` link at the top of the forum: ![image](https://user-images.githubusercontent.com/8769166/82216921-eeed9080-9919-11ea-9ae5-8c795816f3fa.png)
- `LDAP domains or server IP adresses (comma separated)`: list of LDAP servers to use.
- `Base DNs (semicolon separated)`: list of base DNs to search users in.
- `Filter to apply (optional)`: Additional filtering, for example require users to be in a specific group.
- `Port`: LDAP server port
- `Follow referrals`, `Use SSL`, `Use TLS`: LDAP server settings
- `LDAP admin distinguished name` and `LDAP admin password (leave empty for anonymous binding)` : if needed, specific the DN and password of the user allowed to perform searches in the LDAP server.
- `LDAP user search fields (comma separed)`: list of the LDAP fields used to look for the users. The extension will try all combinations of base DNs and search fields.
- `LDAP user mail field`: name of the field containing the user's email address. The extension will use the first email found for the user's registration in Flarum.
- `LDAP username field`: name of the field containing the username that uniquely identifies the user. Can be `uid` or `sAMAccountname`, for example.
- `Disable Flarum login and only use LDAP authentication`: merely hides the standard login links and buttons. Users can still use the standard login method through the API.
