const express = require('express');

const path = require('path');

//Pegando do index 
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "./../pages/home.html"));
})

const clienteController = require('../controllers/clienteController');

const prestadorController = require('../controllers/prestadorController');

const servicoController = require('../controllers/servicoController');

const pacotesController = require('../controllers/pacotesController');

const compromissoController = require('../controllers/compromissoController');

const agendaController = require('../controllers/agendaController');

const prestadoController = require('../controllers/prestadoController');

const loginController = require('../controllers/loginController');

const loginAdmController = require('../controllers/loginAdmController');



//Rotas cliente
router.get('/cliente', clienteController.listarClientes);

router.get('/cliente/:id_cliente', clienteController.buscarCliente);

router.post('/cliente', clienteController.adicionarCliente);

router.patch('/cliente/:id_cliente', clienteController.atualizarCliente);

router.delete('/cliente/:id_cliente', clienteController.deletarCliente);

//Rotas prestador
router.get('/prestador', prestadorController.listarPrestador);

router.get('/prestador/:id_prestador', prestadorController.buscarPrestador);

router.post('/prestador', prestadorController.adicionarPrestador);

router.patch('/prestador/:id_prestador', prestadorController.atualizarPrestador);

router.delete('/prestador/:id_prestador', prestadorController.deletarPrestador);

//Rotas Serviço 
router.get('/servico', servicoController.listarServico);

router.get('/servico/:id_servico', servicoController.buscarServico);

router.post('/servico', servicoController.adicionarServico);

router.patch('/servico/:id_servico', servicoController.atualizarServico);

router.delete('/servico/:id_servico', servicoController.deletarServico);

//Rotas Pacotes 
router.get('/pacotes', pacotesController.listarPacotes);

router.get('/pacotes/:id_pacote', pacotesController.buscarPacote);

router.post('/pacotes', pacotesController.adicionarPacote);

router.patch('/pacotes/:id_pacote', pacotesController.atualizaPacote);

router.delete('/pacotes/:id_pacote', pacotesController.deletarPacote);


//Rotas Compromisso 
router.use('/compromisso', loginController.autenticarToken);
//Todas as rotas compromisso terão que passa pelo autenticar token

router.get('/compromisso', compromissoController.listarCompromisso);

router.get('/compromisso/:id_compromisso', compromissoController.buscarCompromisso);

router.get('/compromisso/data/:data_compromisso', compromissoController.buscarCompromissoData);

router.post('/compromisso', compromissoController.adicionarCompromisso);

router.patch('/compromisso/:id_compromisso', compromissoController.atualizarCompromisso);

router.delete('/compromisso/:id_compromisso', compromissoController.deletarCompromisso);

//Rotas Agenda
router.get('/agenda', agendaController.listarAgenda);

router.get('/agenda/:id_agendamento', agendaController.buscarAgenda);

router.post('/agenda', agendaController.adicionarAgenda);

router.patch('/agenda/:id_agendamento', agendaController.atualizarAgenda);

router.delete('/agenda/:id_agendamento', agendaController.deletarAgenda);


//Rotas Prestado
router.use('/prestado', loginAdmController.autenticarToken);

router.get('/prestado',  prestadoController.listarPrestado);

router.get('/prestado/:id_prestado', prestadoController.buscarPrestado);

router.post('/prestado', prestadoController.adicionarPrestado);

router.patch('/prestado/:id_prestado', prestadoController.atualizaPrestado);

router.delete('/prestado/:id_prestado', prestadoController.deletarPrestado);


//Rotas login 
router.post('/login', loginController.loginCliente);

//Rota login ADM
router.post('/loginAdm', loginAdmController.loginPrestador);




module.exports = router; 