import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({
    token: "",
    isAuthenticated: false,
    account: {},
  });

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  // lấy api từ BE
  const fetchUser = async () => {
    let res = await getUserAccount();
    if (res && res.EC == 0) {
      let access_token = res.DT.token;
      let groupWithRole = res.DT.groupWithRole;
      let email = res.DT.email;
      let userName = res.DT.userName;

      let data = {
        token: access_token,
        isAuthenticated: true, // khi reset sẽ không văng ra login kh đã login
        account: { groupWithRole, email, userName },
      };
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
