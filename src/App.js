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
import Home from "./pages/Home/Home";

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
      const user = localStorage.getItem('user');
      return user ? true : false;
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
        <PublicRoute restricted={false} component={Home} path="/" exact />
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <PrivateRoute component={Barang} path="/barang" exact />
        <PrivateRoute component={Preferences} path="/preferences" exact />
        <PrivateRoute component={User} path="/user" exact />
        <Route path="*">
            <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;