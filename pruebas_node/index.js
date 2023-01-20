const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use(bodyParser.json())

const PUERTO = 3000

const conexion = mysql.createConnection(
    {
        host:'localhost',
        database: 'pruebas',
        user: 'root',
        password: ''
    }
)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
})

conexion.connect(error => {
    if(error) throw error
    console.log('Conexión exitosa a la base de datos');
})

app.get('/', (req, res) => {
    res.send('API')
})

app.get('/usuarios', (req, res) => {

    const query = 'SELECT * FROM usuarios;'
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        const obj = {}
        if(resultado.length > 0) {
            obj.listaUsuarios = resultado
            res.json(obj)
        } else {
            res.send('No hay registros')
        }
    })
})

app.get('/usuario/:id', (req, res) => {
    const { id } = req.params

    const query = `SELECT * FROM usuarios WHERE idUsuario=${id};`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado);
        } else {
            res.send('No hay registros');
        }
    })
})

app.post('/usuario/add', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        email: req.body.email        
    }

    const query = `INSERT INTO usuarios SET ?`
    conexion.query(query, usuario, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se inserto correctamente el usuario`)
    })
})

app.put('/usuario/update/:id', (req, res) => {
    const { id } = req.params
    const { nombre, email } = req.body

    const query = `UPDATE usuarios SET nombre='${nombre}', email='${email}' WHERE idUsuario='${id}';`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se actualizó correctamente el usuario`)
    })
})

app.delete('/usuario/delete/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM usuarios WHERE idUsuario=${id};`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se eliminó correctamente el usuario`)
    })
})
