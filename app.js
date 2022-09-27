import express from "express";
import cors from "cors";
import db from "./database/db.js";

import userRoutes from './routes/routesUser.js'
import projectRoutes from './routes/routeProject.js'


const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);


try {
    await db.authenticate();
    console.log('Conexión exitosa a la DB');
} catch (error) {
    console.log('El error de la conexión es: ', error);
}

app.get('/', (req, res) => {
    res.send('HOLA MUNDO');
})

app.listen(3000, () => {
    console.log('Server conectado en http://localhost:3000/')
})