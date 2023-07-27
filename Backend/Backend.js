const express = require('express');
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const db = mysql.createConnection({
    host: '127.0.0.1', 
    user: 'root',
    password: '', 
    database: 'hotel_db'
  });


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión a la base de datos establecida');
});

app.use(cors());
app.use(express.json());

app.get('/api/huespedes', (req, res) => {
  const sql = 'SELECT * FROM Huespedes';

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.post('/api/huespedes', [
    body('Nombre').notEmpty().trim().escape(),
    body('Identificacion').notEmpty().trim().escape(),
    body('ID_Habitacion').notEmpty().isInt(),
    body('ingreso').notEmpty().isISO8601(), 
    body('salida').notEmpty().isISO8601()  
  ], (req, res) => {
    try{
        const errors = validationResult(req);
  
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
      
        const nuevoHuesped = req.body; 
      
        
        db.query('INSERT INTO huespedes SET ?', nuevoHuesped, (err, result) => {
          if (err) {
            console.error('Error al guardar el huésped en la base de datos: ', err);
            res.status(500).json({ error: 'Error al guardar el huésped' });
            return;
          }
          res.status(201).json({ message: 'Huésped registrado correctamente' });
        });
    } catch (error) {
        console.error('Error interno en el servidor:', error);
        res.status(500).json({ error: 'Error interno en el servidor' });
      }
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
