import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CustomersContainer from "./CustomersContainer";
 
var destination = document.querySelector("#container");
 
ReactDOM.render(
    <div>
        <CustomersContainer/>
    </div>,
    destination
);