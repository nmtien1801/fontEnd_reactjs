import { Route, Switch } from "react-router-dom";

import Detail from "../view/Detail";
import MyComponent from "../view/myComponent";
import Home from "../view/Home";
import Login from "../components/Login/login";
import Register from "../components/register/register";
import Users from "../components/manageUsers/users";
import Axios from "../view/Axios";
import PrivateRoutes from "./privateRoutes";
import Project from '../view/project'
import Role from "../components/role/role";

const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <Route exact path="/">  
        {/* this is  use redux */}
          {/* <Home /> */}
          Home
        </Route>

        {/* <Route path="/about">
          <MyComponent />
        </Route> */}
        <PrivateRoutes path="/about" component={MyComponent } />
        <PrivateRoutes path="/project" component={Project } />
        <PrivateRoutes path="/roles" component={Role } />

        <Route exact path="/api">
          <Axios />
        </Route>
        <Route path="/api/:id">
          <Detail />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>

        <PrivateRoutes path="/users" component={Users } />
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  );
};
export default AppRoutes;
