
import { useEffect, useState } from "react";
import VeiculoForm from "../components/VeiculoForm";

export default function VeiculosPage() {
  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [erro, setErro] = useState("");

  const buscarClientes = async () => {
    try {
      const resposta = await fetch("http://localhost:3001/api/clientes");

      if (!resposta.ok) {
        throw new Error("Erro ao buscar clientes");
      }

      const data = await resposta.json();
      setClientes(data);
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
    buscarClientes();
    buscarVeiculos();
  }, []);

  const handleSalvar = async (dadosVeiculos) => {
    try {
      const resposta = await fetch("http://localhost:3001/api/veiculos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosVeiculos)
      });

      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar veículo");
      }

      await buscarVeiculos();
      setErro("");
    } catch (error) {
      setErro(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Gerenciamento de Veículos</h3>

      {erro && <p>{erro}</p>}

      <VeiculoForm
        clientes={clientes}
        onSalvar={handleSalvar}
      />

      <table>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Ano</th>
            <th>Cliente Proprietário</th>
          </tr>
        </thead>

        <tbody>
          {veiculos.map((veiculo) => {
            const cliente = clientes.find(
              (c) =>
                String(c.id ?? c.Id) ===
                String(veiculo.clienteId)
            );

            return (
              <tr key={veiculo.id ?? veiculo.Id}>
                <td>{veiculo.placa}</td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.marca}</td>
                <td>{veiculo.ano}</td>
                <td>
                  {cliente ? cliente.nome : "Cliente não encontrado"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
