import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { glucoseReducer, postglucoseReducer } from "./Modules/Glucose/reducer";
import userDataReducer from "./Modules/Register/reducer";
import {
  BloodPressureReducer,
  postBloodPressureReducer,
} from "./Modules/BloodPressure/reducer";
import {
  temperatureReducer,
  postTemperatureReducer,
} from "./Modules/Temperature/reducer";
import {
  HistoricReducer,
  postHistoricReducer,
} from "./Modules/Historic/reducer";
import PacientReducer from "./Modules/Pacient/reducer";
import MedicReducer from "./Modules/Medic/reducer";
import ReportDataReducer from "./Modules/Report/reducer";

const reducers = combineReducers({
  glucose: glucoseReducer,
  postglucose: postglucoseReducer,
  postUser: userDataReducer,
  bloodpressure: BloodPressureReducer,
  postbloodpressure: postBloodPressureReducer,
  temperature: temperatureReducer,
  posttemperature: postTemperatureReducer,
  postPacient: PacientReducer,
  postMedic: MedicReducer,
  postUserHistoric: postHistoricReducer,
  historic: HistoricReducer,
  reportUserData: ReportDataReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
