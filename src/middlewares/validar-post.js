import {body, param} from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { valueJWT } from "./validar-jwt.js";


export const validarPost = [
    valueJWT,
    body("title").notEmpty().withMessage("El titulo es requerido"),
    body("categoryPost").notEmpty().withMessage("La categoria es requerida"),
    body("textPrincipal").notEmpty().withMessage("El texto de la publicacion es requerido"),
    validarCampos
]

export const updatePostValidator = [
    valueJWT,
    param("id").isMongoId().withMessage("No es un ID valido de MongoDB"),
    validarCampos
]