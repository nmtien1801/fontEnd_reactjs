// import axios from "axios";
import customizeAxios from "../setup/customizeAxios";

const createNewRole = (roleData) => {
  return customizeAxios.post("/api/v1/role/create", [...roleData]);
};

// vì react không dùng module như nodejs được nên dùng {} và khi import cũng {}
export { createNewRole };
