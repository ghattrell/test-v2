FROM php:7.1-fpm

# Lets install some helpful things
RUN DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -qq -y \
      curl \
      git \
      zip unzip

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl

# Install Laravel dependencies like gulp and composer
RUN curl -sS https://getcomposer.org/installer -o setup-composer.php && php setup-composer.php --install-dir=/usr/local/bin --filename=composer

RUN composer config -g github-oauth.github.com ebf0dfcbf15d49aeb8a683738d51ba01bd47fd76
