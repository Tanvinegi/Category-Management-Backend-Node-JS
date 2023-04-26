const express = require("express");
const Ctrl = require("../controllers");
const auth = require("../middleware/auth.js");
const router = express.Router();

//user routes
router.post("/addUser", async (req, res) => {
  let data = await Ctrl.users.addUser(req.body);
  res.send(data);
});
router.post("/login", async (req, res) => {
  let data = await Ctrl.users.login(req.body);
  res.send(data);
});

// category routes

//----- get all the categories-------
router.get("/getAllCategory", async (req, res) => {
  let data = await Ctrl.categories.getAllCategories(req, res);
  res.send(data);
});

router.get("/getCategoryByName/:name", async (req, res) => {
  let data = await Ctrl.categories.getFilteredCategories(req.params, req, res);
  res.send(data);
});

router.use(auth);
// ----------------- add categories ---------------
router.post("/addCategory", auth, async (req, res) => {
  let data = await Ctrl.categories.addCategory(req.body, req, res);
  res.send(data);
});

router.post(
  "/addSubCategory",
  auth,
  Ctrl.subCat.upload.single("image"),
  async (req, res) => {
    let data = await Ctrl.subCat.addSubCategory(req.body, req, res);
    res.send(data);
  }
);

//----------------- Edit Categories ------------------------
router.delete("/deleteCategory", auth, async (req, res) => {
  let deleteData = await Ctrl.categories.deleteCategory(req, res);
  res.send(deleteData);
});

router.put("/update/category", auth, async (req, res) => {
  let updatedData = await Ctrl.categories.updateCategory(req, res);
  res.send(updatedData);
});

router.put(
  "/update/subCategory",
  auth,
  Ctrl.subCat.upload.single("image"),
  async (req, res) => {
    let updatedData = await Ctrl.subCat.updateSubCategory(req, res);
    res.send(updatedData);
  }
);

module.exports = router;
