import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postUserHistoricThank } from "../../Store/Modules/Historic/thunk";
import { Button } from "antd";
import "../Historic/historic_style.css";

const PostHistoric = () => {
  const token = window.localStorage.getItem("authToken");
  const user_id = window.localStorage.getItem("userID");
  const [historic, setHistoric] = useState("");
  const [medicines, setMedicines] = useState("");
  const [surgeries, setSurgeries] = useState(0);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const history = useHistory();

  const UserData = {
    historic: historic,
    medicines: medicines,
    surgeries: surgeries,
  };

  const registerHistoric = () => {
    setTimeout(() => {
      postUserData();
    }, 3000);
  };

  const postUserData = async () => {
    dispatch(postUserHistoricThank(await UserData, token, user_id, setError));

    history.push("/historic");
  };

  return (
    <div className="outer_div_historic_post">
        <div>
        <h3 className="title_historic_post">If you have some Illness, you can register here.</h3>
        </div>
        <form className="form-align-historic-post">
        <input
          className="input_style"
          type="text"
          id="historic"
          placeholder="Historic"
          onChange={(e) => setHistoric(e.target.value)}
        />
        <input
          className="input_style"
          type="text"
          id="medicines"
          placeholder="Medicines"
          onChange={(e) => setMedicines(e.target.value)}
        />
        <br/>
        <input
          className="input_style"
          type="text"
          id="surgeries"
          placeholder="Surgeries"
          onChange={(e) => setSurgeries(e.target.value)}
        />
        </form>
        <Button
          className="register_buttons"
          type="button"
          onClick={registerHistoric}
        >
          Submit
        </Button>
    
    </div>
  );
};

export default PostHistoric;