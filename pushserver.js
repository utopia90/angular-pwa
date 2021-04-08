let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let webpush = require('web-push'); // Claves públicas y privadas para enviar notificaciones push

// Definimos la instancia de la aplicación web "Express" de Servidor
let app = express();

// ***** CONFIGURACIONES DE LA APLICACIÓN ********
app.use(bodyParser.urlencoded({
  extended: false
}))

// Hacer uso de JSON en las peticiones y respuestas de esta aplicación
app.use(bodyParser.json());

// Configuramos en CORS (Cross Origin) para que puedan realizar peticiones a la aplicación
app.use(cors());


// ************** RUTAS DE LA APLICACIÓN *********

// -> GET ('http://localhost:3000/') (PRUEBA de que funciona)
app.get('/', (req, res) => {
  // res.send('Probando API Restful'); // Mensaje plano
  res.status(200).json({
    mensaje: 'Probando API Restful'
  });
});

// -> POST ('http://localhost:3000/subscribe')
// Ruta para que el cliente se suscriba a las notificaciones push
// a través de Web Push
app.post('/subscribe', (req, res) => {

  // Obtenemos el BODY de la petición POST
  // En el body se encuentra la PushSubscription
  let body = req.body;

  // Definimos las claves Públicas y Privadas de Web-Push
  // Las vamos a obtener a través del comando:
  // ** web-push generate-vapid-keys
  // * Pública:
  // BFdgtv35vCLg4Hqd-I8dzsR2wZzdWj_zqycW9bkXUp_TPGu-aYflPdx8fmPyt2837BoeYFU_sC8Khdp_kvmzQSU
  // * Privada:
  // iZsmV0KJJ0ltYGeb90x4CliHFKwAvf7JJ9pTep7vJeg

  // Configuramos WebPush con las claves y el email al que mandar un mensaje
  webpush.setVapidDetails(
    'mailto:martin@imaginagroup.com',
    'BFdgtv35vCLg4Hqd-I8dzsR2wZzdWj_zqycW9bkXUp_TPGu-aYflPdx8fmPyt2837BoeYFU_sC8Khdp_kvmzQSU',
    'iZsmV0KJJ0ltYGeb90x4CliHFKwAvf7JJ9pTep7vJeg'
  );


  // Configuramos La Notificación Push que vamos a enviar al cliente (Angular)
  // Este es el contenido que le llegará en el mensaje (título, cuerpo del mensaje e icono)
  let payload = JSON.stringify({
    "notification": {
      "title": "Martín API Restful",
      "body": "Gracias por suscribirte a nuestra NewsLetter",
      "icon": "https://image.pngaaa.com/128/3000128-middle.png"
    }
  });

  // Enviar la notificación al cliente y cuando se haya enviado, entonces
  // enviamos un mensaje de éxito
  Promise.resolve(
    webpush.sendNotification(body, payload)
  ).then(() => {
    // Si todo ha ido bien:
    res.status(200).json({
      mensaje: 'Notificación enviada con éxito'
    });
  }).catch(err => {
    // Si algo ha salido mal:
    console.log('Error en el servidor:', err);
    res.status(500).json({
      mensaje: 'Error en el servidor',
      error: err
    })
  });
})






// *************** DESPLIEGUE DE LA APLICACIÓN ********
// DESPLEGAMOS LA APLICACIÓN EN EL PUERTO 3000

app.listen(3000, () => {
  console.log('PushServer desplegado y escuchando en el puerto 3000...')
});












