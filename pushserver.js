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

// - GET ('http://localhost:3000/') (PRUEBA de que funciona)
app.get('/', (req, res) => {
  res.send('Enviamos un mensaje')
});



// *************** DESPLIEGUE DE LA APLICACIÓN ********
// DESPLEGAMOS LA APLICACIÓN EN EL PUERTO 3000

app.listen(3000, () => {
  console.log('PushServer desplegado y escuchando en el puerto 3000...')
});












