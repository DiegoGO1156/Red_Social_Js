import { verify, hash } from "argon2"
import User from "./userModel.js"
import jwt from "jsonwebtoken"


export const updateUser = async(req, res) =>{
    try {
        const token = req.header("x-token")
        const {id} = req.params
        const{_id, email, role, password, ...data} = req.body
        const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY)

        if(id !== uid){
            return res.status(403).json({
                success: false,
                msg: "No tienes acceso para realizar esta accion"
            })
        }

        const user = await User.findByIdAndUpdate(id, data, {new: true})

        return res.status(200).json({
            success: true,
            msg: "Usuario Actualizado con Exito!!!!",
            user
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "ERROR AL ACTUALIZAR DATOS",
            errors: err.message
        })
    }
}

export const getUsers = async (req, res) =>{
    try {
        console.log("Hola")
        const {limit = 10, desde = 0} = req.query
        const query = {status: true}
        const [total, user] = await Promise.all([
            User.countDocuments(query),
            User.find(query).skip(Number(desde)).limit(Number(limit))
        ])

        return res.status(200).json({
            success: true,
            total,
            user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al buscar los usuarios",
            errors: err.message
        })
    }
}

export const updatePassword = async (req, res) =>{
    try {
        const {id} = req.params
        const {oldPassword, newPassword} = req.body
        const token = req.header("x-token")
        const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY)
        
        if(id !== uid){
            return res.status(403).json({
                success: false,
                msg: "No tienes acceso para realizar esta accion"
            })
        }
        
        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success: false, 
                msg: "Llene todos los campos"
            })
        }
        
        const user = await User.findById(id)

        if(!user){
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado | Usuario inexistente"
            })
        }

        const igual = await verify(user.password, oldPassword)

        if(!igual){
            return res.status(400).json({
                success: false,
                msg: "La contraseña ha cambiar no es correcta"
            })
        }

        if(oldPassword === newPassword){
            return res.status(400).json({
                success: false,
                msg: "La contraseña nueva no puede ser igual a la anterior"
            })
        }

        const pass = await hash(newPassword)
        user.password = pass
        await user.save()

        return res.status(200).json({
            success: true,
            msg: "CONTRASEÑA ACTUALIZADA CON EXITO!!!"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error al Actualizar contraseña",
            error: error.message
        })
    }
}