'use strict'

import express from 'express'
import { save, getAppointmentsByUser } from './appointment.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api=express.Router()

//RUTAS PRIVADAS - CLIENT
api.post('/save', [validateJwt], save)
api.get('/getMyAppointments', [validateJwt], getAppointmentsByUser)

export default api