import mysql2 from 'mysql2';

const db = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root', // Usuario por defecto
    password: '', // Contraseña vacía
    database: 'cursos'
});

db.connect((error) =>{
    if(error){
        throw error;
    }

    console.log('conexion exitosa');
})

export default db;