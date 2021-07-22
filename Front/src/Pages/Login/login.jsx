import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserLoginThank } from "../../Store/Modules/Login/thunk";
import { Button } from "antd";
import "../Login/login_style.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const history = useHistory();

  const UserData = {
    username: userName,
    password: password,
  };
  const loginPacient = () => {
    setTimeout(() => {
      postUserData();
    }, 1000);
  };

  const postUserData =  () => {
    dispatch(UserLoginThank( UserData, setError));

    setTimeout(() =>{
      if (error === true) {
        history.push("/login");
        setError(false);
      } else {
        const medic =  window.localStorage.getItem('medic')
        if(medic === 'true'){
          history.push("/medicview");
        }else{
          history.push("/");
        }

        
      }
    }, 1000);

  };

  return (
    <div className="outer_div_login">
      <div className="form_align">
        <h3 className="title">Please login to your account.</h3>
        <input
          className="input_style"
          type="text"
          id="username"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          className="input_style"
          type="password"
          id="password"
          placeholder="Password:"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button className="login_buttons" type="button" onClick={() => loginPacient()}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Login;
