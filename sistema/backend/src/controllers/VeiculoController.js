
import pool from '../config/database.js';

class VeiculoController {

    async criar(req, res) {
        const { placa, modelo, marca, ano, cliente_id } = req.body;

        if (!placa || !modelo || !marca || !ano || !cliente_id) {
            return res.status(400).json({
                message: 'Todos os campos são obrigatórios'
            });
        }

        try {
            const [result] = await pool.query(
                'INSERT INTO veiculos (placa, modelo, marca, ano, cliente_id) VALUES (?, ?, ?, ?, ?)',
                [placa, modelo, marca, ano, cliente_id]
            );

            return res.status(201).json({
                message: 'Veículo criado com sucesso',
                id: result.insertId
            });

        } catch (error) {
            console.error('Erro ao criar veículo:', error.message);

            return res.status(500).json({
                message: 'Erro interno do servidor'
            });
        }
    }

    async listar(req, res) {
        try {
            const [result] = await pool.query(`
                SELECT 
                    v.id,
                    v.placa,
                    v.modelo,
                    v.marca,
                    v.ano,
                    v.cliente_id,
                    c.nome AS nome_cliente
                FROM veiculos AS v
                JOIN clientes AS c
                    ON v.cliente_id = c.id
                ORDER BY v.id DESC
            `);

            return res.status(200).json(result);

        } catch (error) {
            console.error('Erro ao listar veículos:', error.message);

            return res.status(500).json({
                message: 'Erro interno do servidor'
            });
        }
    }
}

export default VeiculoController;
