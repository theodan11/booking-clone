import User from "../models/user.js";


export const getUser = async(req, res, next)=>{
    try {
        const id = req.params.id
        const user = await User.findOne(id)
        return res.status(200).json({"data":user})
    } catch (error) {
        next(error)
    }
}

export const getUsers = async (req, res, next)=>{
    try {
        const users = await User.find({})
        return res.status(200).json({"data":users})
    } catch (error) {
        next(error)
    }
}

export const updateUser = async(req, res, next)=>{

    try {
       const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        {new:true}
       )
    } catch (error) {
        next(error)
    }
}


export const deleteUser = async(req, res, next)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
    } catch (error) {
        nexd(error)
    }
}

