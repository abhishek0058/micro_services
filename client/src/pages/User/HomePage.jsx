import React from 'react';
import { withRouter } from "react-router-dom";
import { logout } from "../../services/JWT";
import { getData } from "../../services/Fetch";

class HomePage extends React.Component {

  constructor () {
    super ();
    this.state = {
      user: null
    };
  }

  async componentDidMount () {
    const url = "/user/details";
    const result = await getData(url);
    if (result && result.user) {
      this.setState({ user: result.user });
    }
  }

  render () {
    const { user } = this.state;
    const { 
      name, email, phoneNumber, address, zipCode, gender 
    } = user || {};
    return (
      <div className="container">
        <div>
          <button 
            className="btn btn-danger"
            onClick={() => logout("/user/logout")}
          >Logout</button>
        </div>
        <h5>User details</h5>
        <table className="table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Phone number</td>
              <td>{phoneNumber}</td>
            </tr>
            <tr>
              <td>Zip-code</td>
              <td>{zipCode}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{address}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(HomePage);