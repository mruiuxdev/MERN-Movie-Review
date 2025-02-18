import { Flowbite } from "flowbite-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Flowbite>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Flowbite>
  </React.StrictMode>
);
