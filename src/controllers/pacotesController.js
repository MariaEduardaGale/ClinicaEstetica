const db = require('../database/db');

const Joi = require('joi');

const pacotesSchema = Joi.object ({
    nome: Joi.string().required(),
    qtde_sessao: Joi.number().required(),
    observacao: Joi.string().required(),
    valor_pacote: Joi.number().required(),
    id_servico: Joi.string().required(),

});

//Listar Pacotes
exports.listarPacotes = (req, res) => {
    db.query('SELECT * FROM pacotes', (err, result) => {
        if (err) {
            console.error('Erro ao bucar pacotes:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};

//Buscar um pacote nome
exports.buscarPacote = (req, res) => {
    const { id_pacote } = req.params;

    db.query('SELECT * FROM pacotes WHERE id_pacote LIKE ?', id_pacote, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pacote:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Pacote não encontrado' });
            return;
        }
        res.json(result);
    });
};

//Adicionar novo pacote
exports.adicionarPacote = (req, res) => {
    const { nome, qtde_sessao, observacao, valor_pacote, id_servico } = req.body;

    const { error } = pacotesSchema.validate({ nome, qtde_sessao, observacao, valor_pacote, id_servico });

    if (error) {
        res.status(400).json({ error: 'Dados de pacote inválidos' });
        return;
    }

    const novoPacote = {
        nome,
        qtde_sessao,
        observacao,
        valor_pacote,
        id_servico,
    };

    db.query('INSERT INTO pacotes SET ?', novoPacote, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar pacote:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Pacote adicionado com sucesso' });
    });
};

//Atualizar um pacote
exports.atualizaPacote = (req, res) => {
    const { id_pacote } = req.params;
    const { nome, qtde_sessao, observacao, valor_pacote,id_servico } = req.body;

    const { error } = pacotesSchema.validate({ nome, qtde_sessao, observacao, valor_pacote, id_servico });

    if (error) {
        res.status(400).json({ error: 'Dados de pacote inválidos' });
        return;
    }

    const pacoteAtualizado = {
        nome,
        qtde_sessao,
        observacao,
        valor_pacote,
        id_servico,

    };

    db.query('UPDATE pacotes SET ? WHERE id_pacote = ?', [pacoteAtualizado, id_pacote], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pacote:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Pacote atualizado com sucesso' });
    });
};

//Deletar um pacote
exports.deletarPacote = (req, res) => {
    const { id_pacote } = req.params;

    db.query('DELETE FROM pacotes WHERE id_pacote = ?', id_pacote, (err, result) => {
        if (err) {
            console.error('Erro ao deletar pacote:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Pacote deletado com sucesso' });
    });
};
