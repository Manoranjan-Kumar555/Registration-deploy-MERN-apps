const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "User already exists, please Login", success: false });
        }
        const userModel = new UserModel({ name, email, password });

        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({ message: "User sign-up successfully", success: true });

    } catch (err) {
        console.log("Error in signup", err);
        res.status(500)
            .json({ message: "Internal Server Erro in sign-up", success: false });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMessage = "Authentication failed email and password is Incorrect!"
        if (!user) {
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }

        const jwtToken = jwt.sign({ email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )


        res.status(200)
            .json({ 
                message: "User Login success", success: true, 
                jwtToken, 
                email, 
                name: user.name 
            })

    } catch (err) {
        console.log("Error in signup", err);
        res.status(500)
            .json({ message: "Internal Server Erro in sign-up", success: false });
    }
}

module.exports = {
    signup,
    login
}