const Koa = require('koa')
const koans = new Koa()

koans.use(async (ctx,next)=>{
    if(ctx.request.path==='/'){
        ctx.response.body = 'hello word'
    }
})
koans.listen(3001)






