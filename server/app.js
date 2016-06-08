import Koa from "koa";
import convert from 'koa-convert';
import mongoose from 'mongoose';
import rootRouter from "../router/rootRouter.js"
import serve from "koa-static";
import path from "path";
import csrf from "koa-csrf";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
const session = require("koa-generic-session");
const views = require('koa-views');
const router = require('koa-router')();
var redisStore = require('koa-redis');
/**
 * server redux state, for isomorphism
 */
// import React from 'react';
// import {renderToString} from 'react-dom/server';
// import {Provider} from "redux";
// import {createMemoryHistory, match, RouterContext} from 'react-router';
// import createStore from '../reduc/create.js';
// import ApiClient from "../helpers/ApiClient";
// import getRoutes from "../routes";
// const HTML = (content, store) => (
//     <html>
//         <body>
//             <div id="content"></div>
//             <div id="devtools"></div>
//             <script src="/dest/bundle.js">
//         </body>
//     </html>
// )
// app.use(async (ctx, next) => {
//     const memoryHistory = createMemoryHistory(ctx.url);
//     const server = new ApiClient(ctx);
//     const store = createStore(server);
//     const 
// })
const app = new Koa();
mongoose.connect('mongodb://localhost/cms', function(err) {
	if (err) {
		console.log(err);
	}
	console.log('success');
})
// dictionary request automatically search
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Credentials", true)
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3001");
    ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
    ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    await next();
})
/**
 * set response header 
 * prevent attack
 */
app.use(convert(helmet()));
/**
 * parse data send from request to json 
 */
app.use(bodyParser());
/**
 * define the place of static resouces
 */
app.use(convert(serve(path.join(__dirname, '../build'))));

app.use(views(path.join(__dirname, "../views")), {
    extension: 'jade'
})
/**
 * set cookie session
 * cookie key == app.keys
 */
app.keys=['sessionid', 'csrf'];
app.use(convert(session({
    maxAge: 10000
})))
/**
 * router
 */
router.get('/', async(ctx, next) => {
    console.log(ctx.session)
    ctx.type = "text/html"; 
    await ctx.render('index.jade');
})
app.use(convert(router.routes()));
app.use(convert(rootRouter.adminRouter.routes()));
app.use(convert(rootRouter.userRouter.routes()));  
app.use(convert(rootRouter.carRouter.routes()));  
app.use(convert(rootRouter.carLogRouter.routes()));

app.listen(3001);







