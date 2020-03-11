import React from "react";
import { withRouter } from "react-router-dom";
import Login from "../../components/Login";

import { postData } from "../../services/Fetch";
import { SaveJWTTokenInLocalStorage } from "../../services/JWT";

class LoginPage extends React.Component {

  render() {
    return (
      <div>
        <Login onSubmit={this._handleSubmit} />
      </div>
    )
  }

  _handleSubmit = async ({ email, password }) => {
    const body = { email, password };
    const url = "/user/login";
    const response = await postData(url, body);
    console.log("response", response);
    
    if (response.token) {
      SaveJWTTokenInLocalStorage(response.token);
      window.location.href = "/";
    }
  }
}

export default withRouter(LoginPage);