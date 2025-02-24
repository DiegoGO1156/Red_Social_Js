import Role from "../roles/roleModel.js"
import User from "../user/userModel.js"


export const rolValido = async(role = "") =>{
    const roleExist = await Role.findOne({role})
    if(!roleExist){
        throw new Error (`El rol ${role}, no existe en la Base de Datos`)
    }
}

export const correoExist = async(email = "") =>{
    const emailExist = await User.findOne({email})
    if(emailExist){
        throw new Error (`El correo ${email} ya esta en uso`)
    }
}

export const existUser = async (id = "") =>{
    const userExist = User.findOne({id})
    if(!userExist){
         throw new Error (`El ID ${id} ingresado no corresponde a nigun usuario`)
    }
}