FROM php:8.3-fpm-alpine

WORKDIR /app

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && sync

RUN apk update && apk add --no-cache \
      zip \
      wget \
      curl \
      unzip \
      git \
      bash \
    && install-php-extensions \
      intl \
      pdo_pgsql \
      zip \
      sockets \
      @composer \
    && rm -rf /var/cache/apk/*

ENV COMPOSER_ALLOW_SUPERUSER=1
#
#COPY . .
#RUN  composer install && \
#  composer dump-env prod && \
#  php bin/console c:w && \
#  mkdir var/storage && \
#  chmod -R 777 var/*
#
#CMD php bin/console d:m:m --no-interaction && php-fpm -D && /usr/bin/supervisord -n -c /etc/supervisord.conf
#CMD php-fpm -D && /usr/bin/supervisord -n -c /etc/supervisord.conf
