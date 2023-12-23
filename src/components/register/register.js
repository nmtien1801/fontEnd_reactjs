import { useEffect } from "react";
import "./register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
  useEffect(() => {
    axios.get("https://reqres.in/api/users?page=2").then((data) => {
      console.log("check data: ", data);
    });
  }, []);
  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-ms-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">This is logo</div>
            <div className="detail">This is detail</div>
          </div>
          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 my-3 ">
            <div className="brand d-sm-none">This is logo</div>
            <div className="form-group">
              <label for="Email">Email</label>
              <input
                className="form-control "
                id="Email"
                type="text"
                placeholder="Email addrest or phone number"
              />
            </div>

            <div className="form-group">
              <label for="SDT">SDT</label>
              <input
                className="form-control "
                id="SDT"
                type="text"
                placeholder="số điện thoại"
              />
            </div>
            <div className="form-group">
              <label for="userName">User Name</label>
              <input
                className="form-control "
                id="userName"
                type="text"
                placeholder="user Name"
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                className="form-control "
                id="password"
                type="text"
                placeholder="password"
              />
            </div>
            <div className="form-group">
              <label for="Re_Password">Re-Enter Password</label>
              <input
                className="form-control "
                id="Re_Password"
                type="text"
                placeholder="Re-Enter Password"
              />
            </div>
            <button className="btn btn-primary">Register</button>

            <div className="btn-createAccount">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
