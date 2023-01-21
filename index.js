//const express = require('express')
import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'


import UserRoutes from './routes/UserRoutes.js'
import PropertieRoutes from './routes/PropertiesRoutes.js'

import db from './config/db.js'


// crear la ap
console.log("inicio proyecto...")

const app = express()

//habilitar lectura de datos de formularios...
app.use( express.urlencoded({extended:true}) )

// habilitar cookie-parser
app.use( cookieParser() )

// Habilitar CSRF
app.use( csrf({cookie: true}) )

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


// Routing
app.use('/auth', UserRoutes)
app.use('/', PropertieRoutes)



const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Servidor está funcionando en el puerto ${port}`)
});