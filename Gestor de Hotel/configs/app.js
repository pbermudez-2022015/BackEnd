'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from "dotenv"
import userRoutes from '../src/user/user.routes.js'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import bedroomsRoutes from '../src/bedrooms/bedrooms.routes.js'



//Configuraciones
const app = express()
config();
const port = process.env.PORT || 3056

//Configuración del servidor
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) //Aceptar o denegar solicitudes de diferentes orígenes (local, remoto) / políticas de acceso
app.use(helmet()) //Aplica capa de seguridad básica al servidor
app.use(morgan('dev')) //Logs de solicitudes al servidor HTTP

//Declaración de rutas

app.use('/user', userRoutes)
app.use('/hotel', hotelRoutes)
app.use('/bedroom', bedroomsRoutes)



//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}