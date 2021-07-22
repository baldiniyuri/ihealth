import axios from "axios";
import { reportUserData } from "./action";

export const postReportThank = (report, setError) => (dispatch) => {
  axios
    .post(
      `https://ihealth7.herokuapp.com/api/report/`,{
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
