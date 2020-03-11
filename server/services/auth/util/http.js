const axios = require("axios");

const getRequest = async (url) => {
  try {
    const response = await axios.get(url);
    const result = await response.data;
    return result;
  } catch (e) {
    console.log("getRequest", e);
    throw e;

  }
}

const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body);
    const result = await response.data;
    return result;
  } catch (e) {
    console.log("postRequest", e);
    throw e;
  }
 
  // return new Promise((resolve, reject) => {
  //   axios.post(`${SERVICE_URL}/login`, req.body)
  //     .then(function (response) {
  //       // create token here
  //       resolve(response.data)
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       reject(error);
  //     });
  // })
}


module.exports = {
  getRequest, postRequest
}