import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postUserDataThank } from "../../Store/Modules/Register/thunk";
import { Button, Radio } from "antd";
import "../Register/register_style.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isStaff, setIsStaff] = useState(true);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const history = useHistory();

  const UserData = {
    username: userName,
    first_name: firstName,
    last_name: lastName,
    password: password,
    email: email,
    is_staff: isStaff,
    is_superuser: isSuperUser,
  };

  const registerPacient = () => {
    setTimeout(() => {
      postUserData();
    }, 1000);
  };

  const postUserData = async () => {
    dispatch(postUserDataThank(await UserData, setError));

    if (error) {
      alert("Wrong data!");
      setError(false);
      return;
    }

    if (isSuperUser === true){
      history.push("/medicregister");
    }else{
      history.push("/pacientregister");
    }
  };

  const [value, setValue] = useState(0);

  const onChange = (e) => {
    if (e.target.value === 1) {
      setIsStaff(false);
      setIsSuperUser(true);
    } else {
      setIsStaff(true);
      setIsSuperUser(false);
    }
    setValue(e.target.value);
  };

  return (
    <div className="outer_div_register">
      <div className="form_align">
        <h3 className="title">Please register to our site.</h3>
        <form>
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
          type="text"
          id="first_name"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <input
          className="input_style"
          type="text"
          id="last_name"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <input
          className="input_style"
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="input_style"
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Radio.Group className="title" onChange={onChange} value={value}>
          <Radio value={1}>Medic</Radio>
          <Radio value={2}>Pacient</Radio>
        </Radio.Group>
        <br />
        </form>
        <Button
          className="register_buttons"
          type="button"
          onClick={registerPacient}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Register;
