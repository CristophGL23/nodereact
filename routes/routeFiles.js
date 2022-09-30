import express from 'express';
import multer from 'multer';
import { createFile, deleteFile, getFiles, upload } from '../controllers/FileController.js';
import FileModel from '../models/FileModel.js';


const router = express.Router();

router.post('/', upload, createFile);
router.get('/', getFiles);
router.delete('/:id', deleteFile);

export default router