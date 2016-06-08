import moment from "moment";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * store user msg
 */
const guestSchema = new Schema({
    // 通过isAuthenticated判断是否小区用户
    carLog: {
        type: ObjectId,
        ref: 'CarLogModel'
    }
}) 
module.exports = guestSchema;



