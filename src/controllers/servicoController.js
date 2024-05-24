const db = require('../database/db');

const Joi = require('joi'); //Joi - valida se a estrutura de dados atende a uma validação criada no banco 

const servicoSchema = Joi.object ({
    nome_servico: Joi.string().required(),
    valor_servico: Joi.number().required(),
    tempo: Joi.string().required(),
    imagem: Joi.string().required(),
    tipo: Joi.string().required(),
});

//Listar todos os serviços
exports.listarServico = (req, res) => {
    db.query('SELECT * FROM servico', (err, result) => {
        if (err) {
            console.error('Erro ao buscar servico:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};

//Busca serviço pelo nome
exports.buscarServico = (req, res) => {
    const { id_servico } = req.params;

    db.query('SELECT * FROM servico WHERE id_servico LIKE ?', id_servico, (err, result) => {
        if (err) {
            console.error('Erro ao buscar serviço:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Serviço não encontrado' });
            return;
        }
        res.json(result); 
    });
};

//Adicionar novo servico
exports.adicionarServico = (req, res) => {
    const { nome_servico, valor_servico, tempo, imagem, tipo } = req.body;

    const { error } = servicoSchema.validate({ nome_servico, valor_servico, tempo, imagem, tipo });

    if (error) {
        res.status(400).json({ error: 'Dados de serviço inválidos' });
        return;
    }

    const novoServico = {
        nome_servico,
        valor_servico,
        tempo,
        imagem,
        tipo
    };

    db.query('INSERT INTO servico SET ?', novoServico, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar serviço:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Serviço adicionado com sucesso' });
    });
};

//Atualizar um serviço
exports.atualizarServico = (req, res) => {
    const { id_servico } = req.params;
    const { nome_servico, valor_servico, tempo, imagem, tipo } = req.body

    const { error } = servicoSchema.validate({ nome_servico,valor_servico, tempo, imagem, tipo });

    if (error) {
        res.status(400).json({ error: 'Dados do serviço inválidos' });
        return;
    }

    const servicoAtualizado = {
        nome_servico,
        valor_servico,
        tempo,
        imagem,
        tipo
    };

    db.query('UPDATE servico SET ? WHERE id_servico = ?', [servicoAtualizado, id_servico], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar serviço:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Serviço atualizado com sucesso' });
    });
};

//Deletar um serviço
exports.deletarServico = (req, res) => {
    const { id_servico } = req.params;

    db.query('DELETE FROM servico WHERE id_servico = ?', id_servico, (err, result) => {
        if (err) {
            console.error('Erro ao deletar serviço:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Serviço deletado com sucesso' });
    });
};
