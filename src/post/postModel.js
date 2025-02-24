import { model, Schema } from "mongoose";


export const postModel = Schema({
    title: {
        type: String,
        required: true
    },
    categoryPost:{
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    textPrincipal:{
        type: String,
        required: [true, "Ingrese un texto para postear"],
        maxLengt: [750, "El texto sobrepasa los 750 caracteres maximos para la publicacion"]
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

export default model("Post", postModel)