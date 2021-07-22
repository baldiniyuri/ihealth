import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import "../BloodPressure/bloodpressure_style.css";
import { getUserBloodPressureThank } from "../../Store/Modules/BloodPressure/thunk";
import {postReportThank} from "../../Store/Modules/Report/thunk"
import { DatePicker, Button } from "antd";
import columns from "../../Components/BloodPressure/columns";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const BloodPressure = () => {
  const token = window.localStorage.getItem("authToken");
  const user_id = window.localStorage.getItem("userID");
  const user_email = window.localStorage.getItem("userEmail")
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
  const history = useHistory();

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


      if (BloodPressureData !== undefined) {
        for (let i = 0; i < BloodPressureData[0].pressure_level.length; i++) {
          arr.push({
            systolic_level:
              BloodPressureData[0].pressure_level[i].systolic_level,
            diastolic_level:
              BloodPressureData[0].pressure_level[i].diastolic_level,
            bpm: BloodPressureData[0].pressure_level[i].bpm,
            date_time: BloodPressureData[0].pressure_level[i].date_time.slice(0,10),
            hour: BloodPressureData[0].pressure_level[i].date_time.slice(11,16),
          });
        }
        setBloodPressureDisplay(arr);
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

  const DataForEmail = async () =>{

  const report = {
    email: user_email,
    type: "pressure",
    data: BloodPressureDisplay 
  }

  dispatch(await postReportThank(report, setError))

  }

  return (
    <div className="App-header">
      <div className="outer_div-pressure">
        <div>

        <h3 className="BloodPressure_title">BloodPressure Levels</h3>
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

        <Button
          onClick={getUserBloodPressure}
          className="BloodPressure_buttons"
        >
          {" "}
          Searh Levels
        </Button>{" "}
        <Button
          onClick={() => history.push("/postpressure")}
          className="BloodPressure_buttons"
        >
          {" "}
          Post Levels
        </Button>{" "}
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={BloodPressureDisplay} />
      </div>
      <Button
          onClick={DataForEmail}
          className="BloodPressure_buttons"
        >
          {" "}
          Report by Email
        </Button>{" "}
    </div>
  );
};

export default BloodPressure;
