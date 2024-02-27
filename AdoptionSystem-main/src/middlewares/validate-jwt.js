'use strict'
import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt=async(req,res,next)=>{
    try {
        //otener la llave de acceso al token
        let secretKey=process.env.SECRET_KEY
        //obtener el token de los headers
        let {token}=req.headers
        //verificar si viene el token
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        //obtener el id de usuario que envio el token
        let {uid}=jwt.verify(token, secretKey)
        //validar si el usuario aún existe en la bd
        let user= await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'User not found - Unauthorized'})
        //ok del middleware
        req.user=user
        /* console.log(req.user) */
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Invalid token'})
    }
}

export const isAdmin=async(req,res,next)=>{
    try {
        let {role} =req.user
        if(!role || role !== 'ADMIN') return res.status(403).send({message: `You do not have acces | username ${username}`})
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Unauthorized role'})
    }
}


