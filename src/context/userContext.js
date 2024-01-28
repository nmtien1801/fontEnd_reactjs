import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const userDefault = {
    token: "",
    isLoading: true, // mặc định vào là fetch user - và sẽ quay vì chưa login - 401
    isAuthenticated: false,
    account: {},
  };
  const [user, setUser] = useState(userDefault);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  // lấy api từ BE
  const fetchUser = async () => {
    // dùng Promise.reject(error) khi chưa login sẽ không chạy vào res được
    let res = await getUserAccount();
    if (res && res.EC === 0) {
      let access_token = res.DT.token;
      let groupWithRole = res.DT.groupWithRole;
      let email = res.DT.email;
      let userName = res.DT.userName;

      let data = {
        token: access_token,
        isAuthenticated: true, // khi reset sẽ không văng ra login kh đã login
        account: { groupWithRole, email, userName },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      fetchUser();
    } else {
      setUser({ ...user, isLoading: false }); // copy userDefault sẽ bị mất người dùng
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
