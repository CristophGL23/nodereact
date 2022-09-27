import express from "express";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/ProjectController.js";

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router