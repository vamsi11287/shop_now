import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utills/generateToken.js'


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User Already Exsists')
    }
    const user = await User.create({
        name, email, password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalied User Data')
    }

})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalied Email or password')
    }

})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(404)
        throw new Error(' User Not Found ')
    }
})


const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findByIdAndUpdate(req.user._id)
    // console.log(user)
    // console.log(name,email,password)dfsddf

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

       const updatedUser = await user.save()
        res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id)
            })
        }
    //     const name = req.body.name || user.name
    //     const email = req.body.email || user.email
    //     if(req.body.password){
    //         user.password = req.body.password 
    //     }
    //     const updatedUser = await user.save()
        
    else {
        res.status(404)
        throw new Error(' User Not Found ')
    }
})

export { authUser, registerUser, getUserProfile,updateUserProfile }