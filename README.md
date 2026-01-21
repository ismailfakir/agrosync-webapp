# Agrosync web application

publishing & subscribing sensore data using mqtt

## mqtt + hivemq + typescript pub sub

## how to run
add .env file in the root of the project and add the following:
``` bash
VITE_MQTT_BROKER_URL='wss://<BROKER>.s1.eu.hivemq.cloud:8884/mqtt'
VITE_MQTT_USERNAME='<USER>'
VITE_MQTT_PASSWORD='<PASSWORD>'
```
Run the web app using the commands
``` bash
$ npm install
$ npm run dev
```


