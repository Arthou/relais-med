import { Calendar } from "primereact/calendar";
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import agentes from "../data/db";
import getPreviousMonth from "./../utils/dateTime";
// import logoRelais from "./logoRelais.png";

const DetailedMeasurementForm = ({ onChange }) => {
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [horarioInicial, setHorarioInicial] = useState(null);
  const [horarioFinal, setHorarioFinal] = useState(null);
  const [pontos, setPontos] = useState([]);
  const [selectedAgente, setSelectedAgente] = useState(null);
  const [selectedPonto, setSelectedPonto] = useState(null);
  const [values, setValues] = useState({});
  const [descricao, setDescricao] = useState("⠀");

  const onAgenteChange = (e) => {
    const obj = { ...values };
    obj[e.target.id] = e.value;
    setValues(obj);
    onChange(obj);
    setSelectedAgente(e.value);
    setPontos(e.value.pontos);
    setDescricao("⠀");
  };

  const onPontoChange = (e) => {
    setSelectedPonto(e.value);
    setDescricao(e.value.descricao);
  };

  return (
    <>
      <div className="flex flex-column gap-4">
        <div className="flex flex-row gap-3 justify-content-center">
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="monthpicker">Data Inicial</label>
            <Calendar
              dateFormat="dd/mm/yy"
              id="basic"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.value)}
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="monthpicker">Data Final</label>
            <Calendar
              dateFormat="dd/mm/yy"
              id="basic"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.value)}
            />
          </div>
        </div>
        <div className="flex flex-row gap-3 justify-content-center">
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="monthpicker">Horário Inicial</label>
            <Calendar
              id="time24"
              value={horarioInicial}
              onChange={(e) => setHorarioInicial(e.value)}
              timeOnly
              hourFormat="24"
            />
          </div>
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="monthpicker">Horário Final</label>
            <Calendar
              id="time24"
              value={horarioFinal}
              onChange={(e) => setHorarioFinal(e.value)}
              timeOnly
              hourFormat="24"
            />
          </div>
        </div>
        <div className="flex flex-column pt-1 justify-content-center">
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="monthpicker">Agente</label>
            <Dropdown
              id="agente"
              value={selectedAgente}
              options={agentes}
              onChange={onAgenteChange}
              optionLabel="agente"
              placeholder="Selecione o Agente"
            />
          </div>
        </div>
        <div className="flex flex-column gap-1 justify-content-center">
          <div className="flex flex-1 flex-column gap-2">
            <label htmlFor="monthpicker">Ponto de Medição</label>
            <Dropdown
              value={selectedPonto}
              options={pontos}
              onChange={onPontoChange}
              optionLabel="ponto"
              placeholder="Selecione o Ponto"
            />
          </div>
          <div className="flex font-bold flex-row justify-content-end">
            <label htmlFor="">{descricao}</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedMeasurementForm;
