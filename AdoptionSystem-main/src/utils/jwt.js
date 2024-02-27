'use strict'

import jwt from 'jsonwebtoken'

const secretKey='@LlaveSuperSecretaDeIN6AV@'

export const genereteJwt=async(payload)=>{
    try {
        return jwt.sign(payload, secretKey, {
            expiresIn: '3h',
            algorithm: 'HS256' //método de encriptación
        })
    } catch (error) {
        console.error(error)
        return error
    }
}