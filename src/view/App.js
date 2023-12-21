import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import logo from "./logo.svg";
import MyComponent from "./myComponent";
import Home from "./Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Detail from "./Detail";
import Nav from "./nav";

import Axios from "./Axios";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav />
          <img src={logo} className="App-logo" alt="logo" />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <MyComponent />
            </Route>
            <Route exact path="/api">
              <Axios />
            </Route>
            <Route path="/api/:id">
              <Detail />
            </Route>
          </Switch>
        </header>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
