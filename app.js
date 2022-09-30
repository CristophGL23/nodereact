import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import db from "./database/db.js";
dotenv.config();
import userRoutes from './routes/routesUser.js'
import projectRoutes from './routes/routeProject.js'
import loginRoutes from './routes/routeLogin.js'
import fileRoutes from './routes/routeFiles.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/auth', loginRoutes);
app.use('/files', fileRoutes)
app.use('/uploads', express.static('./uploads'))


try {
    await db.authenticate();
    console.log('Conexión exitosa a la DB');
} catch (error) {
    console.log('El error de la conexión es: ', error);
}

app.get('/', (req, res) => {
    res.send('HOLA MUNDO');
})

app.listen(8000, () => {
    console.log('Server conectado en http://localhost:8000/')
})