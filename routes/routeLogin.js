import express from 'express';
import { Login, Logout, Refresh, testVerify, verify } from "../controllers/LoginController.js";

const router = express.Router();


router.post('/login', Login);
router.post('/refresh', Refresh);
router.post('/logout', verify, Logout);
router.delete('/users/:id', verify, testVerify);


export default router