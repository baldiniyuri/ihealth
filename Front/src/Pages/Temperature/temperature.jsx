import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import "../Temperature/temperature_style.css";
import { getUserTemperatureThank } from "../../Store/Modules/Temperature/thunk";
import {postReportThank} from "../../Store/Modules/Report/thunk";
import { DatePicker, Button } from "antd";
import columns from "../../Components/Temperature/columns";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Temperature = () => {
  const token = window.localStorage.getItem("authToken");
  const user_id = window.localStorage.getItem("userID");
  const user_email = window.localStorage.getItem("userEmail");
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
  const history = useHistory();

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

  const DataForEmail = async () =>{
    
    const report = {
      email: user_email,
      type: "temperature",
      data: temperatureDisplay 
    }
  
    dispatch(await postReportThank(report, setError))
  
    }

  return (
    <div className="App-header">
      <div className="outer_div_temperature">
       <div>

        <h3 className="temperature_title">Temperature Levels</h3>
       </div>
       <div className="container-temperature">
        <div className="item-temperature">

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
        <div className="item-temperature">

        <Button onClick={getUserTemperature} className="temperature_buttons">
          {" "}
          Searh Levels
        </Button>{" "}
        <Button
          onClick={() => history.push("/posttemperature")}
          className="temperature_buttons"
        >
          {" "}
          Post Levels
        </Button>{" "}
        </div>

       </div>
      </div>
      <div>
        <Table columns={columns} dataSource={temperatureDisplay} />
      </div>
      <Button
          onClick={DataForEmail}
          className="temperature_buttons"
        >
          {" "}
          Report by Email
        </Button>{" "}
    </div>
  );
};

export default Temperature;
