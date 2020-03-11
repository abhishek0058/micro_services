var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { Session } = require('../models');
const { getRequest } = require('../util/http');
const JWT_SECRET = "its_a_secret";

const USER_SERVICE_URL = "http://localhost:8001";


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create-session', async (req, res) => {
  try {
    const { user } = req.body;
    if (!user) return res.json({ status: false, message: "user is required" });
    // check if user-session is not already exist

    const isSessionAlreadyExists = await Session.findOne({ user }).lean();

    if (isSessionAlreadyExists) {
      return res.json({
        status: false,
        message: "User is already logged in from another window"
      });
    }
    // create token here
    const token = await createToken({ user });
    // create session here
    await Session.create({ user, token });
    // send token back
    return res.json({ token });
  }
  catch (e) {
    console.log("error in /create-session", e);
    return res.json({ status: false, message: "Internal error occured" });
  }
});

router.get('/validate/:token', async (req, res, next) => {
  try {
    const { token } = req.params;
    let data = null
    try {
      data = await validateToken(token);
    } catch (error) {
      console.log("error", error);
      await Session.remove({ token });      
    }
    console.log("data", data);
    if (data && data.user) {
      // check session 
      const userId = data.user
      const session = await Session.findOne({ user: userId }).lean();

      if (!session) throw new Error("Session does not exists");

      // make request to user service to get user object
      const response = await getRequest(`${USER_SERVICE_URL}/user/${userId}`);
      console.log("response", response);
      if (response.user) return res.json({ user: response.user });
    }

    return res.json({ status: false, message: "Invalid token" });
  }
  catch (e) {
    console.log(e);
    return res.json({ status: false, message: "Internal error occured" });
  }
});

router.put('/remove-session', async (req, res) => {
  try {
    const { user } = req.body;
    console.log("user", user);
    await Session.remove({ user });
    res.json({ status: true });
  } catch (e) {
    console.log("/remove-session", e);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

router.get('/logout/:token', async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(401).json({ status: 401, message: "Token cannot be null" });
    
    await Session.remove({ token });
    res.json({ status: true });
  } catch (e) {
    console.log("logout", e);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});


module.exports = router;

async function createToken(data) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, { expiresIn: '4h' }, function (err, token) {
      if (err) {
        console.log("error in createToken", err);
        reject(err);
      }
      console.log("-> ", token);
      resolve(token);
    });
  })
}

function validateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}