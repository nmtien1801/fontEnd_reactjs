import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

const PrivateRoutes = (props) => {
      // phân quyền - kick ra Login nếu không có quyền
  let history = useHistory();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
    }
    if(session){
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
