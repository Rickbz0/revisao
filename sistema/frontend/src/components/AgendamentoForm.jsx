import { useEffect, useState } from "react";

export default function VeiculoForm ({ onSalvar, onCancelar, veiculos}) {
    const [formData, setFormData] = useState({
        veiculoId: '',
        dataAgendamento: '',
        descricaoServico: '',
        status: 'Agendado'
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
            veiculoId: '',
            dataAgendamento: '',
            descricaoServico: '',
            status: 'Agendado'
        });
        onCancelar();
    }

    const handleCancelar = (e) => {
        setFormData({
            veiculoId: '',
            dataAgendamento: '',
            descricaoServico: '',
            status: 'Agendado'
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
                Cadastrar Agendamento
            </h5>

            <form>
                <label>Veículo:</label>
                <select name="veiculoId" value={formData.veiculoId} onChange={handleChange} required>

                    <option value="">Selecione um veículo</option>

                    {veiculos.map((veiculo) => (
                        
                        <option key={veiculo.id} value={veiculo.id}>
                            {veiculo.placa} - {veiculo.modelo}
                        </option>
                    ))}
                </select>

                <label>Data e Horario:</label>
                <input type="datetime-local" name="dataAgendamento" value={formData.dataAgendamento} onChange={handleChange}
                 required/>

                <label>Descrição do Serviço:</label>
                <textarea rows={2} name="descricaoServico" value={formData.descricaoServico} onChange={handleChange}
                 required/>
                
                <button onClick={handleSubmit}>
                    confirmar agendamento
                </button>

            </form>
        </div>
    )

}
