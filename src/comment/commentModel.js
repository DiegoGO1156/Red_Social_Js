import { model, Schema } from "mongoose";


export const comentarioModel = Schema({
    comentario:{
        type: String,
        required: true
    },
    postComment:{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    autor:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
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

export default model("Comment", comentarioModel)