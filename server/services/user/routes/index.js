const { validate, Joi } = require('express-validation')

var express = require('express');
var router = express.Router();

const { User } = require('../models');

const { createHash, checkpassword } = require('../util/hashing');

const userFields = 'name email phoneNumber gender zipCode country address role';

const { putRequest } = require("../util/http");

const AUTH_SERVICE_URL = "http://localhost:8003";

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Hello");
});

//////////////////////////////////////////////


const userValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().required()
  })
}

router.post('/sign-up', validate(userValidation, {}, {}), async (req, res) => {
  try {
    const { name, email, phoneNumber, gender, zipCode, country, address, password: rawPassword } = req.body;

    const password = await createHash(rawPassword);

    const user = { name, email, phoneNumber, gender, zipCode, country, address, password };
    const userId = await User.create(user);


    res.json({ status: true, message: "User created successfully", user: userId });
  } catch (e) {
    console.log("/user", e);
    res.json({ status: false, message: "Internal server error occurred" });
  }
});

//////////////////////////////////////////////

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const user = await User.findById(id, userFields).lean();

    if (!user) return res.json({ status: false, message: "resource not found" });

    return res.json({ user });

  } catch (e) {
    console.log(e);
    res.json({ status: false, message: "Internal server error occures" });
  }
});

//////////////////////////////////////////////

const userLoginValidations = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}

router.post('/login', validate(userLoginValidations, {}, {}), async (req, res) => {
  const { email, password: rawPassword } = req.body;

  // check if user exists for this email
  const user = await User.findOne({ email }).lean();

  if (user) {

    // check if user is disabled
    if (user.fDisabled) {
      return res.json({ status: false, message: "You account has been disabled" });
    }
    // compare the passwords here
    const passwordHash = user.password;

    const isPasswordValid = await checkpassword(rawPassword, passwordHash);

    if (isPasswordValid) {
      delete user.fDisabled;
      delete user.password;
      return res.json({ user });
    }
    else {
      return res.json({ status: false, message: "Password is incorrect" });
    }
  }
  return res.json({ status: false, message: "User not found for this email" });
});

/////////////////////////////////////////

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: "user" }, '-password').lean();
    return res.json({ users });
  } catch (error) {
    console.log("e", e);
    return res.json({ status: false, message: "Internal error occurred" });
  }
});

/////////////////////////////////////////////

router.put('/toggle-user-login', async (req, res) => {
  try {
    const { user, fDisabled } = req.body;
    console.log("user, fDisabled", user, fDisabled);
    await User.update({ _id: user }, { $set: { fDisabled } });

    if (fDisabled) {
      const url = `${AUTH_SERVICE_URL}/remove-session`;
      const body = { user };
      await putRequest(url, body);
    }

    return res.json({ status: true });
  } catch (e) {
    console.log("e", e);
    return res.json({ status: false, message: "Internal error occurred" });
  }
});

/////////////////////////////////////////////


module.exports = router;



