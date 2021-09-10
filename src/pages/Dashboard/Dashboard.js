import React from 'react';
import Header from '../../components/Header';
import { NavDropdown, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { logout_ } from "../../actions/auth";

const Dashboard = (props) => {

  const dispatch = useDispatch();

  const handleLogout =  (e) => {
      // e.preventDefault();
      dispatch(logout_()).then(response => {
        console.log(response);
          props.history.push("/login");
          window.location.reload();
      }).catch(error => {
          console.log(error);
      });
  }

  // if (isLoggedIn) {
  //     return <Redirect to="/login" />;
  // }

  return(
    <div>
      <Header logoutEvent={handleLogout}/>
      <div className="container">
          <h2>Dashboard</h2>
      </div>
    </div>
  );
}

export default Dashboard;