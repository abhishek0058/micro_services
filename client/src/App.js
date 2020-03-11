import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar } from 'react-bootstrap';
import { Switch, Route } from "react-router-dom";

import User from "./pages/User/Index";
import Admin from "./pages/Admin/Index";

import UserHomePage from "./pages/User/HomePage";
import AdminHomePage from "./pages/Admin/HomePage";

import { GetUserByTokenFromServer } from "./services/JWT";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true
    }
  }

  componentDidMount() {
    this._fetchUser();
  }
  
  _fetchUser = async () => {
    const result = await GetUserByTokenFromServer();
    if (result && result.user) {
      this.setState({ user: result.user });
    }
    this.setState({ loading: false });
  }

  render() {
    const { user, loading } = this.state;
    
    console.log("user", user);

    if (loading) {
      return (
        <h1>Loading...</h1>
      )
    }

    if (user) {
      if (user.role === "admin") {
        return (
          <div>
            <AdminHomePage />
          </div>
        )
      }
      else if (user.role === "user") {
        return (
          <div>
            <UserHomePage />
          </div>
        )
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <Navbar>
              <Navbar.Brand href="/user"><u>User</u></Navbar.Brand>
              <Navbar.Brand href="/admin"><u>Admin</u></Navbar.Brand>
            </Navbar>
          </div>
        </div>
        <Switch>
          <Route path={"/user"} children={<User />} />
          <Route path={"/admin"} children={<Admin />} />
        </Switch>
      </div>
    );
  }
}

export default App;