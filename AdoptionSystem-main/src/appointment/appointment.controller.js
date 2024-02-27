'use strict'
import Animal from '../animal/animal.model.js'
import Appointment from './appointment.model.js'
import User from '../user/user.model.js'

export const save=async(req,res)=>{
    try {
        //CAPTURAR LA DATA
        let data=req.body
        data.user=req.user._id    
         
        //VERIFICAR QUE EXISTA EL ANIMAL
        let animal=await Animal.findOne({_id: data.animal})
        
        if(!animal) return res.status(404).send({message: 'Animal not found'})
        //VALIDAR QUE LA MASCOTA NO TENGA UNA CITA ACTIVA CON ESA PERSONA

        //validar si un animal ya tiene cita  o si el usuario ya tiene cita
        //EJERCICIO El usuario solo puede tener una cita por día           
        let appointmentExist = await Appointment.findOne({
            $or:[
                {
                    animal: data.animal,
                    user: data.user                   
                },
                {
                    date: data.date,
                    user: data.user
                }
                
            ]
        })
        if(appointmentExist) return res.send({message: 'Appointment already exist'})
        
        //GUARDAR
        let appointment=new Appointment(data)
        await appointment.save()
        return res.send({message: `Appointmente is saven successfully for de date ${appointment.date}`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error saving appointment', error})
    }
}

export const getAppointmentsByUser=async(req,res)=>{
    try {
        //capturar el id del usuario logeado
        let {_id}=req.user
        //buscar los datos ({parametro: 0})
        let appointments=await Appointment.find({ user: _id}, {user: 0})
            .populate('animal')
        //Respondo
        return res.send({message: 'Your appointments: ', appointments})

    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error gettin appointments', error})
    }
}