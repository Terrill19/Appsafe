const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// PUERTO 
const port = process.env.PORT || 3000;

//RUTAS
const usuarios=require('./routes/usuarios');
const vigilantes=require('./routes/vigilantes');
const registros=require('./routes/registros');
const prestamos=require('./routes/prestamos');
const motos=require('./routes/motos'); 


// Middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(usuarios); 
app.use(vigilantes);
app.use(registros);
app.use(prestamos);
app.use(motos); 


//MONGODB
mongoose.connect('mongodb://localhost:27017/appsafe', { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log(`Error al conectar a la db ${err}`)
    } else {
       console.log('Conexión a la db  establecida')
    }
    app.listen(port, () => {
        console.log(`Connected on port ${port}`)
    })

})    

