import axios from "axios";
import { postMedicData } from "./action";

export const postMedicDataThank = (UserData, user_id, token, setError) => (dispatch) => {
  axios
    .post(
      `https://ihealth7.herokuapp.com/api/register/${user_id}/medic/`,
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
