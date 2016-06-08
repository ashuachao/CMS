import moment from "moment";
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var userLogSchema = new Schema({
    user: {
        type: String,
        ref: 'UserModel'
    },
	loginAt: {
		type: String,
		default: moment().format('MM-DD-YYYY')
	},
	logoutAt: {
		type: String,
		default: moment().format('MM-DD-YYYY')
	} 
})
module.exports = userLogSchema;