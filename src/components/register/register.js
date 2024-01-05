import { useEffect, useState } from "react";
import "./register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaulValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaulValidInput);

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
  useEffect(() => {
    // axios.get("http://localhost:8080/api/v1/test-api").then((data) => {
    //   console.log("check data: ", data);
    // });
  }, []);

  const isValidInput = () => {
    setObjCheckInput(defaulValidInput);
    if (!email) {
      toast.error("email is require");
      setObjCheckInput({ ...defaulValidInput, isValidEmail: false });
      return false;
    }
    let regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      setObjCheckInput({ ...defaulValidInput, isValidEmail: false });
      toast.error("please enter a valid email address");
      return false;
    }
    if (!phone) {
      toast.error("phone is require");
      setObjCheckInput({ ...defaulValidInput, isValidPhone: false });
      return false;
    }
    if (!userName) {
      toast.error("userName is require");
      return false;
    }
    if (!password) {
      toast.error("password is require");
      setObjCheckInput({ ...defaulValidInput, isValidPassword: false });
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("your password is not the same");
      setObjCheckInput({ ...defaulValidInput, isValidConfirmPassword: false });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidInput();

    if (check === true) {
      let response = await registerNewUser(email, phone, userName, password);
      let serviceData = response.data;
      // +: convert number -> String
      if (+serviceData.EC === 0) {
        toast.success(serviceData.EM);
        history.push("/login");
      } else {
        toast.error(serviceData.EM);
        if (serviceData.DT === "email") { // bôi đỏ lại input bị sai
          setObjCheckInput({ ...defaulValidInput, isValidEmail: false });
        }
      }
    }
  };

  // press ENTER: react on keypress
  const handlePressEnter = (event) => {
    if (event.key === "Enter" && event.charCode === 13) {
      handleRegister();
    }
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
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
                className={
                  objCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="Re_Password"
                type="password"
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onKeyPress={(event) => {
                  handlePressEnter(event);
                }}
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
