import React from "react";
import validator from "validator";

import { postData } from "../../services/Fetch";
import { SaveJWTTokenInLocalStorage } from "../../services/JWT";

import { withRouter } from "react-router-dom";

class SinupPage extends React.Component {
  constructor(p) {
    super(p);

    this.state = {
      name: "",
      email: "",
      password: "",
      zipCode: "",
      country: "",
      gender: "",
      phoneNumber: "",
      address: "",
      errors: {}
    };
  }

  render() {
    const {
      email,
      password,
      name,
      phoneNumber,
      address,
      zipCode,
      country,
      gender,
      errors
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" value={name} onChange={this._handleOnChange} />
            <div style={{ color: 'red' }}>{errors["name"]}</div>
          </div>
          <div className="col-lg-6">
            <label htmlFor="email">Email address</label>
            <input type="text" className="form-control" name="email" value={email} onChange={this._handleOnChange} />
            <div style={{ color: 'red' }}>{errors["email"]}</div>
          </div>
          <div className="col-lg-6">
            <label htmlFor="phoneNumber">Phone number</label>
            <input type="number" className="form-control" name="phoneNumber" value={phoneNumber} onChange={this._handleOnChange} />
            <div style={{ color: 'red' }}>{errors["phoneNumber"]}</div>
          </div>
          <div className="col-lg-6">
            <label htmlFor="address">Address</label>
            <textarea className="form-control" name="address" value={address} onChange={this._handleOnChange} />
            <div style={{ color: 'red' }}>{errors["address"]}</div>
          </div>
          <div className="col-lg-6">
            <label htmlFor="gender">Gender</label>
            <input type="text" className="form-control" name="gender" value={gender} onChange={this._handleOnChange} />
            <div style={{ color: 'red' }}>{errors["gender"]}</div>
          </div>
          <div className="col-lg-6">
            <label htmlFor="zipCode">zipCode</label>
            <input type="text" className="form-control" name="zipCode" value={zipCode} onChange={this._handleOnChange} />
            <div style={{ color: 'red' }}>{errors["zipCode"]}</div>
          </div>
          <div className="col-lg-6">
            <label htmlFor="country">Country</label>
            <input type="text" className="form-control" name="country" value={country} onChange={this._handleOnChange} />
            <div style={{ color: 'red' }}>{errors["country"]}</div>
          </div>
          <div className="col-lg-6">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={this._handleOnChange} />
            <div style={{ color: 'red' }}>{errors["password"]}</div>
          </div>
          <div className="col-lg-12">
            <button className="btn btn-block btn-primary" onClick={this._handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    );
  }

  _handleOnChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  validate = () => {
    const {
      email,
      password,
      name,
      phoneNumber,
      address,
      zipCode,
      country,
      gender
    } = this.state;
    const errors = {};

    if (!validator.isEmail(email)) errors["email"] = "Email is not valid";
    if (password.length < 8)
      errors["password"] = "Password should be at least 8 character long";
    if (validator.isEmpty(name)) errors["name"] = "Name cannot be empty";
    if (validator.isEmpty(phoneNumber))
      errors["phoneNumber"] = "Phone number cannot be empty";
    if (validator.isEmpty(address))
      errors["address"] = "Address cannot be empty";
    if (validator.isEmpty(zipCode))
      errors["zipCode"] = "zip-code cannot be empty";
    if (validator.isEmpty(country))
      errors["country"] = "Country cannot be empty";
    if (validator.isEmpty(gender)) errors["gender"] = "Gender cannot be empty";

    this.setState({ errors });
    return Object.keys(errors).length;
  };

  _handleSubmit = async () => {
    const errorCount = this.validate();
    if (errorCount === 0) {
      const {
        email,
        password,
        name,
        phoneNumber,
        address,
        zipCode,
        country,
        gender
      } = this.state;

      const url = `/user/sign-up`;
      const body = { email, password, name, phoneNumber, address, zipCode, country, gender };
      const result = await postData(url, body);

      if (result.token) {
        SaveJWTTokenInLocalStorage(result.token);
        window.location.href = "/";
      }

      console.log("result", result);
    }
  };
}

export default withRouter(SinupPage);
