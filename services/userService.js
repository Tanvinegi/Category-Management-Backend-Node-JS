const Models = require("../models");

exports.findUser = (data) => {
  return Models.userModel.findOne({
    where: { email: data.email },
  });
};

exports.addUser = (data) => {
  return Models.userModel.create(data);
};

exports.getUser = (uId) => {
  return Models.userModel.findByPk(uId, {
    where: { exclude: "password" },
  });
};
