import React from "react";
import { withRouter } from "react-router-dom";
import Login from "../../components/Login";
import { SaveJWTTokenInLocalStorage } from '../../services/JWT';
import { postData } from "../../services/Fetch";

class LoginPage extends React.Component {

  render() {
    return (
      <div style={{ margin: 20 }}>
        <h4>Admin Login</h4>
        <Login onSubmit={this._handleSubmit} />
      </div>
    )
  }

  _handleSubmit = async ({ email, password }) => {
    const body = { email, password };
    const url = "/admin/login";
    const response = await postData(url, body);
    console.log("response", response);
    if (response.token) {
      SaveJWTTokenInLocalStorage(response.token);
      window.location.href = "/";
    }
  }
}

export default withRouter(LoginPage);