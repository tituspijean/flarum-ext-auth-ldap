FROM php:7.4-fpm

RUN groupadd dev
RUN useradd dev -g dev -d /home/dev -m

# For upgrade PHP : https://github.com/chialab/docker-php/

# Install PHP extensions and PECL modules.
RUN buildDeps=" \
        default-libmysqlclient-dev \
        libbz2-dev \
        libmemcached-dev \
        libsasl2-dev \
    " \
    runtimeDeps=" \
        curl \
        git \
        libfreetype6-dev \
        libicu-dev \
        libjpeg-dev \
        libldap2-dev \
        libmemcachedutil2 \
        libpng-dev \
        libpq-dev \
        libxml2-dev \
        libzip-dev \
        libonig-dev \
    " \
    && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y $buildDeps $runtimeDeps \
    && docker-php-ext-install bcmath bz2 calendar iconv intl mbstring mysqli opcache pdo_mysql pdo_pgsql pgsql soap zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu/ \
    && docker-php-ext-install ldap \
    && docker-php-ext-install exif \
    && pecl install memcached redis \
    && docker-php-ext-enable memcached.so redis.so \
    && apt-get purge -y --auto-remove $buildDeps \
    && rm -r /var/lib/apt/lists/*

### COMMON EXT
RUN apt-get update && apt-get install -y --no-install-recommends wget zip unzip dnsutils libzip-dev \
    gnupg gnupg1 gnupg2 rsync bzip2 openssh-client ssh whois ntp

### XDEBUG
RUN apt-get update && pecl install xdebug && docker-php-ext-enable xdebug.so

# COMPOSER
RUN curl -sSk https://getcomposer.org/installer | php -- --disable-tls && \
    mv composer.phar /usr/local/bin/composer && \
    rm -rf /var/lib/apt/lists/*
RUN composer --global config process-timeout 6000

### Move php.ini
COPY php.ini /usr/local/etc/php/
COPY php-fpm-pool.conf /usr/local/etc/php-fpm.d/www.conf

### NODEJS
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt-get install -y nodejs build-essential

# FIX FILES
RUN mkdir /.composer && chmod -R 777 /.composer && \
    mkdir /.npm && chmod -R 777 /.npm && \
    mkdir /.config && chmod -R 777 /.config

CMD ["php-fpm"]
