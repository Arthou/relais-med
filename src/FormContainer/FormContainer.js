import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React, { useState } from "react";
import DetailedMeasurementForm from "../DetailedMeasurementForm/DetailedMeasurementForm";
import SimpleMeasurementForm from "../SimpleMeasurementForm/SimpleMeasurementForm";
import logoRelais from "./../logoRelais.png";

const FormContainer = () => {
  const [showDetailedForm, setShowDetailedForm] = useState(true);
  const [detailedValues, setDetailedValues] = useState(null);

  const onDetailedFormChange = (values) => {
    setDetailedValues(values);
    console.log(values);
  };

  return (
    <div className="flex flex-column justify-content-center gap-6 w-30rem">
      <Card>
        <div className="flex justify-content-center">
          <img src={logoRelais} className="logo" alt="Relais Energia" />
        </div>
        <div className="flex flex-column gap-6 px-4">
          {showDetailedForm ? (
            <SimpleMeasurementForm />
          ) : (
            <DetailedMeasurementForm onChange={onDetailedFormChange} />
          )}
          <div className="flex flex-row gap-4 justify-content-center">
            <Button
              label="Baixar"
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
