/**
 * combine all reducer
 */
import {combineReducers} from "redux";
/**
 * seperate import reducer
 */
import carLog from "./carLog.js";
import userAuth from './userAuth.js';
import userMsg from './userMsg.js';
export default combineReducers({
    userAuth,
    carLog,
    userMsg
})