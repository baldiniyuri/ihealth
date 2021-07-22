import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postMedicDataThank } from "../../Store/Modules/Medic/thunk";
import { Button } from "antd";
import "../Medic/medic_style.css";


const MedicRegister = () => {
  const [crm, setCrm] = useState("");
  const user_id = window.localStorage.getItem("userID");
  const token = window.localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const history = useHistory();

  const UserData = {
    crm: crm
  };

  const registerMedic= () => {
    setTimeout(() => {
      postUserData();
    }, 3000);
  };

  const postUserData = async () => {
    dispatch(postMedicDataThank(await UserData, user_id, token, setError));

    history.push("/medicview");
  };



  return (
    <div className="outer_div">
      <div className="form_align">
        <h3 className="title">Please enter your CRM.</h3>
        CRM:
        <input
          className="input_style"
          type="number"
          id="crm"
          onChange={(e) => setCrm(e.target.value)}
        />
        <Button
          className="medic_buttons"
          type="button"
          onClick={registerMedic}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MedicRegister;