/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import App from "../components/App";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Route path="/" component={App} />
    </Router>,
    document.body.appendChild(document.createElement('div'))
  )
})