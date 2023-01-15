//const express = require('express')
import express from 'express'

import UserRoutes from './routes/UserRoutes.js'
import db from './config/db.js'

// crear la ap
console.log("inicio proyecto...")

const app = express()

//habilitar lectura de datos de formularios...
app.use( express.urlencoded({extended:true}) )

//conexión a la la bd
try {
    await db.authenticate();
    db.sync();
    console.log('conexión correcta a la bd...')
} catch (error) {
    console.log(error)
}

//habilitar pug
app.set('view engine', 'pug')
app.set('views','./views')

//Carpeta Publica
app.use(express.static('public'))



app.use('/auth', UserRoutes)



const port = 3000;
app.listen(port, () =>{
    console.log(`Servidor está funcionando en el puerto ${port}`)
});