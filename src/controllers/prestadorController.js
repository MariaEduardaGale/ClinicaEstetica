const db = require('../database/db');

const Joi = require('joi');

const bcrypt = require('bcrypt');

const prestadorSchema = Joi.object({
    // id_pessoa: Joi.string().required(),
    nome_prestador: Joi.string().required(),
    telefone: Joi.number().required(),
    endereco: Joi.string().required(),
    bairro: Joi.string().required(),
    complemento: Joi.string().required(),
    cidade: Joi.string().required(),
    cpf: Joi.string().length(11).required(),
    data_nascimento: Joi.string().required(),
    profissao: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
});


//Lista as pessoas cadastradas 
exports.listarPrestador = (req, res) => {
    db.query('SELECT * FROM prestador', (err, result) => {
        if (err) {
            console.error('Erro ao buscar colaborador:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
}

//Busca pesso pelo nome
exports.buscarPrestador = (req, res) => {
    const { id_prestador } = req.params; // req.params acessa os parametros

    //LIKE com o operador % usado para buscar produtos cujo nome começa com o prefixo especificado na URL.
    db.query('SELECT * FROM prestador WHERE id_prestador LIKE ?', id_prestador, (err, result) => {
        if (err) {
            console.error('Erro ao buscar colaborador:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Colaborador não encontrado' });
            return;
        }
        res.json(result); // Retorna o primeiro produto encontrado (deve ser único)
    });
};

//Adicionar pessoa 
exports.adicionarPrestador = (req, res) => {
    const { nome_prestador, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, profissao, email, senha } = req.body;

    const { error } = prestadorSchema.validate({ nome_prestador, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, profissao, email, senha });

    if (error) {
        res.status(400).json({ error: 'Dados de colaborador inválidos' });
        return;
    }

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        const novoPrestador = { nome_prestador, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, profissao, email, senha: hash };

        db.query('INSERT INTO prestador SET ?', novoPrestador, (err, result) => {
            if (err) {
                console.error('Erro ao adicionar colaborador:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
            res.json({ message: 'Colaborador adicionado com sucesso' });
        });
    });
}

//Atualizar Pessoa 
exports.atualizarPrestador = (req, res) => {
    const { id_prestador } = req.params;
    const { nome_prestador, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, profissao, email, senha } = req.body;

    const { error } = prestadorSchema.validate({ nome_prestador, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, profissao, email, senha });

    if (error) {
        res.status(400).json({ error: 'Dados do colaborador inválidos' });
        return;
    }

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        const prestadorAtualizado = { nome_prestador, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, profissao, email, senha: hash };

        db.query('UPDATE prestador SET ? WHERE id_prestador = ?', [prestadorAtualizado, id_prestador], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar colaborador:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
            res.json({ message: 'Colaborador atualizada com sucesso' });
        });
    });
}

//Deletar Pessoa 
exports.deletarPrestador = (req, res) => {
    const { id_prestador } = req.params;

    db.query('DELETE FROM prestador WHERE id_prestador = ?', id_prestador, (err, result) => {
        if (err) {
            console.error('Erro ao deletar colaborador:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Colaborador deletado com sucesso' });
    });
};