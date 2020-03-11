import React from "react";

import { Switch, Route, Link } from "react-router-dom";

import LoginPage from './LoginPage';
import HomePage from './HomePage';

class Index extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    // check if the token is there in the localstorage
    // if yes, then go fetch user info
    // else show the simillar page
  }

  render() {
    const { isLoggedIn } = this.state;

    if (!isLoggedIn) return <LoginPage />;

    return <HomePage />;
  }
}


export default Index;