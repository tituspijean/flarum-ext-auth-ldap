rm -rf /var/www/flarum
mkdir /var/www/flarum
cd /var/www/flarum || exit
echo "Installing Flarum ..."
composer create-project flarum/flarum . --stability=dev

echo "Installing LDAP extension ..."
composer require tituspijean/flarum-ext-auth-ldap "dev-master"
rm -rf /var/www/flarum/vendor/tituspijean/flarum-ext-auth-ldap
ln -s /var/www/ /var/www/flarum/vendor/tituspijean/flarum-ext-auth-ldap
