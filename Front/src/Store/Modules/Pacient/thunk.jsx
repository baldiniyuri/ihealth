import axios from "axios";
import { postPacientData } from "./action";

export const postPacientDataThank = (UserData, user_id, setError) => (dispatch) => {
  axios
    .post(
      `https://ihealth7.herokuapp.com/api/register/${user_id}/pacient/`,{
        "age": UserData.age,
        "gender": UserData.gender,
        "imc": UserData.imc
      }
    )
    .then((info) => {
      console.log(info)
      dispatch(postPacientData(info.data));
    })
    .catch((error) => {
      dispatch(postPacientData(error.data));
      setError(true);
    });
};
