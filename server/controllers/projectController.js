const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");
const addProject = async (req, res) => {
  try {
    const { userId, projectName, allImages } = req.body;
    // const images = [
    //   "A:/My Projects/React-Learning/PictureGallery/server/apple-website.png",
    //   "A:/My Projects/React-Learning/PictureGallery/server/chatApp.png",
    // ];
    let results = [];
    for (const image of allImages) {
      const result = await cloudinary.uploader.upload(image);
      results.push(result);
    }
    const newProject = new Project({ userId, projectName, images: results });
    await newProject.save();
    res.status(201).json({ message: "Project added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Project addition failed" });
  }
};

const fetchProjects = async (req, res) => {
  const { userId } = req.params;
  try {
    const projects = await Project.find({ userId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Fetching projects failed" });
  }
};

const fetchOneProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    const project = await Project.findById(id);
    console.log("fetchOneProject:", project);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Fetching project" });
  }
};

const addImagesToProject = async (req, res) => {
  try {
    const { id, allImages } = req.body;
    console.log("allImages:", allImages);
    let results = [];
    for (const image of allImages) {
      results.push({ url: image });
    }
    const updateResult = await Project.updateOne(
      { _id: id },
      { $push: { images: { $each: results } } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        message: "Project not found or no images added",
        updatedProject,
      });
    }

    res
      .status(201)
      .json({ message: "Images added successfully", updateResult });
  } catch (error) {
    res.status(500).json({ error: "Images addition failed", error });
  }
};

const viewOneProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Fetching project" });
  }
};

module.exports = {
  addProject,
  fetchProjects,
  fetchOneProject,
  addImagesToProject,
  viewOneProject,
};
