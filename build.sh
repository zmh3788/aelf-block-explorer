#!/bin/sh

NGINX_CONF="/etc/nginx/conf.d"
ROOT_DIR="/opt/aelf/app/explorer"

npm i && npm run build

cp -rf dist $ROOT_DIR

cp -f explore.conf $NGINX_CONF

nginx -s reload