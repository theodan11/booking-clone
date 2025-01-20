import jwt from 'jsonwebtoken'
import { createError } from './createError.js'

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401, 'not authorized'))
    }
    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403, "token is not valid"))
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, 'you are not authorized to perform this action'))
        }
    })
}

export const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, 'you are not authorized to perform this action'))
        }
    })
}