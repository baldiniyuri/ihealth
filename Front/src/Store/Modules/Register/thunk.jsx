import axios from "axios";
import { postUserData } from "./action";

const url_local = 'http://127.0.0.1:8000'
const url_heroku =  'https://ihealth7.herokuapp.com'

export const postUserDataThank = (UserData, setError) => (dispatch) => {
  axios
    .post(
      `${url_heroku}/api/register/`,{
        "username": UserData.username,
        "first_name": UserData.first_name,
        "last_name": UserData.last_name,
        "password": UserData.password,
        "email": UserData.email,
        "is_staff": UserData.is_staff,
        "is_superuser": UserData.is_superuser
      }
    )
    .then((info) => {
      dispatch(postUserData(info.data));
      window.localStorage.setItem('userID', info.data.data.id);
      window.localStorage.setItem('authToken', info.data.token)
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
};
