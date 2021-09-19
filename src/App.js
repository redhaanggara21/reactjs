import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";

import './App.css';
import { clearMessage } from "./actions/message";
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Preferences from './pages/Preferences/Preferences';
import Barang from './pages/Barang/Barang';
import User from './pages/User/User';
import NotFound from "./pages/NotFound/NotFound";

// import TodoContext from "./pages/TodoContext/TodoContext";
// import typeComponent from "./pages/typeComponent/typeComponent";

// import useToken from './useToken';
import { history } from "./helpers/history";
// import configureStore from "./helpers/configureStore";

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';


const App = () => {

  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
      history.listen((location, action) => {
        console.log(location);
        console.log(action);
          // clear alert on location change
          // dispatch(alertActions.clear());
      });
  }, []);

  const [token, setToken] = useState(false);

  const getToken = () => {
      const user = sessionStorage.getItem('user');
      const userToken = JSON.parse(user);
      return !userToken?.access_token ? false : true;
  }

  useEffect(() => {
    document.title = process.env.REACT_APP_NAME_SITE;
    setToken(getToken);
    console.log(token);
    // console.log();
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch,token]);

  return (

    <BrowserRouter history={history}>
      <Switch>
        
         <Route exact path={["/", "/login"]} component={Login} />
         {/* <PublicRoute  path={["/", "/login"]} component={Login} /> */}
         <PrivateRoute path='/barang' component={Barang} />
         <PrivateRoute path='/Preferences' component={Preferences} />
         <PrivateRoute path='/user' component={User} />
         <Route path="*">
            <NotFound />
          </Route>
         {/* <Route exact path='/barang' component={Barang} /> */}

          {/* <PublicRoute restricted={false} component={Login} path="/" exact />
          <PublicRoute restricted={false} component={Login} path="/login" exact /> */}

          {/* <PublicRoute restricted={true} component={SignIn} path="/signin" exact /> */}

          {/* <PrivateRoute component={typeComponent} path="/typeComponent" exact />
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <PrivateRoute component={Barang} path="/barang" exact />
          <PrivateRoute component={User} path="/user" exact />
          <PrivateRoute component={Preferences} path="/preferences" exact />
          <PrivateRoute component={TodoContext} path="/todo" exact /> */}

        {/* <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/barang" component={Barang} />
        <Route exact path="/preferences" component={Preferences} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;