import mongoose from "mongoose";
var userSchema = require('../Schemas/userSchema.js');
var UserModel = mongoose.model('UserModel', userSchema);
module.exports = UserModel;