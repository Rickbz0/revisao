
import { Router } from 'express';
import ClienteController from '../controllers/ClienteController.js';
import VeiculoController from '../controllers/VeiculoController.js';
import AgendamentoController from '../controllers/AgendamentoController.js';
import DashboardController from '../controllers/DashboardController.js';

const veiculoController = new VeiculoController();
const agendamentoController = new AgendamentoController();

const router = Router();

const clienteController = new ClienteController();

// Rotas para clientes
router.get('/clientes', clienteController.listar);
router.post('/clientes', clienteController.criar);

// Rotas para veículos
router.post('/veiculos', veiculoController.criar);
router.get('/veiculos', veiculoController.listar);

// Rotas para agendamentos
router.post('/agendamentos', agendamentoController.criar);
router.get('/agendamentos', agendamentoController.listar);
router.put('/agendamentos/:id/data', agendamentoController.editarData);

// Rota para o dashboard
router.get('/dashboard', DashboardController.resumo);
export default router;
