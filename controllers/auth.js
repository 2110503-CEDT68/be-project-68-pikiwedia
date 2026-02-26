const User = require("../models/User");
const sendTokenResponse = require("../lib/sendTokenResponse");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Error: Please provide both email and password"
            });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Error: Invalid credentials"
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Error: Invalid credentials"
            });
        }
        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error: Internal server error"
        });
    }
}

exports.logout = (req, res) => {
    res.cookie("token", "null", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    }).json({
        success: true,
        message: "Logged out successfully"
    });
}

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error: Internal server error"
        });
    }
}

exports.register = async (req, res) => {
    const { name, tel, email, password } = req.body;
    try {
        const user = await User.create({ name, tel, email, password });
        sendTokenResponse(user, 201, res);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: `Error: Registration failed - ${error.message}`
        });
    }
};

exports.registerAdmin = async (req, res) => {
    const { name, tel, email, password } = req.body;
    try {
        const user = await User.create({ name, tel, email, password, role: "admin" });
        sendTokenResponse(user, 201, res);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: `Error: Admin registration failed - ${error.message}`
        });
    }
};