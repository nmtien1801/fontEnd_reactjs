import { useEffect, useState } from "react";
import "./register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
  useEffect(() => {
    // axios.get("http://localhost:8080/api/test-api").then((data) => {
    //   console.log("check data: ", data);
    // });
  }, []);

  const isValidInput = () => {
    if (!email) {
      toast.error("email is require");
      return false;
    }
    if (!phone) {
      toast.error("phone is require");
      return false;
    }
    if (!userName) {
      toast.error("userName is require");
      return false;
    }
    if (!password) {
      toast.error("password is require");
      return false;
    }
    if (password != confirmPassword) {
      toast.error("your password is not the same");
      return false;
    }
    let regex = /\S+@\S+\.\S+/;
    if(!regex.test(email)){
      toast.error("please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    let check = isValidInput();
    let userData = { email, phone, userName, password };
    console.log("check user data : ", userData);
  };
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label for="SDT">SDT</label>
              <input
                className="form-control "
                id="SDT"
                type="number"
                placeholder="số điện thoại"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="userName">User Name</label>
              <input
                className="form-control "
                id="userName"
                type="text"
                placeholder="user Name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                className="form-control "
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="Re_Password">Re-Enter Password</label>
              <input
                className="form-control "
                id="Re_Password"
                type="password"
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>

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
