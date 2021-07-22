import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import "../Historic/historic_style.css";
import { getUserHistoricThank } from "../../Store/Modules/Historic/thunk";
import { Button } from "antd";
import columns from "../../Components/Historic/columns";
import { useSelector } from "react-redux";

const HistoricMedicView = () => {
  const token = window.localStorage.getItem("authToken");
  const [user_id, setUserId] = useState(0);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [pacientName, setPacientName] = useState("");
  const HistoricData = useSelector((state) => state.historic);
  const [HistoricDisplay, setHistoricDisplay] = useState([]);

  const getUserHistoric = async () => {
    dispatch(await getUserHistoricThank(token, user_id, setError));
    getData();
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
      setPacientName(HistoricData[0].username);
      for (let i = 0; i < HistoricData[0].Historic.length; i++) {
        arr.push({
          historic: HistoricData[0].Historic[i].historic,
          medicines: HistoricData[0].Historic[i].medicines,
          surgeries: HistoricData[0].Historic[i].surgeries,
        });
      }
      setHistoricDisplay(arr);
    }
  };

  return (
    <div className="App-header">
      <div className="outer_div-historic">
        <div className="Historic_title">
          {pacientName ? (
            <h3 className="Historic_title">Historic of pacient {pacientName}</h3>
          ) : (
            <h3 className="Historic_title">Search for a pacient historic by using his id</h3>
          )}
        </div>
        <div className="container-historic">
          <div className="item-historic">
            <Button onClick={getUserHistoric} className="Historic_buttons">
              {" "}
              Searh Historic
            </Button>{" "}
            <input
              className="input_style"
              type="number"
              id="pacient-id"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={HistoricDisplay} />
      </div>
    </div>
  );
};

export default HistoricMedicView;
