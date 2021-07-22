import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import "../Glucose/glucose_style.css";
import { getUserGlucoseThank } from "../../Store/Modules/Glucose/thunk";
import { DatePicker, Button } from "antd";
import columns from "../../Components/Glucose/columns";
import { useSelector } from "react-redux";

const GlucoseMedicView = () => {
  const token = window.localStorage.getItem("authToken");
  const [user_id, setUserId] = useState(0);
  const dispatch = useDispatch();
  const actualDate = new Date();
  const [error, setError] = useState(false);
  const [glucoseDateStart, setGlucoseDateStart] = useState(
    `${actualDate.getFullYear()}-${actualDate.getMonth()}-${actualDate.getDay()}`
  );
  const [glucoseDateEnd, setGlucoseDateEnd] = useState(
    `${actualDate.getFullYear()}-${actualDate.getMonth()}-${actualDate.getDay()}`
  );
  const glucoseData = useSelector((state) => state.glucose);
  const [GlucoseDispaly, setGlucoseDisplay] = useState([]);
  const [pacientName, setPacientName] = useState("");

  const getUserGlucose = async () => {
    dispatch(
      getUserGlucoseThank(
        await glucoseDateStart,
        glucoseDateEnd,
        token,
        user_id,
        setError
      )
    );

    getData();
  };

  const getData = async () => {
    const arr = [];
    await glucoseData;
    console.log(glucoseData[0]);
    if (error) {
      alert("There are no measures for this date.");
      setError(false);
      return;
    }

    if (glucoseData.length > 0) {
      setPacientName(glucoseData[0].glucose_level[0].user.username);
      for (let i = 0; i < glucoseData[0].glucose_level.length; i++) {
        // Populating display array
        arr.push({
          glucose_level: glucoseData[0].glucose_level[i].glucose,
          hour: glucoseData[0].glucose_level[i].date_time.slice(11, 16),
          date_time: glucoseData[0].glucose_level[i].date_time.slice(0, 10),
        });
      }
      setGlucoseDisplay(arr);
    }
  };

  const onChangeStart = (value, dateString) => {
    let date = dateString + "T00:00:00.000000Z";
    setGlucoseDateStart(date);
  };

  const onChangeEnd = (value, dateString) => {
    let date = dateString + "T00:00:00.000000Z";
    setGlucoseDateEnd(date);
  };

  return (
    <div className="App-header">
      <div className="outer_div_glucose">
        <div className="glucose_title">
        {pacientName ? (
        <h3 className="glucose_title_pacient">
            Glucose Levels of pacient {pacientName}
          </h3>
        ) : (
          <h3 className="glucose_title">Search for a pacient levels by using his id</h3>
        )}

        </div>

          <div className="container-glucose">
        <div className="item-glucose">
        <DatePicker
          id="glucoseDate"
          className="glucose_buttons"
          onChange={onChangeStart}
          placeholder="Start Date"
        ></DatePicker>{" "}
        <DatePicker
          id="glucoseDate"
          className="glucose_buttons"
          onChange={onChangeEnd}
          placeholder="End Date"
        ></DatePicker>{" "}

        </div>
        <div className="item-glucose">
        <input
          className="input-medic-size"
          type="number"
          id="pacient-id"
          placeholder="Pacient Id"
          onChange={(e) => setUserId(e.target.value)}
        />
       <Button onClick={getUserGlucose} className="glucose_buttons">
          {" "}
          Searh Levels
        </Button>{" "}
        </div>

      </div>
      </div>
      <div>
        <Table columns={columns} dataSource={GlucoseDispaly} />
      </div>
     
    </div>
  );
};

export default GlucoseMedicView;
