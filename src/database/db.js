const mysql = require('mysql'); //importando o mysql 

//Cnfigurando conexão com o banco 
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'clinica_estetica',
});

//Testa conexão com o MySQL 
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

module.exports = db; 