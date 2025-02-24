import Post from "../post/postModel.js";
import Category from "./categoryModel.js"


export const createCat = async (req, res) =>{
    try {
                       
        const { nameCat } = req.body; 
                       
        if (!nameCat) {
            return res.status(400).json({
                success: false,
                msg: "El nombre de la categoría es requerido",
            });
        }
        
        const categ = new Category({
            nameCat: nameCat,
        });

        const saveCateg = await categ.save()

        return res.status(200).json({
            success: true,
            msg: "CATEGORIA CREADA CON ÉXITO",
            categoria: saveCateg
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al crear la categoría",
            error: err.message,
        });
    }
}

export const updateCat = async (req, res) =>{
    try {
        const {id} = req.params
        const {nameCat} = req.body

        const categUpdate = await Category.findByIdAndUpdate(id, {nameCat: nameCat}, {new: true})

        return res.status(200).json({
            success: true,
            msg: "DATOS DE LA CATEGORIA ACTUALIZADOS CON EXITO !!!!",
            categUpdate
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al Actualizar la categoria",
            error: err.message
        })
    }
}

export const deleteCat = async (req, res) =>{
    const {id} = req.params
    try {
        const categoria = await Category.findById(id)
        if(categoria.status === false){
            return res.status(400).json({
                msg: "La categoria ya fue eliminada"
            })
        }

        const categoriDefault = await Category.findOne({nameCat: "Uncategorized"})

        if(!categoriDefault){
            return res.status(404).json({
                msg: "La categoria por defecto no fue encontrada"
            })
        }

        await Post.updateMany({categoryPost: id},{categoryPost: categoriDefault._id})
        await Category.findByIdAndUpdate(id, {status: false})

        return res.status(200).json({
            success: true,
            msg: "LA CATEGORIA FUE ELIMINADA CON EXITO!!!!"
        })
    } catch (err) {
        return res.status(500).json({
            msg: "Error al Eliminar la categoria",
            error: err.message
        })
    }
}