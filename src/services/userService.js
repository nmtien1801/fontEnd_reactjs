import axios from "axios";

const registerNewUser = (email, phone, userName, password) => {
  return axios.post("http://localhost:8080/api/v1/register", {
    email,
    phone,
    userName,
    password,
  });
};

const LoginUser = (valueLogin, password) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    valueLogin,
    password,
  });
};
// vì react không dùng module như nodejs được nên dùng {} và khi import cũng {}
export { registerNewUser, LoginUser };
