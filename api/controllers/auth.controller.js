import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ type: "module" });
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    //save user to the db
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    // console.log(newUser)
    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //check if user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const age = 1000 * 60 * 60 * 24 * 7;
    //send token
    const token = jwt.sign(
      { id: user.id, isAdmin: true },
      process.env.JWT_SECRET,
      {
        expiresIn: age,
      }
    );
    // delete user.password;
    const { password: userPassword, ...otherDetails } = user;
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,  //open only in production mode https
        // sameSite: "none",
        maxAge: age,
      })
      .status(200)
      .json(otherDetails );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful!" });
};
