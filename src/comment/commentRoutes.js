import { Router } from "express";
import { deleteComment, newComment, updateComment } from "./commentController.js";
import { valueJWT } from "../middlewares/validar-jwt.js";



const router = Router()

router.post(
    "/newComment",
    [
        valueJWT
    ],
    newComment
)

router.put(
    "/editComment/:id",
    [
        valueJWT
    ],
    updateComment
)

router.delete(
    "/deleteComment/:id",
    [
        valueJWT
    ],
    deleteComment
)

export default router