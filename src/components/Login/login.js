import "./login.scss";
import { useHistory } from "react-router-dom";

const Login = () => {
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
              className="form-control"
              type="text"
              placeholder="Email addrest or phone number"
            />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
            />
            <button className="btn btn-primary">Login</button>
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
