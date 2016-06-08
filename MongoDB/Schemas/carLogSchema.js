import moment from "moment";
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
// car Manage Schema
// to store 
var carMsgSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'UserModel'
    },
    enterIn: {
		type: String,
        default: 'not exist'
	},
	entranceIn: {
		type: String,
        default: 'not exist'
	} 
})	
module.exports = carMsgSchema;