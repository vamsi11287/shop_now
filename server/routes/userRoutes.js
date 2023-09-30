import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

// create user
router.post('/register',registerUser)
router.post('/login',authUser )
router.get('/profile',protect,getUserProfile )
router.put('/profile',protect,updateUserProfile)




export default router