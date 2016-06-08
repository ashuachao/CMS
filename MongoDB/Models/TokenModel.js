import mongoose from "mongoose";
var tokenSchema = require('../Schemas/tokenSchema.js');
var TokenModel = mongoose.model('TokenModel', tokenSchema);
module.exports = TokenModel;