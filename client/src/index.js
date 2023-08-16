import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"
import { AuthContextProvider } from "./context/AuthContext";
import Store from "./redux/store";
import reportWebVitals from "./reportWebVitals.js";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
