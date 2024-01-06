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

const fetchAllUser = (page, limit) => {
  // dùng `` (temlate string) để nối chuỗi nhanh thay +
  return axios.get(
    `http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`
  );
};

const deleteUser = (user) => {
  return axios.delete("http://localhost:8080/api/v1/user/delete", {
    data: { id: user.id },
    // headers: { Authorization: "***" },
  });
};

const fetchGroup = () => {
  return axios.get("http://localhost:8080/api/v1/group/read");
};

const createNewUser = (userData) => {
  return axios.post("http://localhost:8080/api/v1/user/create", {
    ...userData,
  });
};

const updateCurrentUser = (userData) => {
  return axios.put("http://localhost:8080/api/v1/user/update", {
    ...userData,
  });
};
// vì react không dùng module như nodejs được nên dùng {} và khi import cũng {}
export {
  registerNewUser,
  LoginUser,
  fetchAllUser,
  deleteUser,
  fetchGroup,
  createNewUser,
  updateCurrentUser,
};
