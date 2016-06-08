import mongoose from "mongoose";
var userLogSchema = require('../Schemas/userLogSchema.js');
var UserLogModel = mongoose.model('UserLogModel', userLogSchema);
module.exports = UserLogModel;