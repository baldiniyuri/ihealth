import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import "../Temperature/temperature_style.css";
import { getUserTemperatureThank } from "../../Store/Modules/Temperature/thunk";
import { DatePicker, Button } from "antd";
import columns from "../../Components/Temperature/columns";
import { useSelector } from "react-redux";

const TemperatureMedicView = () => {
  const token = window.localStorage.getItem("authToken");
  const [user_id, setUserId] = useState(0);
  const dispatch = useDispatch();
  const actualDate = new Date();
  const [error, setError] = useState(false);
  const [temperatureDateStart, setTemperatureDateStart] = useState(
    `${actualDate.getFullYear()}-${actualDate.getMonth()}-${actualDate.getDay()}`
  );
  const [temperatureDateEnd, setTemperatureDateEnd] = useState(
    `${actualDate.getFullYear()}-${actualDate.getMonth()}-${actualDate.getDay()}`
  );
  const TemperatureData = useSelector((state) => state.temperature);

  const [pacientName, setPacientName] = useState("");
  const [temperatureDisplay, setTemperatureDisplay] = useState([]);

  const getUserTemperature = async () => {
    getData();
    dispatch(
      getUserTemperatureThank(
        await temperatureDateStart,
        temperatureDateEnd,
        token,
        user_id,
        setError
      )
    );
  };

  const getData = async () => {
    const arr = [];
    await TemperatureData;

    if (error) {
      alert("There are no measures for this date.");
      setError(false);
      return;
    }
    if (TemperatureData[0].temperature_level.length >= 0) {
      setPacientName(TemperatureData[0].temperature_level[0].user.username);
      console.log(TemperatureData[0].temperature_level[0].user.username);
      for (let i = 0; i < TemperatureData[0].temperature_level.length; i++) {
        arr.push({
          temperature: TemperatureData[0].temperature_level[i].temperature,
          date_time: TemperatureData[0].temperature_level[i].date_time.slice(
            0,
            10
          ),
          hour: TemperatureData[0].temperature_level[i].date_time.slice(11, 16),
        });
      }
      setTemperatureDisplay(arr);
    }
  };

  const onChangeStart = (value, dateString) => {
    let date = dateString + "T00:00:00.000000Z";
    setTemperatureDateStart(date);
  };

  const onChangeEnd = (value, dateString) => {
    let date = dateString + "T00:00:00.000000Z";
    console.log(date);
    setTemperatureDateEnd(date);
  };

  return (
    <div className="App-header">
      <div className="outer_div_temperature">
        <div className="temperature_title">
        {pacientName ? (
          <h3 className="temperature_title_pacient">
            Temperature Levels of pacient {pacientName}
          </h3>
        ) : (
          <h3>Search for a pacient levels by using his id</h3>
        )}

        </div>
        <div className="container">
          <div className="item">
            <DatePicker
              id="temperatureDate"
              className="temperature_buttons"
              onChange={onChangeStart}
              placeholder="Start date"
            ></DatePicker>{" "}
            <DatePicker
              id="temperatureDate"
              className="temperature_buttons"
              onChange={onChangeEnd}
              placeholder="End date"
            ></DatePicker>{" "}
          </div>
          <div className="item">
            <input
              className="input-medic-size"
              type="number"
              id="pacient-id"
              placeholder="Pacient ID"
              onChange={(e) => setUserId(e.target.value)}
            />
            <Button
              onClick={getUserTemperature}
              className="temperature_buttons"
            >
              {" "}
              Searh Levels
            </Button>{" "}
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={temperatureDisplay} />
      </div>
    </div>
  );
};

export default TemperatureMedicView;
