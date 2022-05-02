rm -rf /var/www/flarum
mkdir /var/www/flarum
cd /var/www/flarum || exit
echo "Installing Flarum ..."
composer create-project --stability=dev flarum/flarum .
composer config minimum-stability dev

echo "Installing LDAP extension ..."
composer config repositories.repo-name path /var/www
composer require tituspijean/flarum-ext-auth-ldap
