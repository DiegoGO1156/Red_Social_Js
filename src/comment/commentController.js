import Post from "../post/postModel.js"
import User from "../user/userModel.js"
import Comment from "../comment/commentModel.js"
import jwt from "jsonwebtoken"


export const newComment = async (req, res) =>{
    try {
        const token = req.header("x-token")
        const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

        const { comentario, postComment} = req.body;

        const user = User.findById(uid)

        if(!user){
            return res.status(404).json({
                msg: "Usuario no encontrado"
            })
        }

        const post = await Post.findOne({title: postComment})
        
        if (!post) {
            return res.stats(404).json({
                success: false,
                msg: "La publicacion no existe"
            })
        }

        const comment = new Comment({
            comentario,
            postComment: post._id,
            autor: uid
        })

        await comment.save()    

        const commentId = await Comment.findById(comment._id).populate("autor", "name").populate("postComment", "title")

        return res.status(200).json({
            success: true, 
            msg: "COMENTARIO REALIZADO CON EXITO",
            commentId
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al comentar",
            error: err.message
        })
    }
}

export const updateComment = async(req, res) =>{
    try {
        const {id} = req.params
        const token = req.header("x-token")
        const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY)
        const {comentario} = req.body;

        const comment = await Comment.findById(id)

        if (!comment) {
            return res.stats(404).json({
                success: false,
                msg: "El comentario no existe"
            })
        }

        if (!token) {
            return res.status(404).json({
                success: false,
                msg: "No hay token para realizar esta accion"
            })
        }

        if(comment.autor.toString() !== uid){
            return res.status(401).json({
                success: false,
                msg: "No tiene acceso para realizar esta accion"
            })
        }

        const editedComment = await Comment.findByIdAndUpdate(id, {comentario: comentario}, {new: true})

        return res.status(200).json({
            success: true,
            msg: "COMENTARIO EDITADO CON EXITO!!!",
            editedComment
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al editar el comentario",
            error: err.message
        })
    }
}

export const deleteComment = async(req, res) =>{
    try {
        const {id} = req.params
        const token = req.header("x-token")
        const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY)

        const comment = await Comment.findById(id)

        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: "El comentario no existe"
            })
        }

        if(comment.autor.toString() !== uid){
            return res.status(403).json({
                success: false, 
                msg: "No tienes permiso para realizar esta accion"
            })
        }

        if(comment.status === false){
            return res.status(403).json({
                success: false, 
                msg: "El comentario ya fue eliminado"
            })
        }

        await Comment.findByIdAndUpdate(id, {status: false})

        return res.status(200).json({
            success: true,
            msg: "COMENTARIO ELIMINADO CON EXITO!!!"
        })

    } catch (err) {
        return res.status(500).json({
            msg: "Error al eliminar el comentario"
        })
    }
}