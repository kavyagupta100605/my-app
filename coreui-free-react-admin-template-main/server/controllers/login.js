const {User} = require('../model/User');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

exports.createLogin = async (req,res) => {
   const user = await User.findOne({ email: req.body.email});
   
   if(!user) return res.status(400).json({message: "Invalid Credentials"});
   const isMatch = await bcrypt.compare(req.body.password, user.password);
   
   if(!isMatch) return res.status(400).json
   ({message: "Invalid credentials"});
   const token = jwt.sign({ id: user._id},
    process.env.JWT_SECRET, {expiresIn:"1h"}
   );
   res.json({ token, user: { id: user._id,email: user.email } });
}