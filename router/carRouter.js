const router = require('koa-router')();
router.get('/carMan/carLog', async(ctx, next) => {
    ctx.type = "text/html";
    await ctx.render('index.jade');
})
export default router;