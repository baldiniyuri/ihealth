import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import "../BloodPressure/bloodpressure_style.css";
import { getUserBloodPressureThank } from "../../Store/Modules/BloodPressure/thunk";
import { DatePicker, Button } from "antd";
import columns from "../../Components/BloodPressure/columns";
import { useSelector } from "react-redux";

const BloodPressureMedicView = () => {
  const token = window.localStorage.getItem("authToken");
  const [user_id, setUserId] = useState(0);
  const dispatch = useDispatch();
  const actualDate = new Date();
  const [error, setError] = useState(false);
  const [BloodPressureDateStart, setBloodPressureDateStart] = useState(
    `${actualDate.getFullYear()}-${actualDate.getMonth()}-${actualDate.getDay()}`
  );
  const [BloodPressureDateEnd, setBloodPressureDateEnd] = useState(
    `${actualDate.getFullYear()}-${actualDate.getMonth()}-${actualDate.getDay()}`
  );
  const BloodPressureData = useSelector((state) => state.bloodpressure);
  const [BloodPressureDisplay, setBloodPressureDisplay] = useState([]);
  const [pacientName, setPacientName] = useState("");

  const getUserBloodPressure = async () => {
    dispatch(
      await getUserBloodPressureThank(
        BloodPressureDateStart,
        BloodPressureDateEnd,
        token,
        user_id,
        setError
      )
    );
    getData();
  };

  const getData = async () => {
    const arr = [];
    await BloodPressureData;

    if (error) {
      alert("There are no measures for this date.");
      setError(false);
      return;
    }

    if (BloodPressureData.length > 0) {
      setPacientName(BloodPressureData[0].pressure_level[0].user.username);

      for (let i = 0; i < BloodPressureData[0].pressure_level.length; i++) {
        arr.push({
          systolic_level: BloodPressureData[0].pressure_level[i].systolic_level,
          diastolic_level:
            BloodPressureData[0].pressure_level[i].diastolic_level,
          bpm: BloodPressureData[0].pressure_level[i].bpm,
          date_time: BloodPressureData[0].pressure_level[i].date_time.slice(
            0,
            10
          ),
          hour: BloodPressureData[0].pressure_level[i].date_time.slice(11, 16),
        });
      }
      setBloodPressureDisplay(arr);
    } else {
      alert("Invalid user");
    }
  };

  const onChangeStart = (value, dateString) => {
    let date = dateString + "T00:00:00.000000Z";
    setBloodPressureDateStart(date);
  };

  const onChangeEnd = (value, dateString) => {
    let date = dateString + "T00:00:00.000000Z";
    setBloodPressureDateEnd(date);
  };

  return (
    <div className="App-header">
      <div className="outer_div-pressure">
        <div className="BloodPressure_title">
          {pacientName ? (
            <h3 className="BloodPressure_title_pacient">
              Blood Pressure Levels of pacient {pacientName}
            </h3 >
          ) : (
            <h3 className="BloodPressure_title">Search for a pacient levels by using his id</h3>
          )}
        </div>

        <div className="container-pressure">
          <div className="item-pressure">
            <DatePicker
              id="BloodPressureDate"
              className="BloodPressure_buttons"
              onChange={onChangeStart}
              placeholder="Start Date"
            ></DatePicker>{" "}
            <DatePicker
              id="BloodPressureDate"
              className="BloodPressure_buttons"
              onChange={onChangeEnd}
              placeholder="End Date"
            ></DatePicker>{" "}
          </div>
          <div className="item-pressure">
            <input
              className="input-medic-size"
              type="number"
              id="pacient-id"
              placeholder="Pacient Id"
              onChange={(e) => setUserId(e.target.value)}
            />
            <Button
              onClick={getUserBloodPressure}
              className="BloodPressure_buttons"
            >
              {" "}
              Searh Levels
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={BloodPressureDisplay} />
      </div>
    </div>
  );
};

export default BloodPressureMedicView;
