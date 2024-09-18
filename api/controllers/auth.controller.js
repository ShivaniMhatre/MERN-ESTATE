import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashPassword
    });
    try {
        await newUser.save()
        res.status(201).json("User Created Successfully!!!");
    } catch (error) {
        res.status(500).json(error.message);
    }

}