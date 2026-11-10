
import pool from '../config/database.js';
import cryptoService from '../utils/crypto.js';

class ClienteController {

    async listar(req, res) {
        try {
            const { termo } = req.query;

            let clientes;

            if (termo && termo.trim() !== '') {
                const busca = `%${termo.trim()}%`;

                const [rows] = await pool.query(
                    'SELECT * FROM clientes WHERE nome LIKE ? OR email LIKE ? ORDER BY id DESC',
                    [busca, busca]
                );

                clientes = rows;
            } else {
                const [rows] = await pool.query(
                    'SELECT * FROM clientes ORDER BY id DESC'
                );

                clientes = rows;
            }

            return res.status(200).json(clientes);

        } catch (error) {
            console.error('Erro ao listar clientes:', error.message);

            return res.status(500).json({
                message: 'Erro interno do servidor'
            });
        }
    }

    async criar(req, res) {
        const { nome, cpf, telefone, email } = req.body;

        if (!nome || !cpf || !telefone || !email) {
            return res.status(400).json({
                message: 'Todos os campos são obrigatórios'
            });
        }

        try {
            const cpfCriptografado = cryptoService.encrypt(cpf);

            const [result] = await pool.query(
                'INSERT INTO clientes (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)',
                [nome, cpfCriptografado, telefone, email]
            );

            return res.status(201).json({
                message: 'Cliente criado com sucesso',
                id: result.insertId
            });

        } catch (error) {
            console.error('Erro ao criar cliente:', error.message);

            return res.status(500).json({
                message: 'Erro interno do servidor'
            });
        }
    }
}

export default ClienteController;
