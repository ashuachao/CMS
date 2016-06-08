import mongoose from "mongoose";
var carMsgSchema = require('../Schemas/carMsgSchema.js');
var CarMsgModel = mongoose.model('CarMsgModel', carMsgSchema);
module.exports = CarMsgModel;