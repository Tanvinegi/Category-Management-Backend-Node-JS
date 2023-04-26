const { Op } = require("sequelize");
const Models = require("../models");

Models.categoryModel.hasMany(Models.subCategoryModel, {
  foreignKey: "parentCid",
});
//------- find all the categories -------
exports.findAllCategories = () => {
  return Models.categoryModel.findAndCountAll({
    attributes: ["cId", "name"],
    include: [
      {
        model: Models.subCategoryModel,
        attributes: ["scId", "name", "image", "parentCid"],
      },
    ],
  });
};

//---------- filter categories by name ---------

exports.getFilteredCategories = (data) => {
  return Models.categoryModel.findOne({
    attributes: ["cId", "name"],
    include: [
      {
        model: Models.subCategoryModel,
      },
    ],
    where: {
      [Op.and]: [{ name: data.name, deletedAt: null }],
    },
  });
};

exports.findCategory = (data) => {
  return Models.categoryModel.findOne({
    where: {
      name: data.name,
    },
  });
};
exports.addCategory = (data) => {
  return Models.categoryModel.create(data);
};

//--------- Delete  Sub-Categories --------

exports.findSubCategory = (data) => {
  return Models.subCategoryModel.findOne({
    where: {
      scId: data.scId,
    },
  });
};
exports.deleteCategory = (obj) => {
  return Models.subCategoryModel.destroy({
    where: {
      [Op.and]: [{ scId: obj.scId }, { parentCid: obj.parentCid }],
    },
  });
};
// ---------------

// exports.getCategories = (data) => {
//   return Models.categoryModel.findAll({
//     where: { name: data.name },
//   });
// };

// exports.getAllC = () => {
//   return Models.categoryModel.findAndCountAll();
// };

//--------- update category ------------
exports.update = (newdata) => {
  return Models.categoryModel.update(
    {
      name: newdata.name,
    },
    {
      where: {
        cId: newdata.cId,
      },
    }
  );
};

exports.find = (data) => {
  return Models.categoryModel.findOne({
    where: {
      cId: data.cId,
    },
  });
};
