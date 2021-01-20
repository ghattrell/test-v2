# Bark Recruitment Challenge

Welcome to the Bark Recruitment Challenge. The aim of this readme is to get your development environment set up as 
quickly as possible, so you can spend more time coding and less messing around with docker or vagrant.

Once setup, you can access the app at [http://localhost:3500](http://localhost:3500)

# Setup
The easiest way to set up the development environment, is using docker. However, you may find you have issues with 
docker, because you are on windows, or you have some version requirements, so you can also use homestead. 

## Docker Setup

You should be able to run the Bark Recruitment Challenge locally using docker. This will require
[Docker](https://www.docker.com/products/docker-desktop) to be installed. There should not be any other installation 
requirements.

To simplify the startup, we have created a script (`start_bark.sh`).

This will:

1. Build the docker containers
2. Update required permissions
3. Run composer install
4. Perform any migrations/seeds
5. Open the site in your default browser

If you have issues with your docker containers, and want to completely rebuild them, you can run `force_refresh_bark.sh`
which will stop and destroy the containers before trying to rebuild them.

## Homestead (Vagrant) setup
Laravel have a nifty development environment called [Homestead](https://laravel.com/docs/5.5/homestead). Note that as 
this test uses Laravel 5.5, you should make sure you're referencing the correct documentation.

Make sure you have [Virtual Box 5.2](https://www.virtualbox.org/wiki/Download_Old_Builds_5_2) and 
[Vagrant](https://www.vagrantup.com/downloads.html) installed.

Follow the "first steps" in the [Homestead documentation](https://laravel.com/docs/5.5/homestead#first-steps)

You can use the `vagrant/Homestead.example.yarn` (ensure you update the file paths). If you already have a vagrant 
setup, then you will know best how to integrate that file into your current setup that. 

You will also need to add the 2 entries in `vagrant/hosts.example` to your `/etc/hosts` file or equivalent

You will also need to follow these specific code changes:

1. In `api/.env` update the `DB_HOST` to be `127.0.0.1`
2. In `web/assets/js/index.js` set the apiHost to `http://bark-recruit-api.local`
3. In `web/assets/js/professionals.js` set the apiHost to `http://bark-recruit-api.local`

# Running Unit Tests
You can use phpunit to run unit tests. You should run this inside docker/vagrant.

Docker (from the repo root directory):
```
cd docker
docker-compose exec recruit-api vendor/phpunit/phpunit/phpunit
```


Vagrant: (assuming you are using `Homestead.example.yaml`)
```
vagrant ssh -c '/home/vagrant/bark-recruit-api/vendor/phpunit/phpunit/phpunit'
```

