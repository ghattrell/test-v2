#!/usr/bin/env sh
set -eu

WEB_HOST="$HOSTNAME.r.bark.com"
API_HOST="$HOSTNAME-api.r.bark.com"

envsubst '${API_HOST}' < /nginx/templates/api.template.conf > /etc/nginx/conf.d/api.conf
envsubst '${WEB_HOST}' < /nginx/templates/web.template.conf > /etc/nginx/conf.d/web.conf

exec "$@"