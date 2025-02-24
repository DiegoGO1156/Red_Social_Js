import  jwt  from "jsonwebtoken"
import User from "../user/userModel.js"


export const valueJWT = async (req, res, next) =>{
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({ 
            msg: "No hay token en la petición",
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({   
                msg: "Usuario no existe en la base de datos",
            });
        }
        if (!user.status) {
            return res.status(401).json({
                msg: "Usuario no válido",
            });
        }

        req.user = user; 
        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Token no válido",
        });
    }
}