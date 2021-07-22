import { Switch, Route, useHistory, Link } from "react-router-dom";
import Home from "../Pages/Home/home";
import { Button } from "antd";
import "../Routes/routes_style.css";
import { useState } from "react";

import BloodPressure from "../Pages/BloodPressure/bloodpressure";
import Glucose from "../Pages/Glucose/glucose";
import Temperature from "../Pages/Temperature/temperature";
import Register from "../Pages/Register/register";
import Login from "../Pages/Login/login";
import PostGlucose from "../Pages/Glucose/post_glucose";
import PostTemperature from "../Pages/Temperature/post_temperatue";
import PostBloodPressure from "../Pages/BloodPressure/post_bloodpressure";
import MedicRegisterfrom from "../Pages/Medic/medic";
import PacientRegister from "../Pages/Pacient/pacient";
import PostHistoric from "../Pages/Historic/post_historic";
import Historic from "../Pages/Historic/historic";
import MedicView from "../Pages/Medic/medic_view"
import GlucoseMedicview from "../Pages/Glucose/glucose_medic"
import BloodPressureMedicView from "../Pages/BloodPressure/bloodpressure_medic";
import TemperatureMedicView from "../Pages/Temperature/temperature_medic";
import HistoricMedicView from "../Pages/Historic/historic_medic";

const Routes = () => {
  const [logged, setLogged] = useState(true);
  const history = useHistory();
  const medic = window.localStorage.getItem("medic")



  const LogOut = () => {
    window.localStorage.clear();
    if (logged === true) {
      setLogged(false);
    } else {
      setLogged(true);
    }
    history.push("/");
  };

  const logIn = () => {
    if (logged === true) {
      setLogged(false);
    } else {
      setLogged(true);
    }
  };
  return (
    <body className="body-style">
      <header className="home-header">
        <div className="crossLogo" onClick={() => history.push("/")}></div>
        <div className="header-align">
          <div>
            {medic? (<div>
              <Button className="page-buttons" onClick={LogOut}>
                Logout
              </Button>{" "}
              <Button className="page-buttons">
                <Link to="/medicview">Medic View</Link>
              </Button>{" "}
            </div>):(
          <div>
          {logged ? (
            <div>
              <Button className="page-buttons" onClick={logIn}>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="page-buttons">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          ) : (
            <div>
              <Button className="page-buttons" onClick={LogOut}>
                Logout
              </Button>{" "}
              <Button className="page-buttons">
                <Link to="/pressure">Blood Pressure</Link>
              </Button>{" "}
              <Button className="page-buttons">
                <Link to="/glucose">Glucose</Link>
              </Button>{" "}
              <Button className="page-buttons">
                <Link to="/temperature">Temperature</Link>
              </Button>{" "}
              <Button className="page-buttons">
                <Link to="/historic">Historic</Link>
              </Button>{" "}
            </div>
          )}
          </div>)}
        </div>
        <div>

        </div>
        </div>
      </header>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pressure" component={BloodPressure} />
          <Route exact path="/temperature" component={Temperature} />
          <Route exact path="/glucose" component={Glucose} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/postglucose" component={PostGlucose} />
          <Route exact path="/posttemperature" component={PostTemperature} />
          <Route exact path="/postpressure" component={PostBloodPressure} />
          <Route exact path="/medicregister" component={MedicRegisterfrom} />
          <Route exact path="/pacientregister" component={PacientRegister} />
          <Route exact path="/historic" component={Historic} />
          <Route exact path="/posthistoric" component={PostHistoric} />
          <Route exact path="/medicview" component={MedicView} />
          <Route exact path="/glucose-medic" component={GlucoseMedicview} />
          <Route exact path="/pressure-medic" component={BloodPressureMedicView} />
          <Route exact path="/temperature-medic" component={TemperatureMedicView} />
          <Route exact path="/historic-medic" component={HistoricMedicView}/>
        </Switch>
      </div>
    </body>
  );
};

export default Routes;
