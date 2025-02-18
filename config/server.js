import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo"


const middlewares = (app)=>{
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(morgan('dev'))
  //app.use(limiter)   
}

const conectDB = async() =>{
    try {
        await dbConnection()
        console.log("La conexión a la Base de Datos ha sido Exitosa!!!")
    } catch (e) {
        console.log("Error al intentar conectar con la Base de Datos")
        process.exit(1)
    }
}

export const initServer = async () =>{
    const app = express()
    const Port = process.env.PORT||3000

    try {
        middlewares(app)
        conectDB()
      //routes(app)
      app.listen(Port)
      console.log(`SERVER INIT IN PORT ${Port}`)  
    } catch (err) {
        console.log(`SERVER FALIED INIT ${Port}`)  
        
    }
}