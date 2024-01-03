import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash"; // cung cấp các method của mảng mà (get .) không có

import Nav from "../components/Navigation/nav";
import AppRoutes from "../routes/appRoutes";

function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <header className="App-header">
          {/* {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />} */}
          <Nav />
        </header>
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
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
    </>
  );
}

export default App;
