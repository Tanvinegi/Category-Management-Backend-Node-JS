const Models = require("../models");
const { Op } = require("sequelize");

//------ add sub category----------
exports.findSubCategory = (data) => {
  return Models.subCategoryModel.findOne({
    where: {
      name: data.name,
    },
  });
};

exports.addCategory = (data) => {
  return Models.subCategoryModel.create(data);
};

//--------update sub category -------
exports.update = (newdata) => {
  return Models.subCategoryModel.update(
    {
      name: newdata.name,
      image: newdata.image,
    },
    {
      where: {
        [Op.and]: [{ scId: newdata.scId, parentCid: newdata.parentCid }],
      },
    }
  );
};

exports.find = (data) => {
  return Models.subCategoryModel.findOne({
    where: {
      scId: data.scId,
    },
  });
};
