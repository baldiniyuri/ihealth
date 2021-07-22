import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "../Glucose/glucose_style.css";
import { postUserGlucoseThank } from "../../Store/Modules/Glucose/thunk";
import { Button } from "antd";
import { useHistory } from "react-router-dom";


const PostGlucose = () => {
  const token = window.localStorage.getItem("authToken");
  const user_id = window.localStorage.getItem("userID");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [glucose, setGlucose] = useState(0);
  const history = useHistory();

  const UserData = {
    glucose: glucose,
  };

  const registerGlucose = () => {
    setTimeout(() => {
      postUserData();
    }, 1000);
  };

  const postUserData = async () => {
    dispatch(postUserGlucoseThank(await UserData, token,user_id, setError));
    history.push("/glucose");


    if (error) {
      alert("Wrong data!");
      setError(false);
      return;
    }
  };

  return (
    <div className="App-header">
      <div className="outer_div_glucose_post">
        <div>
        <h3 className="glucose_title_post">Glucose Levels</h3>

        </div>
        <input
          className="input_style"
          type="number"
          id="glucose"
          placeholder="Glucose level"
          onChange={(e) => setGlucose(e.target.value)}
        />
        <br/>
        <Button onClick={registerGlucose} className="glucose_buttons">
          {" "}
          Register Level
        </Button>{" "}
      </div>
    </div>
  );
};

export default PostGlucose;
