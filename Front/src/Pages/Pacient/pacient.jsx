import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postUserDataThank } from "../../Store/Modules/Register/thunk";
import { Button } from "antd";
import "../Pacient/pacient_style.css";

const PacientRegister = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [imc, setImc] = useState(0);
  const user_id = window.localStorage.getItem("userID");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const history = useHistory();

  const UserData = {
    age: age,
    gender: gender,
    imc: imc,
  };

  const registerMedic = () => {
    setTimeout(() => {
      postUserData();
    }, 1000);
  };

  const postUserData = async () => {
    dispatch(postUserDataThank(await UserData, user_id, setError));

    history.push("/login");
  };

  return (
    <div className="outer_div">
      <div className="form_align">
        <h3 className="title">Please continue your register.</h3>
        Age:
        <input
          className="input_style"
          type="number"
          id="age"
          onChange={(e) => setAge(e.target.value)}
        />
        Gender:
        <input
          className="input_style"
          type="text"
          id="gender"
          onChange={(e) => setGender(e.target.value)}
        />
        IMC:
        <input
          className="input_style"
          type="number"
          id="imc"
          onChange={(e) => setImc(e.target.value)}
        />
        <Button
          className="register_buttons"
          type="button"
          onClick={registerMedic}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PacientRegister;
