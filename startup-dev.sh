#!/bin/sh

cd ./auth
docker compose up development -d
cd ..

cd ./gateway
docker compose up development -d
cd ..

cd ./web
docker compose up development -d
cd ..