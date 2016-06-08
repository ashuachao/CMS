const router = require('koa-router')();
import csrf from "koa-csrf";
import convert from 'koa-convert';
import TokenModel from "../MongoDB/Models/TokenModel.js";
router.use(convert(csrf()))
router.get('/showQrcode/enterIn', async(ctx, next) => {
    const token = ctx.csrf;
    const isXHR = !!(ctx.request.header['x-requested-with']);
    if (isXHR) {
        const originalToken = ctx.query.originalToken;
        await TokenModel.update({
            enterToken: originalToken
        }, {
            $set: {
                enterToken: token
            }
        })
        // console.log("========>update", token)
        ctx.body = token;
    }else {
        const newToken = new TokenModel({
            enterToken: token
        })
        await newToken.save();
        // console.log("========>original",newToken.enterToken)
        await ctx.render("enterQrcode.jade",{
            token: newToken.enterToken
        })
    }
})
router.get('/showQrcode/goOut', async(ctx, next) => {
    const token = ctx.csrf;
    const isXHR = !!(ctx.request.header['x-requested-with']);
    if (isXHR) {
        ctx.body = token;
    }else {
        await ctx.render("gooutQrcode.jade",{
            token: token
        })
    }
})

export default router