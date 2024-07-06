const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  addProject,
  fetchProjects,
  fetchOneProject,
  addImagesToProject,
  viewOneProject,
} = require("../controllers/projectController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//to add project
router.post("/add", verifyToken, addProject);

//to fetch projects
router.get("/fetch/:userId", verifyToken, fetchProjects);

//to fetch one project
router.get("/fetchOne/:id", verifyToken, fetchOneProject);

//add images to existing project
router.post(
  "/addImages",
  verifyToken,
  // upload.array("images"),
  addImagesToProject
);

router.get("/view/:id", viewOneProject);

module.exports = router;
