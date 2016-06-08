import moment from "moment";
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var carMsgSchema = new Schema({
    user: {
      type: ObjectId,
      ref: 'UserModel'
    },
	carName: String,
	carNumber: String,
	buyAt: {
        type: String,
		default: moment().format('MM-DD-YYYY')    
    }
})
module.exports = carMsgSchema;