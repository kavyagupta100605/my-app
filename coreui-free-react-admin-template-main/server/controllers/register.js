const {User} = require('../model/User');
const bcrypt = require("bcryptjs")
const sendEmail = require("../utilis/SendEmail");

exports.createuser = async (req,res) => {
    const {username,email} = req.body;
    let user = await User.findOne({email});
    if(user) return res.status(400).json({message: "User already exists"});

    //Generate Random Password
    const generatedpassword = Math.floor((Math.random()*9000)+1000).toString();
    
    //Hash
    const hashedpassword = await bcrypt.hash(generatedpassword, 10);

    //new user
    const NewUser = new User({
        username,
        email,
        password: hashedpassword,
    });
    await NewUser.save();

    //email
    await sendEmail(email, "Your Account Credentials", `Your password:${generatedpassword}`);

    res.status(201).json({ message: "User registered. Check your email for login credentials." });
}
