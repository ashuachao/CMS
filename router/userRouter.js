import UserModel from "../MongoDB/Models/UserModel.js";
import CarLogModel from "../MongoDB/Models/CarLogModel.js";
import CarMsgModel from "../MongoDB/Models/CarMsgModel.js";
import GuestModel from "../MongoDB/Models/GuestModel.js";
import TokenModel from "../MongoDB/Models/TokenModel.js";
import moment from 'moment';
import mongoose from "mongoose";
const router = require('koa-router')();
const ObjectId = mongoose.Schema.Types.ObjectId;
/**
 * simply judge if it is mobile
 */
const isMobile = async (ctx, next) => {
    const header = ctx.header;
    const userAgent = header['user-agent'];
    if(userAgent.indexOf('OS') > -1) {
        await next();
    } else {
        ctx.redirect('http://127.0.0.1:3001/404.html');
    }
}

router.prefix('/user');

router.get('/test', async(ctx, next) => {
    // ctx.session.aa = "aaa";
    console.log(ctx.session)
})
router.post('/record/enterIn/:token', async(ctx, next) => {
    console.log('============>receive')
    const params = ctx.request.body;
    const userId = params.userId;
    const isGuest = params.isGuest;
    const token = ctx.params.token;
    const enterToken = await TokenModel.findOne({
        enterToken: token
    })
    if (enterToken) {
        if (isGuest == "1") {
            const guest = await GuestModel.findOne({
                _id: userId
            }).populate('carLog');
            const carLog = await CarLogModel.findOne({
                _id: guest.carLog['_id']
            })
            carLog.enterIn = moment().format('MM-DD-YYYY')
            await carLog.save();
            ctx.body = {
                open: true
            }
        }else {
            const newCarLog = new CarLogModel({
                enterIn: moment().format('MM-DD-YYYY')
            })
            const user = await UserModel.findOne({
                _id: userId
            }).populate('carLogs')
            user.carLogs.push(newCarLog);
            await newCarLog.save();
            await user.save();
        }
    } else {
        ctx.body = {
            msg: '二维码无效'
        }
    }
})
         
  
/**
 * post register
 */
router.post('/register', async (ctx, next) => {
    console.log(ctx.session)
    const userParams = ctx.request.body;
    ctx.type = "application/json";
    try {
        const userName = userParams.userName;
        const user = await UserModel.findOne({
            userName
        })
        if (!user) {
            const newUser = new UserModel(userParams);
            await newUser.save();
            ctx.body = {
                msg: "register Success",
                user: userName
            } 
        }else {
            ctx.body = {
                msg: "用户已注册,请直接登录"
            }   
        } 
    }catch(error) {
        ctx.body = {
            msg: '注册失败'
        }
    }
})
/**
 * login
 */
router.post('/login', async (ctx, next) => {
    // 参数为wechat 绑定的账号信息或已认证的用户信息
    const userParams = ctx.request.body;
    ctx.type = "application/json"; 
    try {
        // const password = userParams.password;
        const user = await UserModel.findOne({
            userName: userParams.userName
        });
        // if (user.password == password) {            
        if (user) {
        // 如果user信息存在
            ctx.body = {
                user: user['_id'],
                userName: user.userName,
                msg: "login success"
            }
        } else {
            ctx.body = {
                msg: "请注册用户或点击微信一键注册"
            }
        }
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            msg: "not this fuxxing guy"
        }
    }
})
/**
 * logout
 */
router.post('/logout', async (ctx, next) => {
    const userParams = ctx.params;
    ctx.type = "application/json"; 
    try {
        const user = await UserModel.findOne({
            name: carUserParams.name
        });
        ctx.session.user = null;
        if (user) {
            ctx.body = {
                msg: "logout success"
            }    
        } else {
            ctx.status = 301;
            ctx.redirect("/login");
        }
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            msg: "not this fuxxing guy"
        }
    }
})

router.post('/guest', async (ctx, next) => {
    ctx.type = 'application/json';
    try {
        const newGuest = new GuestModel();
        const newCarLog = new CarLogModel();
        await newCarLog.save();
        newGuest.carLog = newCarLog;
        await newGuest.save();
        console.log(newCarLog)
        console.log('===========>createGuest')
        ctx.body = {
            msg: "register Success",
            user: newGuest['_id'],
            isGuest: true
        } 

    }catch(error) {
        console.log(error);
        ctx.body = {
            msg: '注册失败'
        }
    }
})
router.post('/guestLogin', async (ctx, next) => {
    ctx.type = 'application/json';
    const userParams = ctx.request.body;  
    try {
        // const password = userParams.password;
        const guest = await GuestModel.findOne({
            _id: userParams.user
        });
        // if (user.password == password) {            
        if (guest) {
        // 如果user信息存在
           console.log('===========>reLogin')
            ctx.body = {
                msg: "register Success",
                user: guest['_id'],
                isGuest: true
            } 
        } else {
            ctx.body = {
                msg: "请注册用户或点击微信一键注册"
            }
        }
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            msg: "not this fuxxing guy"
        }
    }
   
})
router.post('/guestPrice', async (ctx, next) => {
    const guestParams = ctx.request.body;
    ctx.session.count = ctx.session.count || 1;
    ctx.session.count++;
    ctx.type = 'application/json';
    try {
        const guest = await GuestModel.findOne({
            _id: guestParams.user
        }).populate('carLog');
        const originalTime = guest.carLog.enterIn;
        // const presentTime = new Date();
        ctx.body = {
            msg: "register Success",
            user: guest['_id'],
            price: ctx.session.count,
            isGuest: true
        } 

    }catch(error) {
        ctx.body = {
            msg: '注册失败'
        }
    }
})
/**
 * 后台管理页面restfulAPI
 */

router.post('/getUser/:user', async (ctx, next) => {
    console.log(ctx.session)
    const userParams = ctx.params;
    ctx.type = "application/json";
    try {
        const user = await UserModel.findOne({
            _id: userParams.user
        }).populate('userLogs carMsgs').exec();
        ctx.body = {
            user: user
        }
    } catch (err) {
        ctx.body = {
            msg: 'not this guy'
        }
    }
})
/**
 * addUser
 */
router.post('/addUser', async (ctx, next) => {
	const userParams = ctx.params;
    ctx.type = "application/json"; 
    try {
        const user = ctx.session.user;
        if (user && user.isRoot) {
            const newUser = new UserModel(userParams);
            await newUser.save();
            ctx.body = {
                msg: "save Success"
            } 
        }else {
            ctx.body = {
                msg: "对不起，你不是root用户，没有权限"
            }   
        } 
    }catch(error) {
        ctx.status = error.status || 500;
        ctx.body = {
            msg: "not this fuxxing guy"
        }
    }
})
/**
 * deleteUser
 */
router.post('/deleteUser', async (ctx, next) => {
    const userParams = ctx.params;
    ctx.type = "application/json"; 
    try {
        const user = ctx.session.user;
        if (user && user.isRoot) {
            await UserModel.remove({
            // _id: ObjectId("5711f84045068b3b730b35ce")
                name: userParams.userName
            });
            ctx.body = {
                msg: "delete Success"
            } 
        }else {
            ctx.body = {
                msg: "请登录用户或点击微信一键登录"
            }   
        } 
    }catch(error) {
        ctx.status = error.status || 500;
        ctx.body = {
            msg: "not this fuxxing guy"
        }
    }
})
/**
 * updateUser
 */
router.post('/updateUser',async (ctx, next) => {
    const userParams = ctx.request.body;
    ctx.type = "application/json"; 
    try {
        await UserModel.update({
            _id: userParams['_id']
        },{
            $set: {
                userName: userParams.userName,
                address: userParams.address,
                tel: userParams.tel
            }
        });
        const user = await UserModel.findOne({
            _id: userParams['_id']
        })
        ctx.body = {
            msg: "update Success",
            user: user
        } 
    }catch(error) {
        console.log(error);
        ctx.status = error.status || 500;
        ctx.body = {
            msg: "not this fuxxing guy"
        }
    }
})
router.get('/manage', async(ctx, next) => {
    console.log(ctx.session)
    ctx.type = "text/html";
    await ctx.render('index.jade');
})
export default router;