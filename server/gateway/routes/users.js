var express = require('express');
var router = express.Router();

const { postRequest, getRequest, putRequest } = require('../utils/http');

const USER_SERVICE_URL = "http://localhost:8001";
const AUTH_SERVICE_URL = "http://localhost:8003";

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async (req, res) => {
  try {
    // use user-service to log-in
    const url = `${USER_SERVICE_URL}/login`;
    const body = req.body;
    const userServiceResponse = await postRequest(url, body);
    console.log("userServiceResponse", userServiceResponse);
    if (userServiceResponse.user && userServiceResponse.user._id) {
      const url = `${AUTH_SERVICE_URL}/create-session`;
      const body = { user: userServiceResponse.user._id };

      const authServiceResponse = await postRequest(url, body);
      console.log("authServiceResponse", authServiceResponse);

      res.json(authServiceResponse);
    }
    else {
      res.json(userServiceResponse);
    }

  } catch (e) {
    console.log("eror", e);
    res.json({ status: false, message: "Internal error occurred" });
  }
});

router.post('/sign-up', async (req, res) => {
  try {
    // use user-service to log-in
    const url = `${USER_SERVICE_URL}/sign-up`;
    const body = req.body;
    const userServiceResponse = await postRequest(url, body);
    console.log("userServiceResponse", userServiceResponse);
    if (userServiceResponse.status) {
      const url = `${AUTH_SERVICE_URL}/create-session`;
      const body = { user: userServiceResponse.user._id };

      const authServiceResponse = await postRequest(url, body);
      console.log("authServiceResponse", authServiceResponse);

      return res.json(authServiceResponse);
    }

    return res.json(userServiceResponse);

  } catch (e) {
    console.log("eror", e);
    res.status(500).json({ status: false, message: "Internal error occurred" });
  }
});

router.get("/details", async (req, res) => {
  try {
    
    const token = req.headers["x-access-token"];
    if (!token) return res.status(500).json({ status: false, message: "Invalid token" });

    const url = `${AUTH_SERVICE_URL}/validate/${token}`;
    const response = await getRequest(url);

    if (response.user) {
      return res.json(response);
    }

    res.status(500).json({ message: "Invalid token", status: false });
  } catch (error) {
    console.log("/user/details", error);
    res.status(500).json({ status: false, message: "Internal error occurred" });
  }
});

router.get('/logout', ValidateToken, async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const url = `${AUTH_SERVICE_URL}/logout/${token}`;
    await getRequest(url);
    res.status(200).json({ status: true });
  }
  catch (e) {
    console.log("/logout", e);
    res.status(500).json({ status: false, message: "Internal error occurred" });
  }
});

module.exports = router;


async function ValidateToken (req, res, next) {
  try {
    // check token here
    const token = req.headers["x-access-token"];
    console.log("validating token -> ", token);
    
    const url = `${AUTH_SERVICE_URL}/validate/${token}`;
    const response = await getRequest(url);

    if (!response.user || !response.user.role === "user")
      return res.status(401).json({ status: false, message: "Token is not valid" });

    next();

  } catch (error) {
    console.log("ValidateToken", ValidateToken);
    return res.json({ status: false, message: "Internal server error occurred" });
  }
}