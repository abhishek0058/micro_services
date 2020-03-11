var express = require('express');
var router = express.Router();

const AUTH_SERVICE_URL = "http://localhost:8003"

const { getRequest } = require("../utils/http");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/validate-token', async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log("token", token);
    const url = `${AUTH_SERVICE_URL}/validate/${token}`;
    const response = await getRequest(url);

    if (response.user) return res.json({ user: response.user });

    return res.json({ status: false, message: "Invalid token" });

  } catch (e) {
    console.log("/validate-token", e);
    next(new Error("Invalid request"));
  }
});

module.exports = router;
