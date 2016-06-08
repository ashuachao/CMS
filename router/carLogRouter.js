import UserModel from "../MongoDB/Models/UserModel.js";
import GuestModel from "../MongoDB/Models/GuestModel.js";
import mongoose from "mongoose";
const router = require('koa-router')();
const ObjectId = mongoose.Schema.Types.ObjectId;

router.prefix('/carMan');
router.post('/carLog/', async(ctx,next) => {
    const userParams = ctx.request.body;
    ctx.type = "application/json";
    try {
        const user = await UserModel.findOne({
            _id: userParams.user
        }).populate('carLogs');
        ctx.body = {
            carLogs: user.carLogs
        }
    } catch(err) {
        ctx.body = {
            result: "not this carMsg"
        }
    }
})
router.post('/carLog/guest', async(ctx,next) => {
    console.log(ctx.session)
    const userParams = ctx.request.body;
    ctx.type = "application/json";
    try {
        const user = await GuestModel.findOne({
            _id: userParams.user
        }).populate('carLog');
        ctx.body = {
            carLog: user.carLog
        }
    } catch(err) {
        ctx.body = {
            result: "not this carMsg"
        }
    }
})

export default router;