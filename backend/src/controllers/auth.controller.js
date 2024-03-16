import { apiErrorHandler, errorHandler } from "../middlewares/errorhandler.middleware.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUsers = await User.find({});
    const usersLength = existingUsers.length;
    const newUser = new User({ name, email, password: hashedPassword, avatar: `https://picsum.photos/${300 + usersLength}`});

    try {
        await newUser.save()
        res.status(201).json({ message: "user created successfully" });
    } catch (error) {
        next(error);
    }
};

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if(!validUser) return next(apiErrorHandler(404, 'User Not Found'));
        const validPassword = await bcrypt.compare(password, validUser.password);
        if(!validPassword) return next(apiErrorHandler(401, 'Wrong Credentials'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error)
    }
};

const googleAuth = async (req, res, next) => {
    const { name, email, password, avatar } = req.body;
    //console.log(name, email, password, avatar);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const isvalidUser = await User.findOne({ email });
        if(!isvalidUser) {
            const newUser = new User({ name, email, password: hashedPassword, avatar });

            try {
                await newUser.save()
                return res.status(201).json({ message: "user created successfully" });
            } catch (error) {
               return next(error);
            }
        }
        const validUser = await User.findOne({ email });
        const validPassword = await bcrypt.compare(password, validUser.password);
        if(!validPassword) return next(apiErrorHandler(401, 'Wrong Credentials'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        //console.log(rest)
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
            

    } catch (error) {
        next(error)
    }
}

const signOut = async (req, res, next) => {
    try {
        res
            .clearCookie('access_token')
            .status(200)
            .json('User has been signout out');
    } catch (error) {
        next(error)
    }
}

export {
    signUp,
    signIn,
    googleAuth,
    signOut,
};