import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
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

export const signin = async (req, res, next) => {
   const { email, password } = req.body;
   try {
      const validUser = await User.findOne({ email });
      if (!validUser)
         return next(errorHandler(404, 'User Not Found'))
      const validPassword = bcryptjs.compareSync(password, validUser.password)
      if (!validPassword)
         return next(errorHandler(401, 'Invalid Password!!'))
      const token = jwt.sign({ id: validUser._id }, process.env.JWT)
      const { password: pass, ...rest } = validUser._doc;
      res.cookie('access_token', token, { httpOnly: true })
         .status(200)
         .json(rest);
   }
   catch (error) {
      next(error)
   }
}

export const google = async (req, res, next) => {
   try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
         const token = jwt.sign({ id: user._id }, process.env.JWT);
         const { password: pass, ...rest } = user._doc;
         res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
      } else {
         const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
         const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
         const newUser = new User({
            username:
               req.body.name.split(' ').join('').toLowerCase() +
               Math.random().toString(36).slice(-4),
            email: req.body.email,
            password: hashedPassword,
            image: req.body.image,
         });
         await newUser.save();
         const token = jwt.sign({ id: newUser._id }, process.env.JWT);
         const { password: pass, ...rest } = newUser._doc;
         res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
      }
   } catch (error) {
      next(error);
   }
};