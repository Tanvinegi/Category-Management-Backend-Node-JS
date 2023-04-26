const Services = require("../services");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give a proper file format to upload.");
  },
});

module.exports = {
  addSubCategory: async (datas, req, res) => {
    let data = {
      name: datas.name,
      image: req.file.path,
      parentCid: req.body.parentCid,
    };
    if (req.user.role === 1) {
      const category = await Services.subCatSer.findSubCategory(data);
      if (category) {
        return "Sub-Category already exists";
      } else {
        let newData = {
          name: data.name,
          parentCid: data.parentCid,
          image: data.image,
        };
        let add = await Services.subCatSer.addCategory(newData);
        return {
          status: "success",
          msg: "Sub-Category added successfully.",
          category: add,
        };
      }
    }
  },

  //--------  update sub category -----
  updateSubCategory: async (req, res) => {
    const data = {
      scId: req.body.scId,
      name: req.body.name,
      image: req.file.path,
      parentCid: req.body.parentCid,
    };
    const category = await Services.subCatSer.find(data);
    if (category && req.user.role === 1) {
      const newdata = {
        name: data.name,
        scId: data.scId,
        image: data.image,
        parentCid: data.parentCid,
      };
      const updateData = await Services.subCatSer.update(newdata);
      res
        .status(200)
        .json({ message: "Updation Successfull.", data: updateData });
    } else {
      res.status(400).json({ message: "Updation Un-successfull." });
    }
  },

  upload,
};
