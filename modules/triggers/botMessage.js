import { fix } from "../fix.js"
import { getRandomIndex } from "../getRandomIndex.js"
import { getUser } from "../getUser.js"
import { funcGpt } from "../openia.js"

export const botMessage = async (bot, appContext) => {
    try{
        bot.on('message', async (ctx) => {

            const userRole = () => {
                if(appContext.app.db.superAdmin == ctx.from.id) return true
                else return false
            }

            // console.log(ctx)

            const user = await getUser(ctx, appContext)
            // console.log(user)

            await user.incMessage().catch(error => console.log(error))

            if(typeof ctx.message['text'] !== "undefined"){
                if(userRole() && ctx.message.text.includes('set', 0)){
                    const data = ctx.message.text.split(' ')
                    if(data[0] == 'set' && data[1] == 'name' && data.length == 4){
                        await appContext.app.upDateUserName(data[2], data[3])
                    }
                }
                else if(userRole() && ctx.message.text.includes('welcome', 0)){
                    await appContext.app.upDate({welcomeMessage: ctx.message.text.substring(8, ctx.message.text.length)})
                }
                else if(userRole() && ctx.message.text.includes('buy', 0)){
                    await appContext.app.upDate({buyMessage: ctx.message.text.substring(4, ctx.message.text.length)})
                }
                else if(userRole() && ctx.message.text.includes('inst', 0)){
                    await appContext.app.upDate({instruct: ctx.message.text.substring(5, ctx.message.text.length)})
                }
                else{
                    if(ctx.message.text == 'rules'){
                        await appContext.app.showRules(ctx)
                    }
                    else if(ctx.message.text.includes('text', 0)){
                        await user.upDate({text: ctx.message.text.substring(5, ctx.message.text.length)})
                    }
                    else if(user.timeFromLastMessage() > fix.timeToShowInfo || ctx.message.text == 'myinfo'){
                        await user.messageInChat(ctx)
                    }
                    else{
                        if(await getRandomIndex(0, 20) == 15){
                            const text = (await funcGpt(ctx.message.text + ' до 150 знаков')).choices[0].message.content
                            await ctx.reply(text, {parse_mode: 'HTML', reply_to_message_id: ctx.message.message_id}).catch(error => console.log(error))
                        }
                    }
                }
                console.log('text')
            }
            else if(typeof ctx.message['photo'] !== "undefined" ){
                if(userRole() && typeof ctx.message['caption'] !== "undefined" && ctx.message.caption.includes('set', 0)){
                    const data = ctx.message.caption.split(' ')
                    if(data[0] == 'set' && data[1] == 'image' && data.length == 3){
                        await appContext.app.upDateUserImage(data[2], 'photo', ctx.message.photo[0].file_id)
                    }
                }
                else{
                    setTimeout(async () => {
                        await ctx.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id).catch(error => console.log(error))
                    }, fix.timeToDeleteMedia)
                }
                console.log('photo')
            }
            else if(typeof ctx.message['video'] !== "undefined"){
                if(userRole() && typeof ctx.message['caption'] !== "undefined" && ctx.message.caption.includes('set', 0)){
                    const data = ctx.message.caption.split(' ')
                    console.log(ctx.message.video)
                    if(data[0] == 'set' && data[1] == 'image' && data.length == 3){
                        await appContext.app.upDateUserImage(data[2], 'video', ctx.message.video.file_id)
                    }
                }
                else{
                    setTimeout(async () => {
                        await ctx.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id).catch(error => console.log(error))
                    }, fix.timeToDeleteMedia)
                }
                console.log('video')
            }
            else if(typeof ctx.message['location'] !== "undefined"){
                console.log('location')
            }
            else if(typeof ctx.message['sticker'] !== "undefined"){
                console.log('sticker')
            }
        })
    }
    catch(error){
        console.log(error)
    }
}
