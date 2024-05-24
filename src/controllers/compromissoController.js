const db = require('../database/db')

const Joi = require('joi');

const compromissoSchema = Joi.object ({
    // id_compromisso: Joi.string().required(),
    data_compromisso: Joi.string().required(),
    hora: Joi.string().required(),
    status_compromisso: Joi.string().required(),
    id_cliente: Joi.string().required(),
    id_servico: Joi.string().required(),
});

//Listar compromisso
exports.listarCompromisso = (req, res) => {
    db.query('SELECT * FROM compromisso', (err, result) => {
        if (err) {
            console.error('Erro ao listar compromisso:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};

exports.buscarCompromisso = (req, res) => {
    const { id_compromisso } = req.params;

    db.query('SELECT * FROM compromisso WHERE id_compromisso = ?', id_compromisso, (err, result) => {
        if (err) {
            console.error('Erro ao buscar compromisso:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Compromisso não encontrado' });
            return;
        }
        res.json(result[0]);
    });
};

//Busca compromisso pela data

    //LIKE com o operador % usado para buscar produtos cujo nome começa com o prefixo especificado na URL.
exports.buscarCompromissoData = (req, res) => {
    const { data_compromisso } = req.params; // req.params acessa os parametros

    // Usando placeholders corretos e adicionando '%' para o operador LIKE
    db.query('SELECT * FROM compromisso WHERE data_compromisso LIKE ?', [`%${data_compromisso}%`], (err, result) => {
        if (err) {
            console.error('Erro ao buscar data:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        // Verificar se a array resultante está vazia
        if (result.length === 0) {
            res.status(404).json({ error: 'Data não encontrado' });
            return;
        }

        res.json(result);
    });
};



//Adicionar novo Compromisso
exports.adicionarCompromisso = (req, res) => {
    const { data_compromisso, hora, status_compromisso, id_cliente, id_servico  } = req.body;

    const { error } = compromissoSchema.validate({ data_compromisso, hora, status_compromisso, id_cliente, id_servico });

    if (error) {
        res.status(400).json({ error: 'Dados de compromisso inválidos' });
        return;
    }

    const novoCompromisso = {
        data_compromisso, 
        hora, 
        status_compromisso, 
        id_cliente, 
        id_servico 
    };

    db.query('INSERT INTO compromisso SET ?', novoCompromisso, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar compromisso:', err);
            res.status(500).json({ error: 'Erro interno do Servidor' });
            return;
        }
        res.json({ message: 'Compromisso adicionado com sucesso' });
    });
};

//Atualizar compromisso
exports.atualizarCompromisso = (req, res) => {
    const { id_compromisso } = req.params;
    const { data_compromisso, hora, status_compromisso, id_cliente, id_servico } = req.body;

    const { error } = compromissoSchema.validate({ data_compromisso, hora, status_compromisso, id_cliente, id_servico });

    if (error) {
        res.status(400).json({ error: 'Dados de Compromisso inválidos ' });
        return;
    }

    const compromissoAtualizado = {
        data_compromisso, 
        hora, 
        status_compromisso, 
        id_cliente, 
        id_servico 
          
     };

    db.query('UPDATE compromisso SET ? WHERE id_compromisso = ?', [compromissoAtualizado, id_compromisso], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar compromisso:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Compromisso atualizado com sucesso' });
    });
};

//Delete compromisso
exports.deletarCompromisso = (req, res) => {
    const { id_compromisso} = req.params;

    db.query('DELETE FROM compromisso WHERE id_compromisso = ?', id_compromisso, (err, result) => {
        if (err) {
            console.error('Erro ao deletar compromisso:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Compromisso deletado com sucesso:' });
    });
};