import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { createError } from '../utils/createError.js'
import Jwt from 'jsonwebtoken'
export const createUser = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
        ...req.body,
        password: hash,

    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json({ 'message': 'User created', 'data':savedUser})
    } catch (error) {
        next(createError(400, 'Not created'))
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return next(createError(404, 'User not found'))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(400, 'Wrong username or password'))
        }
        const { isAdmin, password, ...others } = user._doc
        const token = Jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
        return res.cookie("access_token", token, {
            httpOnly: true,
        }).json(others)
    } catch (error) {
        next(error)
    }

}