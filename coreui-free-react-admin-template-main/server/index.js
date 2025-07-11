const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const Register = require("./routes/register");
const loginRoutes = require("./routes/login");
const changePasswordRoutes = require("./routes/changePassword");
const ProfileRoutes = require("./routes/profile");
const categoryRoutes = require("./routes/category");
const brand = require("./routes/brand");
const offer = require("./routes/offer");
const units = require("./routes/units");
const Product = require("./routes/product");
const image = require("./routes/image");
const size = require("./routes/size");


const app = express();
app.use(express.json());
app.use(cors());
 app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use('/register',Register);
app.use("/login",loginRoutes)
app.use("/changePassword", changePasswordRoutes)
app.use("/profile", ProfileRoutes)
app.use('/category', categoryRoutes);
app.use('/brand',brand);
app.use('/offer',offer);
app.use('/units',units);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/product',Product);
app.use('/image',image);
app.use('/size',size);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
