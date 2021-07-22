import axios from "axios";
import { reportUserData } from "./action";


const url_heroku =  'https://ihealth7.herokuapp.com'

export const postReportThank = (report, setError) => (dispatch) => {
  axios
    .post(
      `${url_heroku}/api/report/`,{
        "email": report.email,
        "type": report.type,
        "data": report.data
      }
    )
    .then((info) => {
      dispatch(reportUserData(info.data));
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
};
