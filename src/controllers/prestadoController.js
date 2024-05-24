const db = require('../database/db');

const Joi = require('joi');

const prestadoSchema = Joi.object ({
    status_prestado: Joi.string().required(),
    situacao: Joi.string().required(),
    forma_pagamento: Joi.string().required(),
    id_compromisso: Joi.string().required(),
    id_servico: Joi.string().required(),
    
});

//Listar prestar 
exports.listarPrestado = (req, res) => {
    db.query('SELECT * FROM prestado', (err, result) => {
        if (err) {
            console.error('Erro ao buscar prestado:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
}

//Buscar prestar por id
exports.buscarPrestado = (req, res) => {
    const { id_prestado } = req.params;

    db.query('SELECT * FROM prestado WHERE id_prestado = ?', id_prestado, (err, result) => {
        if (err) {
            console.error('Erro ao buscar prestado:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Prestado não encontrado' });
            return;
        }
        res.json(result[0]);
    });
}

//Adicionar novo prestrar
exports.adicionarPrestado = (req, res) => {
    const { status_prestado, situacao,forma_pagamento, id_compromisso, id_servico } = req.body;

    const { error } = prestadoSchema.validate({ status_prestado, situacao, forma_pagamento, id_compromisso, id_servico });

    if (error) {
        res.status(400).json({ error: 'Dados de prestar inválidos' });
        return;
    }

    const novoPrestado = {
        status_prestado,
        situacao,
        forma_pagamento,
        id_compromisso,
        id_servico
    };

    db.query('INSERT INTO prestado SET ?', novoPrestado, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar prestado:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Prestado adicionado com sucesso' });
    });
};

//Atualizar pretar
exports.atualizaPrestado = (req, res) => {
    const { id_prestado } = req.params;
    const { status_prestado, situacao, forma_pagamento, id_compromisso, id_servico } = req.body;

    const { error } = prestadoSchema.validate({ status_prestado, situacao, forma_pagamento, id_compromisso, id_servico });

    if (error) {
        res.status(400).json({ error: 'Dados de prestado inválidos' });
        return;
    }

    const prestadoAtualizado = {
        status_prestado,
        situacao,
        forma_pagamento,
        id_compromisso,
        id_servico
    };

    db.query('UPDATE prestado SET ? WHERE id_prestado = ?', [prestadoAtualizado, id_prestado], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar prestado:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Prestado atualizado com sucesso' });
    });
};

//Deletar um prestar	
exports.deletarPrestado = (req, res) => {
    const { id_prestado } = req.params;

    db.query('DELETE FROM prestado WHERE id_prestado = ?', id_prestado, (err, result) => {
        if (err) {
            console.error('Erro ao deletar prestado:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Prestado deletado com sucesso' });
    });
};