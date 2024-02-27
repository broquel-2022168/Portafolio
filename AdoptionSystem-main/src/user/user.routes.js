'use strict'
//Rutas del usuario

import express from 'express'
import { test, register, login, update, deleteU } from './user.controller.js'
import {validateJwt, isAdmin} from '../middlewares/validate-jwt.js'

const api = express.Router()

//middleware
api.get('/test', [validateJwt, isAdmin], test)
api.post('/register', register)
api.post('/login',  login)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteU)

export default api

//export const api <- tengo si o si el nombre que está en este archivo Ej: api
//export default api <- importar con otro nombre Ej: userRoutes