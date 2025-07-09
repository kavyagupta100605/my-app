const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name:{type:String,required: true},
    tele:{type:String,required: true},
    gender:{type:String},
    qual:{type:String},
    image:{type:String},
    date:{type:Date},
    email:{type:String,unique: true},
},{timestamps: true});
const Profile = mongoose.model('Profile',ProfileSchema);
module.exports = {Profile};