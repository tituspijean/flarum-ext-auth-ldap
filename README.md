# Flarum LDAP authentication

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/tituspijean/flarum-ext-auth-ldap/blob/master/LICENSE) [![Latest Stable Version](https://img.shields.io/packagist/v/tituspijean/flarum-ext-auth-ldap.svg)](https://packagist.org/packages/tituspijean/flarum-ext-auth-ldap) [![Total Downloads](https://img.shields.io/packagist/dt/tituspijean/flarum-ext-auth-ldap.svg)](https://packagist.org/packages/tituspijean/flarum-ext-auth-ldap)

This extension enables users to log into [Flarum](https://github.com/flarum/core) through LDAP, there has been new improvement with this fork. With multiple LDAP server support, and optional email field.

Initially created to support [Flarum's integration](https://apps.yunohost.org/app/flarum) with [YunoHost](https://yunohost.org/), a self-hosting Debian-based OS to garden your own patch of the Internet.

Updated to Flarum 2.0 support thanks to [Yippy/flarum-ext-auth-ldap](https://github.com/Yippy/flarum-ext-auth-ldap).
[![Donate to Yippy](https://img.shields.io/badge/-Buy%20Me%20a%20Coffee-ff5f5f?logo=ko-fi&logoColor=white)](https://www.buymeacoffee.com/Yippy)

## How to install

`composer require tituspijean/flarum-ext-auth-ldap`

You must run this command for this extension to work, this is because the assets command will include select2 for the dropdown menu to work.

    `php flarum assets:publish`

![Run Flarum Assets Command](https://github.com/tituspijean/flarum-ext-auth-ldap/raw/master/assets/images/run_flarum_assets_command.png)

If you are unable to run that command, and the dropdown menu is still not working. You can copy the [asset manually](https://github.com/tituspijean/flarum-ext-auth-ldap/tree/master/assets) and move it to the [FLARUM_DATA_DIRECTORY]\assets\extensions\tituspijean-auth-ldap\ folder.

Activate it in Flarum's administration panel.

## Languages

This extension supports English.

## Configuration

![Screenshot](https://github.com/tituspijean/flarum-ext-auth-ldap/raw/master/assets/images/ldap_login_settings.png)

- `LDAP server name`: sets the end of the `Login with` link at the top of the forum: ![image](https://github.com/tituspijean/flarum-ext-auth-ldap/raw/master/assets/images/ldap_login_header.png)

- `LDAP domains or server IP adresses (comma separated)`: list of LDAP servers to use.
- `Port`: LDAP server port
- `LDAP Version`: LDAP server version
- `Base DNs (semicolon separated)`: list of base DNs to search users in.
- `Filter to apply (optional)`: Additional filtering, for example require users to be in a specific group.
- `Follow referrals`, `Use SSL`, `Use TLS`: LDAP server settings
- `LDAP admin distinguished name` and `LDAP admin password (leave empty for anonymous binding)` : if needed, specific the DN and password of the user allowed to perform searches in the LDAP server.
- `LDAP user search fields (comma separated)`: list of the LDAP fields used to look for the users. The extension will try all combinations of base DNs and search fields.
- `LDAP username field`: name of the field containing the username that uniquely identifies the user. Can be `uid` or `sAMAccountname`, for example.
- `LDAP email field (optional)`: name of the field containing the user's email address. The extension will use the first email found for the user's registration in Flarum.
- `LDAP nickname search fields, enable Nicknames extension (comma separated)`

- `Disable Flarum login and only use LDAP authentication`: merely hides the standard login links and buttons. Users can still use the standard login method through the API.
- `Display detailed LDAP errors for failed login attempts`: enable this option to help troubleshoot LDAP account errors for failed login, this will display a error whether the account isn't found, disabled or password expired.

- `Assign specific Permissions`: Automatically add User Permission Groups to newly created Users from this LDAP Server: ![image](https://github.com/tituspijean/flarum-ext-auth-ldap/raw/master/assets/images/ldap_new_user_confirmation_popup.png)

- `Enable LDAP Server`: Toggle LDAP Domain server, when disabled (Unticked) this setting will be skipped.

## Development (With docker)

- Clone the repository
- Copy docker.conf : `cp docker/.docker.conf.dist docker/.docker.conf`
- Change UID in `docker/.docker.conf` if needed.
- Start dockers : `./install.sh install`
- Open http://flarum.localhost
  * MySQL host: mysql
  * MySQL DB: flarum
  * MySQL user: flarum
  * MySQL password: flarum
- Go to Admin panel and enable extension
  * LDAP domain: ldap
  * LDAP DN: dc=flarum,dc=com
  * Check connect with Ldap admin
  * LDAP admin: cn=admin,dc=flarum,dc=com
  * LDAP admin password: flarum
  * LDAP search user fields: cn,mail
  * LDAP user mail: mail
  * LDAP user username: cn
- Add and user on : http://localhost:8081/
  * Login: cn=admin,dc=flarum,dc=com
  * Password: flarum
  * Create a new entry -> Default -> inetOrgPerson

## Support

This extension is under **minimal maintenance**.

## Links

- [GitHub](https://github.com/tituspijean/flarum-ext-auth-ldap)
- [Packagist](https://packagist.org/packages/tituspijean/flarum-ext-auth-ldap)
- [Discuss](https://discuss.flarum.org/d/34414-ldap-login-extension-with-multiple-ldap-server-support)
