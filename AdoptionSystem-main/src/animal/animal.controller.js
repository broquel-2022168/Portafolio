'use strict'
import User from '../user/user.model.js'
import { checkUpdate } from '../utils/validator.js'
import Animal from './animal.model.js'
 
export const test = (req, res)=>{
    return res.send({Message: 'Function  test is running'})
}
 
export const save = async(req, res)=>{
    try {
        //Capturar la data
        let data = req.body
        //Validar que el keeper exista
        let user = await User.findOne({_id: data.keeper})
        if(!user) return res.status(404).send({message: 'Keeper not found'})
        //Crear la 'instancia' del Animal
        let animal = new Animal(data)
        //Guardar
        await animal.save()
        //Responder si todo sale bien
        return res.send({message: 'Animal saved successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error saving animal'})
    }
}

export const get =async(req,res)=>{
    try {
        let animals=await Animal.find();
        if(animals.length===0) return res.status(404).send({message: 'No hay animales que mostrar'})
        return res.send({animals})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error gettin animals'})
    }
}


export const update=async(req,res)=>{
    try {
        //capturar id
        let {id}=req.params
        //capturar la data
        let data=req.body
        //validar que vengan datos
        let update=checkUpdate(data, false)
        if(!update) return res.satus(400).send({message: 'Have submitted data that cannot be update or missing data'})
        //Actualizar
        let updatedAnimal=await Animal.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('keeper', ['name'])
        //validar la actualización
        if(!updatedAnimal) return res.status(404).send({message: 'Animal not found, not update'})
        //responder si todo sale bien
            return res.send({message: 'Animal Updated sucessfully', updatedAnimal})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating animals'})
    }
}

export const deleteA=async(req,res)=>{
    try {
        //verificar si tiene una reunión en proceso
        //capturar el id del animal a eliminar
        let {id}=req.params
        //eliminar
        let deletedAnimal=await Animal.deleteOne({_id: id})
        //validar si se eliminó
        if(deletedAnimal.deleteCount==0) return res.status(404).send({message: 'Animal not found, not deleted'})
        //responder        
        return res.send({message: 'Deleted animal sucessfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting animals'})
    }
}

export const search=async(req,res)=>{
    try {
        //obtener parámetro de búsqueda
        let {search}=req.body
        //buscar
        let animals=await Animal.find(
            {name: search}
        ).populate('keeper',['name', 'phone'])
        //validar respuesta
        if(animals.length==0) return res.status(404).send({message: 'Animal not found'})
        //responder si todo está bien
        return res.send({message: 'Animals found', animals})
    } catch (error) {
        console.error(error)
    }
}