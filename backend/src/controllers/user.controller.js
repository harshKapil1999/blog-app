import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

const getAllUsers = async (req, res) => {};

const createUser = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;
        const userExists = await User.findOne({ email });

        if(userExists) return res.status(200).json(userExists);

        const newUser = await User.create({
            name,
            email,
            password,
            avatar
        })

        res.status(200).json({ message: "User Created Successfully", newUser });

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

const getUserInfoByID = async (req, res) => {};


export {
    getAllUsers,
    createUser,
    getUserInfoByID,
}