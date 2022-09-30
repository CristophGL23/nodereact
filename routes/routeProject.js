import express from "express";
import { verify } from "../controllers/LoginController.js";
import { checkinProject, checkUpdate, createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/ProjectController.js";

const router = express.Router();

router.get('/', verify, getAllProjects);
router.get('/consultados', checkinProject);
router.get('/:id', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.put('/consultados/:id', checkUpdate);



export default router