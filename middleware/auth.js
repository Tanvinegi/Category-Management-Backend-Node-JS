const jwt = require("jsonwebtoken");
const Services = require("../services/index");

const checkAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      //verify token
      const { uId } = jwt.verify(token, process.env.SECRET);

      //get user from token
      req.user = await Services.userService.getUser(uId);
      console.log(req.user);

      next();
    } catch (error) {
      res.status(401).send({
        msg: "Unauthorized user",
      });
    }
  }
  if (!token) {
    res.status(401).send({
      msg: "Unauthorized user, No access token received.",
    });
  }
};

module.exports = checkAuth;
