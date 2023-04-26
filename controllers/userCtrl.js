const Services = require("../services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Helper = require("../Helper/validation.js");

require("dotenv").config();

module.exports = {
  addUser: async (datas) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    let data = await Helper.verifyjoiSchema(datas, schema);
    if (!data) {
      return { status: "failed", message: "Invalid strings types" };
    } else {
      let userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const user = await Services.userService.findUser(userData);
      if (user) {
        return "already exists";
      } else {
        var hashPwd = data.password;
        const salt = await bcrypt.genSalt(12);
        hashPassword = await bcrypt.hash(hashPwd, salt);
        let newData = {
          name: data.name,
          email: data.email,
          password: hashPassword,
          role: data.role,
        };

        let users = await Services.userService.addUser(newData);
        const userfind = await Services.userService.findUser(newData);
        const token = jwt.sign({ uId: userfind.uId }, process.env.SECRET, {
          expiresIn: "4d",
        });
        return {
          status: "success",
          msg: "registered",
          user: users,
          token: token,
          //info: info,
        };
      }
    }
  },

  login: async (data) => {
    let userdata = {
      email: data.email,
      password: data.password,
    };
    const find = await Services.userService.findUser(userdata);
    if (find) {
      const isMatch = await bcrypt.compare(data.password, find.password);
      if (isMatch) {
        const token = jwt.sign({ uId: find.uId }, process.env.SECRET, {
          expiresIn: "4d",
        });
        return {
          status: "success",
          msg: "Login successful",
          token: token,
        };
      }
    } else {
      return "User not found.";
    }
  },
};
