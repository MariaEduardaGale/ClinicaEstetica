const db = require('../database/db');

const Joi = require('joi');

const bcrypt = require('bcrypt');

const clienteSchema = Joi.object ({
    // id_pessoa: Joi.string().required(),
    nome: Joi.string().required(),
    telefone: Joi.number().required(),
    endereco: Joi.string().required(),
    bairro: Joi.string().required(),
    complemento: Joi.string().required(),
    cidade: Joi.string().required(),
    cpf: Joi.string().length(11).required(),
    data_nascimento: Joi.string().required(),
    observacao: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
});


//Lista as pessoas cadastradas 
exports.listarClientes = (req, res) => {
    db.query('SELECT * FROM cliente', (err, result) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
}

//Busca pesso pelo nome
exports.buscarCliente = (req, res) => {
    const { id_cliente } = req.params; // req.params acessa os parametros

    //LIKE com o operador % usado para buscar produtos cujo nome começa com o prefixo especificado na URL.
    db.query('SELECT * FROM cliente WHERE id_cliente LIKE ?', id_cliente, (err, result) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
            return;
        }
        res.json(result); // Retorna o primeiro produto encontrado (deve ser único)
    });
};

//Adicionar pessoa 
exports.adicionarCliente = (req, res) => {
    const { nome, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, observacao, email, senha } = req.body;

    const { error } = clienteSchema.validate({ nome, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, observacao, email, senha });

    if (error) {
        res.status(400).json({ error: 'Dados de cliente inválidos' });
        return;
    }

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        const novoCliente = { nome, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, observacao, email, senha: hash };

        db.query('INSERT INTO cliente SET ?', novoCliente, (err, result) => {
            if (err) {
                console.error('Erro ao adicionar cliente:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
            res.json({ message: 'Cliente adicionado com sucesso' });
        });
    });
}

//Atualizar Pessoa 
exports.atualizarCliente = (req, res) => {
    const { id_cliente } = req.params;
    const { nome, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, observacao, email,senha } = req.body;

    const { error } = clienteSchema.validate({ nome, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, observacao, email, senha });

    if (error) {
        res.status(400).json({ error: 'Dados da cliente inválidos' });
        return;
    }

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

    const clienteAtualizada = { nome, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, observacao, email, senha: hash };

    db.query('UPDATE cliente SET ? WHERE id_cliente = ?', [clienteAtualizada, id_cliente], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Cliente atualizado com sucesso' });
    });
});
}

//Deletar Pessoa 
exports.deletarCliente = (req, res) => {
    const { id_cliente } = req.params;

    db.query('DELETE FROM cliente WHERE id_cliente = ?', id_cliente, (err, result) => {
        if (err) {
            console.error('Erro ao deletar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Cliente deletada com sucesso' });
    });
};