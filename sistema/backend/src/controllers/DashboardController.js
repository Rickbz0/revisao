
import pool from "../config/database.js";

async function resumo(req, res) {
    try {
        const [[{ total_veiculos }]] = await pool.query(
            "SELECT COUNT(*) AS total_veiculos FROM veiculos"
        );

        const [[{ total_clientes }]] = await pool.query(
            "SELECT COUNT(*) AS total_clientes FROM clientes"
        );

        const [[{ total_agendamentos }]] = await pool.query(
            "SELECT COUNT(*) AS total_agendamentos FROM agendamentos"
        );

        const estatisticas = {
            totalVeiculos: total_veiculos,
            totalClientes: total_clientes,
            totalAgendamentos: total_agendamentos
        };

        return res.json({
            estatisticas
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Ocorreu um erro no servidor",
            errorMessage: error.message
        });
    }
}

export default { resumo };