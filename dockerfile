# Используем официальный образ PHP с Apache
FROM php:8.2-apache

# Устанавливаем зависимости для Composer
RUN apt-get update && apt-get install -y \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip

# Устанавливаем Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Копируем файлы вашего проекта в папку сервера
COPY . /var/www/html/

# Устанавливаем библиотеки через Composer
WORKDIR /var/www/html
RUN composer install --no-dev --optimize-autoloader

# Разрешаем Apache работать на порту, который даст Render
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Включаем модуль перенаправления (на всякий случай)
RUN a2enmod rewrite

EXPOSE 80
