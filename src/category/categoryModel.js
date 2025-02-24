import { model, Schema } from "mongoose";


const categoriaModel = Schema({
    nameCat:{
        type: String,
        required: true,
        unique: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default model("Category", categoriaModel)