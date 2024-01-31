// import axios from "axios";
import customizeAxios from "../setup/customizeAxios";

const createNewRole = (roleData) => {
  return customizeAxios.post("/api/v1/role/create", [...roleData]);
};

const fetchAllRoles = () => {
  return customizeAxios.get("/api/v1/role/read");
};

const deleteRole = (role) => {
  return customizeAxios.delete("/api/v1/role/delete", {
    data: { id: role.id },
  });
};

// vì react không dùng module như nodejs được nên dùng {} và khi import cũng {}
export { createNewRole, fetchAllRoles, deleteRole };
