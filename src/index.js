import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./css/images/icons/favicon.ico";
import "./css/vendor/bootstrap/css/bootstrap.min.css";
import "./css/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./css/vendor/animate/animate.css";
import "./css/vendor/css-hamburgers/hamburgers.min.css";
import "./css/vendor/animsition/css/animsition.min.css";
import "./css/vendor/select2/select2.min.css";
import "./css/vendor/daterangepicker/daterangepicker.css";
import "./css/css/util.css";
import "./css/css/main.css";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
