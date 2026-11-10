
import { useEffect, useState } from "react";
import AgendamentoForm from "../components/AgendamentoForm";

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [erro, setErro] = useState("");

  const buscarAgendamentos = async () => {
    try {
      const resposta = await fetch("http://localhost:3001/api/agendamentos");

      if (!resposta.ok) {
        throw new Error("Erro ao buscar agendamentos");
      }

      const data = await resposta.json();
      setAgendamentos(data);
    } catch (error) {
      setErro(error.message);
      console.error(error);
    }
  };

  const buscarVeiculos = async () => {
    try {
      const resposta = await fetch("http://localhost:3001/api/veiculos");

      if (!resposta.ok) {
        throw new Error("Erro ao buscar veículos");
      }

      const data = await resposta.json();
      setVeiculos(data);
    } catch (error) {
      setErro(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    buscarAgendamentos();
    buscarVeiculos();
  }, []);

  const handleSalvar = async (dadosAgendamento) => {
    try {
      const resposta = await fetch("http://localhost:3001/api/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosAgendamento)
      });

      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar agendamento");
      }

      await buscarAgendamentos();
      setErro("");
    } catch (error) {
      setErro(error.message);
      console.error(error);
    }
  };

  const handleExcluir = async (id) => {
    try {
      const resposta = await fetch(
        `http://localhost:3001/api/agendamentos/${id}`,
        { method: "DELETE" }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao excluir agendamento");
      }

      await buscarAgendamentos();
      setErro("");
    } catch (error) {
      setErro(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Gerenciamento de Agendamentos</h3>

      {erro && <p>{erro}</p>}

      <AgendamentoForm
        veiculos={veiculos}
        onSalvar={handleSalvar}
      />

      <table>
        <thead>
          <tr>
            <th>Data e Horário</th>
            <th>Serviço</th>
            <th>Veículo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {agendamentos.map((agendamento) => {
            const id = agendamento.id ?? agendamento.Id;

            const veiculo = veiculos.find(
              (v) =>
                String(v.id ?? v.Id) ===
                String(agendamento.veiculoId)
            );

            return (
              <tr key={id}>
                <td>
                  {new Date(
                    agendamento.dataAgendamento
                  ).toLocaleString("pt-BR")}
                </td>

                <td>{agendamento.descricaoServico}</td>

                <td>
                  {veiculo
                    ? `${veiculo.placa} - ${veiculo.modelo}`
                    : "Veículo não encontrado"}
                </td>

                <td>{agendamento.status}</td>

                <td>
                  <button onClick={() => handleExcluir(id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
