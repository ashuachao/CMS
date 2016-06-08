import moment from "moment";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * store user msg
 */
const userSchema = new Schema({
	userName: String,
    // 通过isAuthenticated判断是否小区用户
    isAuthenticated: Boolean,
	isRoot: Boolean,
    address: String,
    tel: Number,
    carMsgs: [{
        type: ObjectId,
        ref: 'CarMsgModel'
    }],
	userlogs: [{
		type: ObjectId,
		ref: 'UserLogModel' //Log model
	}],
    carLogs: [{
        type: ObjectId,
        ref: 'CarLogModel'
    }],
	createAt: {
		type: String,
		default: moment().format('MM-DD-YYYY')
	}
}) 
module.exports = userSchema;



