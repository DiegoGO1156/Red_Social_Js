import { Router } from "express";
import { deletePost, getpost, newPost, updatePost } from "./postController.js";
import { updatePostValidator, validarPost } from "../middlewares/validar-post.js";
import { valueJWT } from "../middlewares/validar-jwt.js";


const router = Router()

router.get(
    "/",
    getpost
)

router.post(
    "/newPost",
    validarPost,
    newPost
)

router.put(
    "/updatePost/:id",
    updatePostValidator,
    updatePost
)

router.delete(
    "/deletePost/:id",
    [
        valueJWT
    ],
    deletePost
)



export default router