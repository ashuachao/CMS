import moment from "moment";
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var tokenSchema = new Schema({
	enterToken: String,
	gooutToken: String
})
module.exports = tokenSchema;