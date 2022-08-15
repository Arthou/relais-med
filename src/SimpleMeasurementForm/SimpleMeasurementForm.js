import { Calendar } from "primereact/calendar";
import React, { useEffect, useState } from "react";
import getPreviousMonth from "./../utils/dateTime";

const SimpleMeasurementForm = () => {
  const [date, setDate] = useState(getPreviousMonth());

  useEffect(() => {
    //var options = { year: "numeric", month: "numeric" };
    //console.log(new Date(date).toLocaleDateString([], options));
    //var date = new Date();
    //setDate();
  }, []);

  return (
    <>
      <div className="flex flex-column gap-2 px-5">
        <label htmlFor="monthpicker">Mês de Medição</label>
        <Calendar
          className="flex-1"
          id="monthpicker"
          value={date}
          onChange={(e) => setDate(e.value)}
          view="month"
          dateFormat="mm/yy"
        />
      </div>
    </>
  );
};

export default SimpleMeasurementForm;
