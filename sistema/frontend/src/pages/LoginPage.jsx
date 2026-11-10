
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        throw new Error(data.message || "Email ou senha incorretos");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/clientes");
    } catch (error) {
      setErro(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>

        <input
          type="email"
          value={email}
          placeholder="Digite o seu Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha:</label>

        <input
          type="password"
          value={senha}
          placeholder="Digite a sua senha"
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">
          Entrar
        </button>

        {erro && (
          <div>
            <strong>Erro: {erro}</strong>
          </div>
        )}
      </form>
    </div>
  );
}
