import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "../BloodPressure/bloodpressure_style.css";
import { postUserPressureThank } from "../../Store/Modules/BloodPressure/thunk";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const PostBloodPressure = () => {
  const token = window.localStorage.getItem("authToken");
  const user_id = window.localStorage.getItem("userID");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [systolic, setSystolic] = useState(0);
  const [diastolic, setDiastolic] = useState(0);
  const [bpm, setBpm] = useState(0)
  const history = useHistory();

  const UserData = {
    systolic_level: parseInt(systolic),
    diastolic_level: parseInt(diastolic),
    bpm: parseInt(bpm)
  };

  const registerBloodPressure = () => {
    setTimeout(() => {
      postUserData();
    }, 1000);
  };

  const postUserData = async () => {
    dispatch(postUserPressureThank(await UserData, token, user_id, setError));
    history.push("/pressure");
  };

  return (
    <div className="App-header">
      <div className="outer_div">
        <div className="BloodPressure_title_post">
        <h3 className="BloodPressure_title">Post Blood Pressure Levels</h3>
        </div>
        <form className="form-align-pressure">
        <input
          className="input_style"
          type="number"
          id="systolic_level"
          placeholder="Systolic Level"
          onChange={(e) => setSystolic(e.target.value)}
        />
        <input
          className="input_style"
          type="number"
          id="diastolic_level"
          placeholder="Diastolic"
          onChange={(e) => setDiastolic(e.target.value)}
        />
        <input
          className="input_style"
          type="number"
          id="bpm"
          placeholder="Heart Beat"
          onChange={(e) => setBpm(e.target.value)}
        />
        </form>
        <Button onClick={registerBloodPressure} className="BloodPressure_buttons">
          {" "}
          Register Levels
        </Button>{" "}
        <br/>

      </div>
    </div>
  );
};

export default PostBloodPressure;
