import mongoose from "mongoose";
var guestSchema = require('../Schemas/guestSchema.js');
var GuestModel = mongoose.model('GuestModel', guestSchema);
module.exports = GuestModel;