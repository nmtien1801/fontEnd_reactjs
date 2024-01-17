// import axios from "axios";
import customizeAxios from "../setup/customizeAxios";

const registerNewUser = (email, phone, userName, password) => {
  return customizeAxios.post("/api/v1/register", {
    email,
    phone,
    userName,
    password,
  });
};

const LoginUser = (valueLogin, password) => {
  return customizeAxios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const fetchAllUser = (page, limit) => {
  // dùng `` (temlate string) để nối chuỗi nhanh thay +
  return customizeAxios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
  return customizeAxios.delete("/api/v1/user/delete", {
    data: { id: user.id },
    // headers: { Authorization: "***" },
  });
};

const fetchGroup = () => {
  return customizeAxios.get("/api/v1/group/read");
};

const createNewUser = (userData) => {
  return customizeAxios.post("/api/v1/user/create", {
    ...userData,
  });
};

const updateCurrentUser = (userData) => {
  return customizeAxios.put("/api/v1/user/update", {
    ...userData,
  });
};

const getUserAccount = () => {
  return customizeAxios.get("/api/v1/account");
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
  getUserAccount,
};
