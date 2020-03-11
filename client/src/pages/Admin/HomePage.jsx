import React from "react";
import { getData, putData } from "../../services/Fetch";
import { logout } from "../../services/JWT";
class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this._fetchUsers();
  }

  _fetchUsers = async () => {
    const url = "/admin/users";
    const response = await getData(url);
    console.log("response -> ", response);
    if (response.users) {
      this.setState({ users: response.users });
    }
  }

  render() {
    const { users = [] } = this.state;
    return (
      <div className="" container>
        <h1>Home page</h1>
        <button 
          className="btn btn-danger" 
          onClick={() => logout("/admin/logout")}
        >Logout</button>
        <table className="table">
          <thead>
            <tr>
              <td>User</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              users.map(({ name, _id, fDisabled }, index) => {
                const buttonClass = fDisabled ? "btn btn-primary" : "btn btn-danger";
                const buttonLabel = fDisabled ? "Enable" : "Disable";

                return (
                  <tr key={name + index}>
                    <td>{name}</td>
                    <td>
                      <button
                        className={buttonClass}
                        onClick={() => this._handleClick(_id, !fDisabled)}
                      >{buttonLabel}</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }

  _handleClick = async (user, fDisabled) => {
    try {
      console.log("User", user, "fDisabled", fDisabled);
      const payload = { user, fDisabled };
      const url = "/admin/toggle-user-login";

      const response = await putData(url, payload);
      console.log("response", response);

      this._fetchUsers();
    } catch (error) {
      console.log("error", error);
    }
  }
}

export default Home;