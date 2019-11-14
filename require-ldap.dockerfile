FROM composer:latest as composer

FROM php:7.2-fpm-alpine
COPY --from=composer /usr/bin/composer /usr/bin/composer

ARG INSTALL_PATH=/app

RUN apk --no-cache add composer git openldap-dev libldap
RUN docker-php-ext-install ldap

WORKDIR ${INSTALL_PATH}
VOLUME ${INSTALL_PATH}

CMD composer require tituspijean/flarum-ext-auth-ldap