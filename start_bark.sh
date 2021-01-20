cd "docker"

docker-compose stop
docker-compose up --build -d

docker-compose exec recruit-api chown -R www-data /var/www/api
docker-compose exec recruit-api composer install
docker-compose exec recruit-api php artisan key:generate
docker-compose exec recruit-api php artisan config:cache
docker-compose exec recruit-api php artisan migrate --seed

if which xdg-open > /dev/null
then
  xdg-open http://localhost:3500
elif which open > /dev/null
then
  open http://localhost:3500
fi
