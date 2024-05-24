const db = require('../database/db');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const SECRET = 'clinicaestetica';

exports.loginCliente = (req, res) => {
    
    const { email, senha } = req.body;

    db.query('SELECT * FROM cliente WHERE email = ?', email, (err, results) => {
        if (err) {
            console.error('Erro ao buscar email:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (results.lenght === 0) {
            res.status(401).json({ error: 'Email não encontrado' });
            return;
        }

        const cliente = results[0];
        bcrypt.compare(senha, cliente.senha, (err, passwordMatch) => {
            if (err || !passwordMatch) {
                res.status(401).json({ error: 'Credenciais inválidas' });
            }
            else {
                const token = jwt.sign({ email: cliente.email }, SECRET, { expiresIn: '5h' });
                res.status(200).json({ auth: true, token, message: 'Usuário Logado' })

            }

        });

    });
};

exports.autenticarToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.usuario = decoded;
        next();
    });
};