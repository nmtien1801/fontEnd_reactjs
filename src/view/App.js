import React, { useEffect, useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash"; // cung cấp các method của mảng mà (get .) không có
import "font-awesome/css/font-awesome.min.css";
import { MutatingDots } from "react-loader-spinner";

import Nav from "../components/Navigation/nav";
import AppRoutes from "../routes/appRoutes";
import { UserContext } from "../context/userContext";

function App() {
  const [account, setAccount] = useState({});
  const { user } = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        {user && user.isLoading ? (
          <div className="loading-container">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#1877f2"
              secondaryColor="#1877f2"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <div>Loading data...</div>
          </div>
        ) : (
          <>
            <header className="App-header">
              {/* {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />} */}
              <Nav />
            </header>
            <div className="App">
              <AppRoutes />
            </div>
          </>
        )}
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
