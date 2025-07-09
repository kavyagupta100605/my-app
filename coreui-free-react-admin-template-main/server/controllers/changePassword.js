const express = require("express");
const bcrypt = require("bcryptjs");

const {User} = require('../model/User');



exports.createPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    
    const user = await User.findById(req.User.id);
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password changed successfully" });
};
