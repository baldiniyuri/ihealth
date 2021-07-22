import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "../Temperature/temperature_style.css";
import { postUserTemperatureThank } from "../../Store/Modules/Temperature/thunk";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const PostTemperature = () => {
  const token = window.localStorage.getItem("authToken");
  const user_id = window.localStorage.getItem("userID");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const history = useHistory();

  const UserData = {
    temperature: temperature,
  };

  const registerTemperature= () => {
    setTimeout(() => {
      postUserData();
    }, 1000);
  };

  const postUserData = async () => {
    dispatch(postUserTemperatureThank(await UserData, token, user_id, setError));
    history.push("/temperature");
  };

  return (
    <div className="App-header">
      <div className="outer_div_temperature_post">
        <div>
        <h3 className="temperature_title_post">Temperature Levels</h3>
        </div>
        <input
          className="input_style"
          type="number"
          id="temperature"
          placeholder="Temperature Level"
          onChange={(e) => setTemperature(e.target.value)}
        />
        <br/>
        <Button onClick={registerTemperature} className="temperature_buttons">
          {" "}
          Register Level
        </Button>{" "}
      </div>
    </div>
  );
};

export default PostTemperature;
