
import pool from '../config/database.js';
import cryptoSer from '../utils/crypto.js';

class AgendamentoController {

    async listar(req, res) {

        const {ordernarPor} = req.query; // dia mes ou ano
        try {
         const sql = `select 
        a.id, a.data_agendamento, a.descricao_servico, a.status,
        c.id as id_cliente, c.nome, c.cpf, c.telefone, c.email,
        v.id as id_veiculo, v.placa, v.modelo, v.marca, v.ano

        from agendamentos as a
        join veiculos as v 
         on a.veiculo_id = v.id
        join clientes as c 
         on v.cliente_id = c.id
        order by a.data_agendamento asc;`
            
            // order by month(a.data_agendamento) asc; // month = mes, day = dia
            const [rows] = await pool.query(sql);

            rows.forEach(row => {
               

                row.cpf = cryptoSer.decrypt(row.cpf);
            });

            return res.status(200).json(rows);

        } catch (error) {
            console.error('Erro ao listar agendamentos:', error.message);

            return res.status(500).json({
                message: 'Erro interno do servidor'
            });
        }
    }

    async criar(req, res) {
        const { data_agendamento, descricao_servico, veiculo_id, status } = req.body;

        if (!data_agendamento || !descricao_servico || !veiculo_id || !status) {
            return res.status(400).json({
                message: 'Todos os campos são obrigatórios'
            });
        }

        try {
            const [result] = await pool.query(
                'INSERT INTO agendamentos (data_agendamento, descricao_servico, veiculo_id, status) VALUES (?, ?, ?, ?)',
                [data_agendamento, descricao_servico, veiculo_id, status]
            );

            return res.status(201).json({
                message: 'Agendamento criado com sucesso',
                id: result.insertId
            });

        } catch (error) {
            console.error('Erro ao criar agendamento:', error.message);

            return res.status(500).json({
                message: 'Erro interno do servidor'
            });
        }
    }

    async editarData(req, res) {
        const { id } = req.params;
        const { nova_data } = req.body;

        if (!nova_data)
            return res.status(400).json({
                message: 'Verifique o valor enviado para a nova data do agendamento'
            });
        

        try {
            const [result] = await pool.query(
                'UPDATE agendamentos SET data_agendamento = ? WHERE id = ?',
                [nova_data, id]
            );

            return res.status(200).json({
                message: 'Data do agendamento atualizada com sucesso',
                id: result.insertId
            });

        } catch (error) {
            console.error('Erro ao atualizar data do agendamento:', error.message);

            return res.status(500).json({
                message: 'Erro interno do servidor'
            });
        }
    }
}

export default AgendamentoController;
