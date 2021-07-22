import axios from "axios";
import { getUserTemperature } from "./action";
import { postUserTemperature} from "./action";

const url_local = 'http://127.0.0.1:8000'
const url_heroku =  'https://ihealth7.herokuapp.com'

export const getUserTemperatureThank = (temperatureDateStart,temperatureDateEnd, token,user_id, setError) => (dispatch) => {
  axios
    .get(
      `${url_heroku}/api/temperature/${user_id}/?max=${temperatureDateEnd}&min=${temperatureDateStart}`,{
        headers: { Authorization: `Token ${token}` }
      }
    )
    .then((info) => {
      dispatch(getUserTemperature(info.data));
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
};

export const postUserTemperatureThank = (UserData, token, user_id, setError) => (dispatch) => {
  axios
    .post(
      `${url_heroku}/api/temperature/${user_id}/`,{
        "temperature": UserData.temperature,
        }
      ,{headers: { Authorization: `Token ${token}` }}
    )
    .then((info) => {
      dispatch(postUserTemperature(info.data));
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
};