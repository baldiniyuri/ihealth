import axios from "axios";
import { postUserLogin } from "./action";

const url_local = 'http://127.0.0.1:8000'
const url_heroku =  'https://ihealth7.herokuapp.com'

export const UserLoginThank = (UserData, setError) => (dispatch) => {
  axios
    .post(
      `${url_heroku}/api/login/`,{
        "username": UserData.username,
        "password": UserData.password
      }
    )
    .then((info) => {
      window.localStorage.setItem('authToken',info.data.token)
      window.localStorage.setItem('userID', info.data.user_id)
      window.localStorage.setItem('medic', info.data.is_superuser)
      window.localStorage.setItem('userEmail', info.data.email)
      dispatch(postUserLogin(info.data));
    })
    .catch((error) => {
      console.log(error);
      setError(true);
      dispatch(postUserLogin(error));
    });
};
