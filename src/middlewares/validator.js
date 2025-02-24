import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { correoExist, rolValido } from "../helpers/db-validator.js";


export const registerValidator = [
    body("name", "The name is required").not().isEmpty(),
    body("username", "The username is required").not().isEmpty(),
    body("email", "Debe ingresar un correo valido").not().isEmpty(),
    body("email").custom(correoExist),
    body("role").custom(rolValido),
    body("password", "La contraseña debe tener un minimo de 8 caracteres").isLength({min: 8}),
    validarCampos
]

export const loginvalidator = [
    body("email").optional().isEmail().withMessage("Ingresa una direccion de correo valida"),
    body("username").optional().isString().withMessage("Ingrese un username valido"),
    body("password", "La contraseña debe tener minimo 8 caracteres").isLength({min:8}),
    validarCampos
]