const bcrypt = require('bcrypt');
const saltRounds = 10;


const createHash = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
  catch (e) {
    console.log("createHash", e);
    throw e;
  }
}

const checkpassword = async (rawPassword, hash) => {
  try {
    const isPasswordMatched = await bcrypt.compare(rawPassword, hash);
    return isPasswordMatched;
  } catch (e) {
    console.log("checkpassword", e);
    throw e;
  }
}

module.exports = {
  createHash, checkpassword
}