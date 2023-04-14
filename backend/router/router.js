import { Router } from "express";
import { createUser, deleteUser, getUser, loginUser, logout } from "../controller/usersController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";

const router = Router();

router.delete('/delete/:id', deleteUser)
router.post('/create',createUser);
router.post('/login',loginUser);
router.get('/get', verifyToken, getUser)
router.get('/token', refreshToken)
router.delete('/logout', logout)


export default router;