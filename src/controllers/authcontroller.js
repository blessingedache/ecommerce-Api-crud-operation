
import User from "../models/authmodel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, userName } = req.body;
        if (!firstName || !lastName || !email || !password || !userName) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }
        
        const registerUser = await User.create({
            firstName, 
            lastName, 
            email,
            password: await bcrypt.hash(password, 10),
            userName,
        });

        res
        .status(200)
        .json({ message: "User registered successfully", data: registerUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
    };


    //Login user endpoint
    export const login = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Please provide email and password" });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "invalid email/password" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid email/password" });
            }

            res.status(200).json({ message: "Login successful", data:user });
            
            // const token = await user.generateToken();
            // res.status(200).json({ message: "Login successful", token, user });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
