import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res,next) => {
   const { username, email, password } = req.body;
   const hashPass = bcryptjs.hashSync(password, 10);
   const newUser = new User({
      username,
      email,
      password: hashPass
   });
   try {
      await newUser.save();
      res.status(200)
         .json({
            message: "User Created Successfully"
         })
   } catch (error) {
      next(error)
   }
}