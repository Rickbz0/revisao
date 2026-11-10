
import 'dotenv/config';
import express from 'express';
import router from './routes/router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:3000'
    ],
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rota inicial
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API funcionando corretamente!'
    });
});

// Rotas da API
app.use('/api', router);

// Middleware para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({
        message: 'Rota não encontrada'
    });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
});
