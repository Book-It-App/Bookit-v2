const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header missing or invalid");
    }

    const token = bearerHeader.split(" ")[1];

    if (!token) {
      throw new Error("Token not found in authorization header");
    }

    const verifyTokens = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyTokens._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    console.log("Authentication successful");
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

module.exports = Authenticate;
