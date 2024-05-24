const db = require('../database/db')

const Joi = require('joi');

const agendaSchema = Joi.object({
    id_cliente: Joi.string().required(),
    id_compromisso: Joi.string().required(),
});

//Listar compromisso
exports.listarAgenda = (req, res) => {
    db.query('SELECT * FROM agenda', (err, result) => {
        if (err) {
            console.error('Erro ao listar agenda:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};

exports.buscarAgenda = (req, res) => {
    const { id_agendamento } = req.params;

    db.query('SELECT * FROM agenda WHERE id_agendamento = ?', id_agendamento, (err, result) => {
        if (err) {
            console.error('Erro ao buscar agendamento:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Agendamento não encontrado' });
            return;
        }
        res.json(result[0]);
    });
};


//Adicionar novo Compromisso
exports.adicionarAgenda = (req, res) => {
    const { id_cliente, id_compromisso } = req.body;

    const { error } = agendaSchema.validate({ id_cliente, id_compromisso });

    if (error) {
        res.status(400).json({ error: 'Dados de agendamento inválidos' });
        return;
    }

    const novoAgendamento = {
        id_cliente,
        id_compromisso
    };

    db.query('INSERT INTO agenda SET ?', novoAgendamento, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar agendamento:', err);
            res.status(500).json({ error: 'Erro interno do Servidor' });
            return;
        }
        res.json({ message: 'Agendamento adicionado com sucesso' });
    });
};

//Atualizar compromisso
exports.atualizarAgenda = (req, res) => {
    const { id_agendamento } = req.params;
    const { id_cliente,id_compromisso } = req.body;

    const { error } = agendaSchema.validate({ id_cliente, id_compromisso });

    if (error) {
        res.status(400).json({ error: 'Dados de agendamento inválidos ' });
        return;
    }

    const agendaAtualizada = {
        id_cliente,
        id_compromisso
    };

    db.query('UPDATE agenda SET ? WHERE id_agendamento = ?', [agendaAtualizada, id_agendamento], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar agendamento:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Agendamento atualizado com sucesso' });
    });
};

//Delete compromisso
exports.deletarAgenda = (req, res) => {
    const { id_agendamento } = req.params;

    db.query('DELETE FR agenda WHERE id_agendamento = ?', id_agendamento, (err, result) => {
        if (err) {
            console.error('Erro ao deletar agendamento:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Agendamento deletado com sucesso:' });
    });
};