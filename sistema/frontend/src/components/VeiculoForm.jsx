import { useEffect, useState } from "react";

export default function VeiculoForm ({ onSalvar, onCancelar, clientes}) {
    const [formData, setFormData] = useState({
        placa: '',
        modelo: '',
        marca: '',
        ano: '',
        clienteId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar(formData);
        setFormData({
            placa: '',
            modelo: '',
            marca: '',
            ano: '',
            clienteId: ''
        });
        onCancelar();
    }

    const handleCancelar = (e) => {
        setFormData({
            placa: '',
            modelo: '',
            marca: '',
            ano: '',
            clienteId: ''
        });
        onCancelar();
    }

    useEffect(() => {
        if (clienteEditando) {
            setFormData({
                nome: clienteEditando.nome,
                cpf: clienteEditando.cpf,
                telefone: clienteEditando.telefone,
                email: clienteEditando.email
            });
        }
    }, [clienteEditando]);

    return(
        <div>
            <h5>
                Cadastrar Novo Veículo
            </h5>

            <form>
                <label>Placa Veículo:</label>
                <input type="text" name="placa" value={formData.placa} onChange={handleChange}
                required/>

                <label>Modelo:</label>
                <input type="text" name="modelo" value={formData.modelo} onChange={handleChange}
                 required/>

                <label>Marca:</label>
                <input type="text" name="marca" value={formData.marca} onChange={handleChange}
                 required/>

                <label>Ano:</label>
                <input type="number" name="ano" value={formData.ano} onChange={handleChange}
                 required/>

                <label>Proprietario do veiculo</label>
                <select name="clienteId" value={formData.clienteId} onChange={handleChange} required>

                    <option value="">Selecione um cliente</option>

                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
                
                <button onClick={handleSubmit}>
                    Salvar veiculo
                </button>

            </form>
        </div>
    )

}
