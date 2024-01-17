import { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);
  // phân quyền - kick ra Login nếu không có quyền
  let history = useHistory();
  useEffect(() => {
    console.log(">>>>check user context: ", user);
    
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
    }
    if (session) {
      //check role
    }
  }, []);
  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
};

export default PrivateRoutes;
