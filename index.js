import express from 'express';
import cors from 'cors';
const app = express();
import estudiantesRouter from './routes/estudiantesRoutes.js';
import profesoresRoutes from './routes/profesoresRoutes.js';
import cursosRoutes from './routes/cursosRoutes.js';

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('hello world!')
})

app.use('/estudiantes', estudiantesRouter);
app.use('/profesores', profesoresRoutes);
app.use('/cursos', cursosRoutes);

app.listen(3000, ()=>{
    console.log('hello world!!!');
})
