import jwt from "jsonwebtoken"
import Category from "../category/categoryModel.js"
import User from "../user/userModel.js"
import Post from "./postModel.js"


export const newPost = async(req, res) =>{
    try {
        const token = req.header("x-token");
        const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);
        
        const { title, categoryPost, textPrincipal } = req.body;

        const user = User.findById(uid)
        
        if(!user){
            return res.status(404).json({
                msg: "Usuario no encontrado"
            })
        }

        const category = await Category.findOne({nameCat: categoryPost})

        if(!category){
            return res.status(404).json({
                success: false,
                msg: "Categoria no encontrada"
            })
        }

        const post = new Post({
            title,
            categoryPost: category._id,
            user: uid,
            textPrincipal
        })
        await post.save()

        return res.status(200).json({
            success: true,
            msg: "POSTEO REALIZADO CON EXITO!!!",
            post
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const updatePost = async(req, res) =>{
    try {
        const { id } = req.params;
        const token = req.header("x-token");
        const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);
        const { title, categoryPost, textPrincipal } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ 
                msg: "Publicación no encontrada" 
            });
        }

        if (post.user.toString() !== uid) {
            return res.status(401).json({ 
                msg: "No tienes permiso para editar esta publicación" 
            });
        }

        let categoryToUpdate = post.category;

        if (categoryPost) {
            const categoryFound = await Category.findOne({ nameCat: categoryPost });
            if (!categoryFound) {
                return res.status(404).json({ 
                    msg: "La categoría seleccionada no existe" 
                });
            }
            categoryToUpdate = categoryFound._id;
        }

        const actPost = await Post.findByIdAndUpdate( id, { title, categoryPost: categoryToUpdate, textPrincipal }, { new: true })

        return res.status(200).json({
            success: true,
            msg: "PUBLICACION EDITADA CON EXITO!!!",
            post: actPost
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al intentar actualizar los datos",
            error: err.message
        });
    }
}

export const deletePost = async(req, res) =>{
    try {
        const {id} = req.params
        const token = req.header("x-token")
        const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY)

        const post = await Post.findById(id)

        if(!post){
            return res.status(403).json({
                success:false,
                msg: "La publicacion no existe"
            })
        }

        if(post.user.toString() !== uid){
            return res.status(401).json({
                success: false,
                msg: "No tienes acceso para eliminar esta publicacion"
            })
        }

        if(post.status === false){
            return res.status(403).json({
                msg: "La publicacion fue eliminada con anterioridad"
            })
        }

        await Post.findByIdAndUpdate(id, {status: false})

        return res.status(200).json({
            success: true,
            msg: "PUBLICACION ELIMINADA CON EXITO!!!"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
} 

export const getpost = async(req, res) =>{
    try {
        const {limite = 10, desde = 0} = req.query
        const query =   {status: true}

        const [total, post] = await Promise.all([
            Post.countDocuments(query),
            Post.find(query).skip(Number(desde)).limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            post
        })

    } catch (err) {
        return res.status(500).json({
            succes: false,
            msg: "Error al intentar mostrar las publicaciones",
            error: err.message
        })
    }
}