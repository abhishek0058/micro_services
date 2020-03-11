var express = require('express');
var router = express.Router();

const { postRequest, getRequest, putRequest } = require('../utils/http');

const ADMIN_SERVICE_URL = "http://localhost:8002";
const AUTH_SERVICE_URL = "http://localhost:8003";

router.post('/login', async (req, res) => {
  try {
    // use user-service to log-in
    const url = `${ADMIN_SERVICE_URL}/login`;
    const body = req.body;
    const adminServiceResponse = await postRequest(url, body);

    console.log("adminServiceResponse", adminServiceResponse);

    if (adminServiceResponse.user && adminServiceResponse.user._id) {
      const url = `${AUTH_SERVICE_URL}/create-session`;
      const body = { user: adminServiceResponse.user._id };

      const authServiceResponse = await postRequest(url, body);
      console.log("authServiceResponse", authServiceResponse);

      res.json(authServiceResponse);
    }
    else {
      res.status(500).json(adminServiceResponse);
    }
  } catch (e) {
    console.log("eror", e);
    res.json({ status: false, message: "Internal error occurred" });
  }
});

router.get("/users", ValidateToken, async (req, res) => {
  try {
    // call admin api here
    const url_for_admin_service = `${ADMIN_SERVICE_URL}/users`;
    const adminServiceResponse = await getRequest(url_for_admin_service);
    // send resposne
    res.json(adminServiceResponse);
  } catch (error) {
    console.log("eror", error);
    res.json({ status: false, message: "Internal error occurred" });
  }
});

router.put('/toggle-user-login', ValidateToken, async (req, res) => {
  try {
    const { user, fDisabled } = req.body;

    const url_2 = `${ADMIN_SERVICE_URL}/toggle-user-login`;
    const body = { user, fDisabled };
    const response_2 = await putRequest(url_2, body);

    res.json(response_2);
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ status: false, message: "Internal server error occurred" })
  }
});

router.get("/logout", ValidateToken, async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const url = `${AUTH_SERVICE_URL}/logout/${token}`;
    await getRequest(url);
    res.status(200).json({ status: true });

  } catch (error) {
    console.log("/logout", error);
  }
});

module.exports = router;


async function ValidateToken (req, res, next) {
  try {
    // check token here
    const token = req.headers["x-access-token"];
    
    if (!token) return res.json({ status: false, message: "Token not found" });

    console.log("validating token -> ", token);
    
    const url = `${AUTH_SERVICE_URL}/validate/${token}`;
    const response = await getRequest(url);

    if (!response.user || !response.user.role === "admin")
      return res.status(401).json({ status: false, message: "Token is not valid" });

    next();

  } catch (error) {
    console.log("ValidateToken", ValidateToken);
    return res.json({ status: false, message: "Internal server error occurred" });
  }
}