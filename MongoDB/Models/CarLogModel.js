import mongoose from "mongoose";
var carLogSchema = require("../Schemas/carLogSchema.js");
var CarLogModel = mongoose.model('CarLogModel', carLogSchema);
module.exports = CarLogModel;