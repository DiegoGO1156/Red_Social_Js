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