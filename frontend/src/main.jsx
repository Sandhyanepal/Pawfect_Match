import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// r
// import reportWebVitals from "./reportWebVitals";
import MyRoutes from "./MyRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <MyRoutes />
  </React.StrictMode>
);

// reportWebVitals();