import React, { useEffect, useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash"; // cung cấp các method của mảng mà (get .) không có
import "font-awesome/css/font-awesome.min.css";
import { MutatingDots } from "react-loader-spinner";

import NavHeader from "../components/Navigation/nav";
import AppRoutes from "../routes/appRoutes";
import { UserContext } from "../context/userContext";
import { Scrollbars } from "react-custom-scrollbars";

const App = () => {
  const [account, setAccount] = useState({});
  const { user } = useContext(UserContext);
  // tự code - 12.8 jwt
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
  }, [user]);
  //
  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
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
              {/* {account && !_.isEmpty(account) && account.isAuthenticated && <NavHeader />} */}
              <NavHeader />
            </header>
            <div className="App">
              <AppRoutes />
            </div>
          </>
        )}
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Scrollbars>
  );
};

export default App;
