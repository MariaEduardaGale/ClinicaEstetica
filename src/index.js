const express = require('express');

const path = require('path');

const db = require('./database/db'); 

const app = express();

const cors = require('cors');

// Configurando as rotas
const routes = require('./routes/routes'); 

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers: Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    app.use(cors())
    next()
})


app.use('/', routes);

app.listen(3333, () => {
    console.log('Servidor funcionando');
});