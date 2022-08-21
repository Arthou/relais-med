import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React, { useState } from "react";
import agentes from "../data/db";
import DetailedMeasurementForm from "../DetailedMeasurementForm/DetailedMeasurementForm";
import SimpleMeasurementForm from "../SimpleMeasurementForm/SimpleMeasurementForm";
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

  const fetchData = () => {
    fetch("https://localhost:5000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: showDetailedForm ? postBody(true) : postBody(false),
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

  const postBody = (simple) => {
    let body;
    if (simple) {
      //var jason = JSON.parse(agentes);
      console.log(agentes);
      body = JSON.stringify({
        parameterOne: "something",
        parameterTwo: agentes.map((x) => x.agente),
      });
    } else {
      body = JSON.stringify({
        parameterOne: "something",
        parameterTwo: [detailedValues.agente.agente],
      });
    }
    console.log(detailedValues);
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
              onClick={fetchData}
              className="p-button-outlined p-button-rounded"
            />
            <Button
              label="Horas Faltantes"
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
