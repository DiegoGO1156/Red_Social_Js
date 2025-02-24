import { Router } from "express";
import { createCat, deleteCat, updateCat } from "./categoryController.js";
import { valueJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/tiene-role.js";
import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router()

router.post(
    "/generarCategoria",
    [ 
        valueJWT,
        tieneRole("ADMIN_ROLE"),
        validarCampos
    ],
    createCat
)

router.put(
    "/updateCategory/:id",
    [
        valueJWT,
        tieneRole("ADMIN_ROLE"),
    ],
    updateCat
)
        
router.delete(
    "/delete/:id",
    [
        valueJWT,
        tieneRole("ADMIN_ROLE"),
    ],
    deleteCat
)


export default router;
