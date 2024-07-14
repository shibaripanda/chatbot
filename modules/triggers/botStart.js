
export const botStart = async (bot, appContext) => {
    try{
        bot.start(async (ctx) => {
            await ctx.telegram.sendMessage(ctx.message.chat.id, appContext.app.db.instruct, {parse_mode: 'HTML'}).catch(error => console.log(error))
        })
    }
    catch(error){
        console.log(error)
    }
}
