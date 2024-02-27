import { apiErrorHandler } from "../middlewares/errorhandler.middleware.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";


const getAllUsers = async (req, res) => {};
const getUserInfoByID = async (req, res) => {};

const updateUserInfo = async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, oldPassword, newPassword } = req.body;
    console.log(name, email, oldPassword, newPassword);
    const user = await User.findById(userId);
    if(!user) return next(apiErrorHandler(404, "User not found"));

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if(!validPassword) return next(apiErrorHandler(401, 'Wrong Credentials'));

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findOneAndUpdate(
            user,
            {
                name,
                email,
                password: hashedPassword,
                
            }
        )

        const { password: hashPassword, ...rest } = updatedUser._doc;

        res.status(200).json({rest, message: "User updated successfully!"});
    } catch (error) {
        next(apiErrorHandler(error));
    }

};

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    if(!userId) return next(apiErrorHandler(404, "User not found!"));

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser) return next(apiErrorHandler(500, "Something went wrong!"));

        res.status(200).json({deleteUser, message: "User deleted successfully!"});
    } catch (error) {
        next(apiErrorHandler(error))
    }
};

export {
    getAllUsers,
    getUserInfoByID,
    updateUserInfo,
    deleteUser,
}