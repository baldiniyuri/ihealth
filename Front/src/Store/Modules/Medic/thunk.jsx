import axios from "axios";
import { postMedicData } from "./action";

// const url_local = 'http://127.0.0.1:8000'
const url_heroku =  'https://ihealth7.herokuapp.com'

export const postMedicDataThank = (UserData, user_id, token, setError) => (dispatch) => {
  axios
    .post(
      `${url_heroku}/api/register/${user_id}/medic/`,
      {
        "crm": UserData.crm,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
    .then((info) => {
      dispatch(postMedicData(info.data));
    })
    .catch((error) => {
      dispatch(postMedicData(error.data));
      setError(true);
    });
};
