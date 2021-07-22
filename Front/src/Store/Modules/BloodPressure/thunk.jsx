import axios from "axios";
import { getUserBloodPressure, postUserPressure } from "./action";


export const getUserBloodPressureThank = async (BloodPressureDateStart, BloodPressureDateEnd, token, user_id, setError) => (dispatch) => {
  axios
    .get(
      `https://ihealth7.herokuapp.com/api/pressure/${user_id}/?max=${BloodPressureDateEnd}&min=${BloodPressureDateStart}`,{
        headers: { Authorization: `Token ${token}` }
      }
    )
    .then((info) => {
      console.log(info)
      dispatch(getUserBloodPressure(info.data));
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
};




export const postUserPressureThank = (UserData, token,user_id, setError) => (dispatch) => {

  axios
    .post(
      `https://ihealth7.herokuapp.com/api/pressure/${user_id}/`,{
        "systolic_level": UserData.systolic_level,
        "diastolic_level": UserData.diastolic_level,
        "bpm": UserData.bpm}
      ,{headers: { Authorization: `Token ${token}` }}
    )
    .then((info) => {
      console.log("info do post", info)
      dispatch(postUserPressure(info.data));
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
};
  