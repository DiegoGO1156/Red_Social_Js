import { Schema, model } from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "El name del usuario es requerido"]
    },
    username:{
        type: String,
        required: [true, "El surname del usurio es requerido"],
        unique: true
    },
    email:{
        type: String,
        require: [true, "El correo es requerido"],
        unique: true
    },
    password:{
        type: String,
        require: [true, "La contraseña es requerida"],
        minLenght: 8
    },
    role:{
        type: String,
        require: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    status:{
        type: Boolean,
        default:true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default model ("User", userSchema)