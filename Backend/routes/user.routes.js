import express from 'express'
import { body } from 'express-validator'
import { RegisterUser, Login, updateUserData } from '../controllers/user.Controller.js'
import { Router } from 'express'


const router = Router();

router.post('/register', RegisterUser);
router.post('/login', Login);
router.put('/updateUser/:id', updateUserData)
//router.get('/profile', GetUserProfile );




export default router;