import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import MyComponent from "./myComponent";
import Home from "./Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Detail from "./Detail";
import Nav from "../components/Navigation/nav";

import Axios from "./Axios";
import Login from "../components/Login/login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
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
            <Route path="*">404 not found</Route>
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
