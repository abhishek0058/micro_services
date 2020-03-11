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
}

const putRequest = async (url, body) => {
  try {
    const response = await axios.put(url, body);
    const result = await response.data;
    return result;
  } catch (e) {
    console.log("postRequest", e);
    throw e;
  }
}

module.exports = {
  getRequest, postRequest, putRequest
}