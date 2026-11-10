import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ClientesPage from "./pages/ClientesPage";
import VeiculosPage from "./pages/VeiculosPage";
import AgendamentosPage from "./pages/AgendamentosPage";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/veiculos" element={<VeiculosPage />} />
        <Route path="/agendamentos" element={<AgendamentosPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
