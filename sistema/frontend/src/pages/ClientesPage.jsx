
import { useEffect, useState } from "react";
import ClienteForm from "../components/ClienteForm";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
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

  useEffect(() => {
    buscarClientes();
  }, []);

  const handleCancelarEdicao = () => {
    setClienteEditando(null);
  };

  const handleSalvar = async (dadosClientes) => {
    try {
      const id = clienteEditando?.id ?? clienteEditando?.Id;

      const url = clienteEditando
        ? `http://localhost:3001/api/clientes/${id}`
        : "http://localhost:3001/api/clientes";

      const resposta = await fetch(url, {
        method: clienteEditando ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosClientes)
      });

      if (!resposta.ok) {
        throw new Error("Erro ao salvar cliente");
      }

      await buscarClientes();
      setClienteEditando(null);
      setErro("");
    } catch (error) {
      setErro(error.message);
      console.error(error);
    }
  };

  const handleExcluir = async (id) => {
    try {
      const resposta = await fetch(
        `http://localhost:3001/api/clientes/${id}`,
        { method: "DELETE" }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao excluir cliente");
      }

      await buscarClientes();
      setErro("");
    } catch (error) {
      setErro(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Gerenciamento de Clientes</h3>

      {erro && <p>{erro}</p>}

      <ClienteForm
        clienteEditando={clienteEditando}
        onSalvar={handleSalvar}
        onCancelar={handleCancelarEdicao}
      />

      <table>
        <thead>
          <tr>
            <th>Nome do cliente</th>
            <th>CPF do cliente</th>
            <th>Telefone do cliente</th>
            <th>Email do cliente</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => {
            const id = cliente.id ?? cliente.Id;

            return (
              <tr key={id}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>
                  <button
                    onClick={() => setClienteEditando(cliente)}
                  >
                    Editar
                  </button>

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
