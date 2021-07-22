import axios from "axios";
import { getUserGlucose } from "./action";
import { postUserGlucose } from "./action";

export const getUserGlucoseThank =
  (glucoseDateStart, glucoseDateEnd, token, user_id, setError) => (dispatch) => {
    axios
      .get(`https://ihealth7.herokuapp.com/api/glucose/${user_id}/?max=${glucoseDateEnd}&min=${glucoseDateStart}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((info) => {
        dispatch(getUserGlucose(info.data));
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

export const postUserGlucoseThank =
  (UserData, token, user_id, setError) => (dispatch) => {
    axios
      .post(
        `https://ihealth7.herokuapp.com/api/glucose/${user_id}/`,
        {
          glucose: UserData.glucose,
        },
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((info) => {
        dispatch(postUserGlucose(info.data));
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };
