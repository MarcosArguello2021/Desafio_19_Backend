# **Desafío: REFORMAR PARA USAR GRAPHQL**. Curso CoderHouse Backend Node.Js

## Consignas:

* En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL.
* Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.
* utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.

## Como ejecutar el proyecto de manera local:

* Ejecutar el comando `npm install`
* Se debe crear un archivo de configuraracion `.env` con los siguientes datos

```
MONGO_USER = "<usuario Mongo Atlas>"
MONGO_PASS = "<contraseña Mongo Atlas>"
MONGO_CLUSTER = "<@clusterx.asd123.mongodb.net/test>"
GOOGLE_APLICATION_CREDENTIALS = "<google credentials>"
PUERTO = 8080

ACCOUNT_SID = ""
AUTH_TOKEN = ""
NRO_WSP = "<número whatsapp aporbado para recibir mensajes>"
NRO_TWILIO = "<número de twilio>"

TEST_MAIL = "<cuenta de correo gmail>"
TEST_MAIL_PASS = "<contraseña correo prueba>"
```

* Ejecutar el comando `npm run start` o ` npm run start -- --puerto <n° de puerto>`
* Para probar/testear los diferentes rutas y funcionalidades, se recomienda utilizar [Postman](https://www.postman.com/downloads/)´

## Resultado de las pruebas:
