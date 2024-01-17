import { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoutes = (props) => {
  // phân quyền - kick ra Login nếu không có quyền
  const { user } = useContext(UserContext);

  if (user && user.isAuthenticated == true) {
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
  }
};

export default PrivateRoutes;
