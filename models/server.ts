import express, {Application} from 'express';
import userRouter from '../routes/usuario';
import cors from 'cors';
import db from '../db/conexion';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: "/api/usuarios"
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8000";
        this.dbConexion();
        this.middlewares();
        this.routes();
    }

    //CONEXION BD

    async dbConexion(){
       try {
            await db.authenticate;
            console.log("Conexion realizada con exito");
       } catch (error) {
            throw new Error("error")
       }
    }
    //funciones que se ejecutan antes de otras rutas o procedimientos
    middlewares(){
        //CORS
        this.app.use(cors())

        //LECTURA BODY
        this.app.use(express.json());

        //CARPETA PUBLICA
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRouter)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en puerto:: " + this.port)
        })
    }
    
}

export default Server;