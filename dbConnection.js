const Sequelize = require("sequelize");
const sequelize = new Sequelize("categoryManagement", "root", "tanvi5767", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connect = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
const syn = () => {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("sync");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  sequelize: sequelize,
  connect: connect,
  syn: syn,
};
