var express = require('express');
var router = express.Router();

const { validate, Joi } = require('express-validation')
const { postRequest, getRequest, putRequest } = require("../utils/http");
const USER_SERVICE_URL = "http://localhost:8001"

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("user service up");
});

const userLoginValidations = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}

router.post('/login', validate(userLoginValidations, {}, {}), async (req, res) => {
  try {
    const url = `${USER_SERVICE_URL}/login`;
    const body = req.body;
    const userServiceResponse = await postRequest(url, body);
    return res.json(userServiceResponse);
  } catch (error) {
    console.log("[POST] /login ->", error);
    return res.json({ status: false, message: "Internal server error occurred" });
  }
});

router.get("/users", async (req, res) => {
  try {
    // call users api here
    const url = `${USER_SERVICE_URL}/users`;
    const userServiceResponse = await getRequest(url);
    // send the resposne back 
    res.json(userServiceResponse);
  } catch (error) {
    console.log("[POST] /login ->", error);
    return res.json({ status: false, message: "Internal server error occurred" });
  }
});


/**
 * 
    
 */

router.put('/toggle-user-login', async (req, res) => {
  try {
    const { user, fDisabled } = req.body;
    console.log("user, fDisabled", user, fDisabled);

    const url = `${USER_SERVICE_URL}/toggle-user-login`;
    const body = { user, fDisabled };
    const response = await putRequest(url, body);

    res.json(response);
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ status: false, message: "Internal server error occurred" })
  }
});

module.exports = router;
