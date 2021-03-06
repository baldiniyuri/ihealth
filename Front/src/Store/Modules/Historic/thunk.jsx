import axios from "axios";
import { getUserHistoric, postUserHistoric } from "./action";


const url_heroku =  'https://ihealth7.herokuapp.com'

export const getUserHistoricThank = async ( token, user_id, setError) => (dispatch) => {
  axios
    .get(
      `${url_heroku}/api/historic/${user_id}/`,{
        headers: { Authorization: `Token ${token}` }
      }
    )
    .then((info) => {
      console.log(info)
      dispatch(getUserHistoric(info.data));
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
};


export const postUserHistoricThank = (UserData, token,user_id, setError) => (dispatch) => {

  axios
    .post(
      `${url_heroku}/api/historic/${user_id}/`,{
        "historic": UserData.historic,
        "medicines": UserData.medicines,
        "surgeries": UserData.surgeries}
      ,{headers: { Authorization: `Token ${token}` }}
    )
    .then((info) => {
      console.log("info do post", info)
      dispatch(postUserHistoric(info.data));
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
};
  