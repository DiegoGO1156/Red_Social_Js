import { Schema, model } from "mongoose";

const roleModel = Schema({
    role:{
        type: String,
        require: [true, "El rol es obligatorio"]
    }
})

export default model("Role", roleModel)