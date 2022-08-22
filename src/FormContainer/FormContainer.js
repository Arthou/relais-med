import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React, { useState } from "react";
import agentes from "../data/db";
import DetailedMeasurementForm from "../DetailedMeasurementForm/DetailedMeasurementForm";
import SimpleMeasurementForm from "../SimpleMeasurementForm/SimpleMeasurementForm";
import { dateString, hourString, lastDayGivenMonth } from "../utils/dateTime";
import logoRelais from "./../logoRelais.png";

const FormContainer = () => {
  const [showDetailedForm, setShowDetailedForm] = useState(true);
  const [detailedValues, setDetailedValues] = useState(null);
  const [simpleValues, setSimpleValues] = useState(null);

  const onDetailedFormChange = (values) => {
    setDetailedValues(values);    
  };

  const onSimpleFormChange = (values) => {
    setSimpleValues(values);
  };

  const fetchData = (isFinal) => {
    fetch("https://localhost:5000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: showDetailedForm
        ? postBodySimple(isFinal)
        : postBodyDetailed(isFinal),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postBodySimple = (isFinal) => {
    console.log(simpleValues);
    console.log(simpleValues);
    const startDate = dateString(simpleValues.date);
    const endDate = dateString(
      lastDayGivenMonth(
        new Date(
          simpleValues.date.getFullYear(),
          simpleValues.date.getMonth() + 2,
          0
        )
      )
    );
    const body = JSON.stringify({
      startDate: startDate + "T01:00:00",
      endDate: endDate + "T00:00:00",
      tipoMedicao: isFinal ? "FINAL" : "FALTANTE",
      infoAgente: agentes, //agentes.map((x) => x.pontos),
      simple: "true",
    });
    console.log(body);
    return body;
  };

  const postBodyDetailed = (isFinal) => {
    console.log(detailedValues);
    const startDate = dateString(detailedValues.dataInicial);
    const endDate = dateString(detailedValues.dataFinal);
    const startHour = hourString(detailedValues.horarioInicial);
    const endHour = hourString(detailedValues.horarioFinal);
    const body = JSON.stringify({
      startDate: startDate + "T" + startHour,
      endDate: endDate + "T" + endHour,
      tipoMedicao: isFinal ? "FINAL" : "FALTANTE",
      infoAgente: [
        {
          agente: detailedValues.agente.agente,
          codigoPerfil: detailedValues.agente.codigoPerfil,
          agenteCCEE: detailedValues.agente.agenteCCEE,
          pontos: [
            {
              ponto: detailedValues.ponto.ponto,
              descricao: detailedValues.ponto.descricao,
            },
          ],
        },
      ], //agentes.map((x) => x.pontos),
      simple: "false",
    });
    console.log(body);
    return body;
  };

  return (
    <div className="flex flex-column justify-content-center gap-6 w-30rem">
      <Card style={{ transition: "height 4s" }}>
        <div className="flex justify-content-center">
          <img src={logoRelais} className="logo" alt="Relais Energia" />
        </div>
        <div className="flex flex-column gap-1 px-4">
          {showDetailedForm ? (
            <SimpleMeasurementForm onChange={onSimpleFormChange} />
          ) : (
            <DetailedMeasurementForm onChange={onDetailedFormChange} />
          )}
          <div className="flex flex-row gap-4 justify-content-center">
            <Button
              label="Baixar"
              onClick={() => fetchData(true)}
              className="p-button-outlined p-button-rounded"
            />
            <Button
              label="Horas Faltantes"
              onClick={() => fetchData(false)}
              className="p-button-outlined p-button-rounded p-button-danger"
            />
          </div>
        </div>
      </Card>
      <div className="flex justify-content-center">
        <div className="flex justify-content-center">
          <Button
            icon={showDetailedForm ? "pi pi-angle-down" : "pi pi-angle-up"}
            onClick={() => setShowDetailedForm(!showDetailedForm)}
            className="p-button-raised p-button-rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
