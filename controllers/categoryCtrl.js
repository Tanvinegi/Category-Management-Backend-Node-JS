const Services = require("../services");
const Joi = require("joi");
const Helper = require("../Helper/validation.js");

module.exports = {
  addCategory: async (datas, req, res) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    let data = await Helper.verifyjoiSchema(datas, schema);
    if (!data) {
      return { status: "failed", message: "Invalid strings types" };
    } else {
      let categoryData = {
        name: data.name,
      };
      console.log(req.user);
      if (req.user.role === 1) {
        const category = await Services.categorySer.findCategory(categoryData);
        if (category) {
          return " category already exists";
        } else {
          let newData = {
            name: categoryData.name,
          };
          let add = await Services.categorySer.addCategory(newData);
          return {
            status: "success",
            msg: "Category added successfully.",
            category: add,
          };
        }
      }
    }
  },

  deleteCategory: async (req, res) => {
    const obj = {
      scId: req.body.scId,
      parentCid: req.body.parentCid,
    };
    const category = await Services.categorySer.findSubCategory(obj);
    console.log("category: ", category);
    if (category && req.user.role === 1) {
      const deleteCat = await Services.categorySer.deleteCategory(obj);
      res
        .status(200)
        .json({ message: "Deletion successfull", details: deleteCat });
    } else {
      res
        .status(401)
        .send(
          "Category not found, Access Denied Or You Are Not Autherized to delete."
        );
    }
  },

  // getCategory: async (req, res) => {
  //   let data = {
  //     name: req.body.name,
  //   };
  //   const category = await Services.categorySer.getCategories(data);
  //   if (category) {
  //     res.send(category);
  //   } else {
  //     res.send("No as such category is found. OR Something went wrong.");
  //   }
  // },

  //-------- to find all the categories ------
  getAllCategories: async (req, res) => {
    const category = await Services.categorySer.findAllCategories();
    if (category) {
      res.send(category);
    } else {
      res.send("Something went wrong.");
    }
  },

  //------- get category by name ---------
  getFilteredCategories: async (datas, req, res) => {
    let data = {
      name: datas.name,
    };
    const category = await Services.categorySer.getFilteredCategories(data);
    if (category) {
      res.send(category);
    } else {
      res.send("Something went wrong.");
    }
  },
  //--------  update category -----
  updateCategory: async (req, res) => {
    const data = {
      cId: req.body.cId,
      name: req.body.name,
    };
    const category = await Services.categorySer.find(data);
    if (category && req.user.role === 1) {
      const newdata = {
        name: data.name,
        cId: data.cId,
      };
      const updateData = await Services.categorySer.update(newdata);
      res
        .status(200)
        .json({ message: "Updation Successfull.", data: updateData });
    } else {
      res.status(400).json({ message: "Updation Un-successfull." });
    }
  },
};
