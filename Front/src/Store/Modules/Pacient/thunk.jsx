import axios from "axios";
import { postPacientData } from "./action";

// const url_local = 'http://127.0.0.1:8000'
const url_heroku =  'https://ihealth7.herokuapp.com'

export const postPacientDataThank = (UserData, user_id, setError) => (dispatch) => {
  axios
    .post(
      `${url_heroku}/api/register/${user_id}/pacient/`,{
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
