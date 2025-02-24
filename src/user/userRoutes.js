import { Router } from "express";
import { getUsers, updatePassword, updateUser } from "./userController.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existUser } from "../helpers/db-validator.js";
import { valueJWT } from "../middlewares/validar-jwt.js";


const router = Router()

router.get(
    "/",
    getUsers
)

router.put(
    "/:id",
    [
        valueJWT,
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existUser),
        validarCampos
    ],
    updateUser
)

router.put(
    "/updatePassword/:id",
    [
        valueJWT,
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existUser),
        validarCampos
    ],
    updatePassword
)

export default router;