import React from "react";

import { Switch, Route, Link } from "react-router-dom";

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';

class Index extends React.Component {
  render() {

    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return <LogInAndSignup />
    }

    return (
      <HomePage isLoggedIn={isLoggedIn} />
    )
  }
}

function LogInAndSignup() {
  return (
    <div>
      <nav>
        <Link to="/user/login">Log in</Link>
        &nbsp; &nbsp; &nbsp;
        <Link to="/user/signup">Sign up</Link>
      </nav>
      <div>
        <Switch>
          <Route path="/user/login" children={<LoginPage />} />
          <Route path="/user/signup" children={<SignupPage />} />
        </Switch>
      </div>
    </div>
  )
}

export default Index;