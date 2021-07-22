import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import "../Historic/historic_style.css";
import { getUserHistoricThank } from "../../Store/Modules/Historic/thunk";
import { Button } from "antd";
import columns from "../../Components/Historic/columns";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Historic = () => {
  const token = window.localStorage.getItem("authToken");
  const user_id = window.localStorage.getItem("userID");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const HistoricData = useSelector((state) => state.historic);
  const [HistoricDisplay, setHistoricDisplay] = useState([]);
  const history = useHistory();

  const getUserHistoric = async () => {
    dispatch(
      await getUserHistoricThank(
        token,
        user_id,
        setError
      )
    );
    getData()
  };
  


  const getData = async () => {
    const arr = [];
    await HistoricData;

    if (error) {
      alert("Historic not found.");
      console.log(HistoricData);
      setError(false);
      return;
    }
   

    if (HistoricData !== undefined) {
      for (let i = 0; i < HistoricData[0].Historic.length; i++) {
        arr.push({
          historic: HistoricData[0].Historic[i].historic,
          medicines:
          HistoricData[0].Historic[i].medicines,
          surgeries: HistoricData[0].Historic[i].surgeries,
        });
      }
      setHistoricDisplay(arr);
    }
  };



  return (
    <div className="App-header">
      <div className="outer_div">
        <h3 className="Historic_title">Pacient Historic</h3>
        <Button
          onClick={getUserHistoric}
          className="Historic_buttons"
        >
          {" "}
          Searh Historic
        </Button>{" "}
        <Button
          onClick={() => history.push("/posthistoric")}
          className="Historic_buttons"
        >
          {" "}
          Post historic
        </Button>{" "}
      </div>
      <div>
        <Table columns={columns} dataSource={HistoricDisplay} />
      </div>
    </div>
  );
};

export default Historic;
