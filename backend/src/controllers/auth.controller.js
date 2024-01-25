import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    try {
        await newUser.save()
        res.status(201).json({ message: "user created successfully" });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export {
    signUp,
};