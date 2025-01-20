import User from "../models/user.js";
import express from 'express'
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/userController.js";

const router = express.Router()


router.get('/users', verifyAdmin, getUsers)
router.get('/users/:id', verifyUser, getUser)
router.put('/users/:id', verifyUser, updateUser)
router.delete('/users/:id', verifyAdmin, deleteUser)


export default router

