import { Router } from "express";
import { login, registerUser } from "./authController.js";
import { loginvalidator, registerValidator } from "../middlewares/validator.js";


const router = Router()

router.post(
    "/register",
    registerValidator,
    registerUser
)

router.post(
    "/login",
    loginvalidator,
    login
)

export default router;