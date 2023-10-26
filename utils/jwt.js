const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

const createAccessToken = (user) => {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);
  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const createRefreshToken = (user) => {
  const expToken = new Date();
  expToken.getMonth(expToken.getMonth() + 1);
  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const decoded = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return console.log(error);
  }
};


module.exports = {
  createAccessToken,
  createRefreshToken,
  decoded,
};
