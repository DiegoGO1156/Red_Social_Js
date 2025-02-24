import { hash, verify } from "argon2"
import User from "../user/userModel.js"
import { generarJWT } from "../helpers/generate-jwt.js"

export const registerUser = async(req,res) =>{
    try {
        const data = req.body
        
        const passwordEncrypt = await hash(data.password)

        if(data.role === "ADMIN_ROLE"){
            const admin = await User.findOne({role: "ADMIN_ROLE"})
            if(admin){
                return res.status(400).json({
                    success: false,
                    msg: "El role de Administrador ya esta en uso, cambie el role a USER_ROLE"
                })
            }
        }

        const user = await User.create({
            name: data.name,
            username: data.username,
            email: data.email,
            password: passwordEncrypt,
            role: data.role
        })

        console.log(user)
        return res.status(200).json({
            message: "Registro hecho con exito",
            userDetails: {
                user: user.email,
                name: user.name
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: "User registration falied",
            err: error.message
        })
    }
}

export const login = async(req, res) =>{
    const{email, password, username} = req.body
    try {
        const lowerEmail = email ? email.toLowerCase() : null;
        const lowerUsername = username ? username.toLowerCase() : null

        const user = await User.findOne({
            $or:[{email: lowerEmail}, {username: lowerUsername}]
        })

        if(!user){
            return res.status(404).json({
                msg: "Credenciales incorrectas || Correo no existente en la base de datos"
            })
        }
        if(!user.status){
            return res.status(400).json({
                msg: "El usuario no existe || status: false"
            })
        }

        const validPassword = await verify(user.password, password)
        if(!validPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            })
        }

        const token = await generarJWT(user.id)

        return res.status(200).json({
            msg: "Inicio de sesión exitoso",
            userDetails:{
                username: user.name,
                token
            }
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            msg: "SERVER ERROR",
            error: err.message
        })
    }
}