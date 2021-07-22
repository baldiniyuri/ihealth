import { useHistory } from "react-router-dom";
import React from "react";
import { Button } from "antd";
import "../Medic/medic_style.css";

const MedicView = () => {
  const history = useHistory();

  return (
    <div className="outer_div-medic-view">
      <div>
        <h3 className="title-medic-view">Medic view</h3>
      </div>
      <div className="container-medic-view">
        <div className="item-medic-view">
          <Button
            className="medic_buttons"
            type="button"
            onClick={() => history.push("/glucose-medic")}
          >
            Glucose Levels
          </Button>
          <Button
            className="medic_buttons"
            type="button"
            onClick={() => history.push("/temperature-medic")}
          >
            Temperature Levels
          </Button>
          </div>
          <div className="item-medic-view">
          <Button
            className="medic_buttons"
            type="button"
            onClick={() => history.push("/pressure-medic")}
          >
            Pressure Levels
          </Button>
          <Button
            className="medic_buttons"
            type="button"
            onClick={() => history.push("/historic-medic")}
          >
            Pacient Historic
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicView;
