import React from "react";
import validator from 'validator';

class LoginPage extends React.Component {

  constructor(p) {
    super(p);

    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this._handleOnChange}
              className="form-control"
            />
            <div style={{ color: 'red' }}>{errors["email"]}</div>
          </div>
          <div className="col-xs-12">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this._handleOnChange}
              className="form-control"
            />
            <div style={{ color: 'red' }}>{errors["password"]}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button onClick={this._handleSubmit} className="btn btn-primary">
              Log in
            </button>
            </div>
        </div>
      </div>
    )
  }

  _handleOnChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  validate = () => {
    const errors = {}; 
    const { email, password } = this.state;

    const isEmailValid = validator.isEmail(email);

    if (!isEmailValid) errors["email"] = "Not an valid email";
    if (password.length < 8) errors["password"] = "Password should be at least 8 character long";

    this.setState({ errors });
    return Object.keys(errors).length;
  }

  _handleSubmit = () => {
    const { onSubmit } = this.props;
    const { email, password } = this.state;
    const errorsCount = this.validate();
    if (errorsCount === 0) onSubmit({ email, password });
  }
}

export default LoginPage;