#/bin/bash

cd server
npm install
npm start &

cd ../client

npm install
npm start &

