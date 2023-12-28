import { useState } from "react";
import "./login.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from "../../services/userService";

const Login = () => {
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objvalidInput, setObjvalidInput] = useState(defaultObjValidInput);

  const handleLogin = async () => {
    setObjvalidInput(defaultObjValidInput);

    if (!valueLogin) {
      toast.error("please enter your email or phone number");
      setObjvalidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      return;
    }
    if (!password) {
      toast.error("please enter your password");
      setObjvalidInput({ ...defaultObjValidInput, isValidPassword: false });
      return;
    }
    let response = await LoginUser(valueLogin, password);
    if (response && response.data && +response.data.EC === 0) {
      toast.success(response.data.EM);
      history.push("/users");
    }
    if (response && response.data && +response.data.EC !== 0) {
      toast.error(response.data.EM);
    }
  };

  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/register");
  };
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-ms-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">This is logo</div>
            <div className="detail">This is detail</div>
          </div>
          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 my-3 ">
            <div className="brand d-sm-none">This is logo</div>
            <input
              className={
                objvalidInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              type="text"
              placeholder="Email addrest or phone number"
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
            />
            <input
              className={
                objvalidInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
            <span className="forgot-password">
              <a href="#" className="">
                forgot your password ?
              </a>
            </span>
            <div className="btn-createAccount">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create New Acount
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
