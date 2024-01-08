import { useState, useEffect } from "react";
import "./login.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from "../../services/userService";

const Login = () => {
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      history.push("/");
    }
  }, []);

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
    let res = await LoginUser(valueLogin, password);
    if (res &&  +res.EC === 0) {
      toast.success(res.EM);
      //success
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(data)); // thay cho REDUX: session storage
      history.push("/users");
      window.location.reload(); // fix lỗi thẻ NAV không hiện(session storage)
    }
    if (res && +res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  // press ENTER: react on keypress
  const handlePressEnter = (event) => {
    if (event.key === "Enter" && event.charCode === 13) {
      handleLogin();
    }
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
              onKeyPress={(event) => {
                handlePressEnter(event);
              }}
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
