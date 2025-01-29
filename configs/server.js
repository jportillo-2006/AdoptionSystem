'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import authRoutes from '../src/auth/auth.routes.js';

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const configurarRutas = (app) => {
    const authPath = '/adoptionSystem/v1/auth';
    app.use(authPath, authRoutes)
}

const routes = (app) => {
    app.use(
        
    )
}

const conectarDB = async() => {
    try {
        await dbConnection();
        console.log('Conexion exitosa con la base de datos');
    } catch (error) {
        console.log('Error al conectar con la base de datos', error);
    }
}

export const initServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    try {
        middlewares(app);
        await conectarDB();
        configurarMiddlewares(app);
        configurarRutas(app);
        console.log(`server running on port ${port}`);
    } catch (err) {
        console.log(`server init failed: ${err}`);
    }

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

}