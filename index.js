import 'dotenv/config'
import { Telegraf, Markup } from 'telegraf'
import { db } from './modules/db/db.js'
import { botStart } from './modules/triggers/botStart.js'
import { botMessage } from './modules/triggers/botMessage.js'
import { botChatMember } from './modules/triggers/botChatMember.js'
import { botCommands } from './modules/triggers/botCommands.js'
import { fix } from './modules/fix.js'
import { updateAppContext } from './modules/updateAppContext.js'
// import { firstStartForNewBot } from './modules/helpers/firstStartForNewBot.js'

async function startChatBot(){
    try{
        const option = {allowedUpdates: ['chat_member', 'callback_query', 'message', 'channel_post'], dropPendingUpdates: true}
        var status = await db()
        if(status){
            // await firstStartForNewBot()

            let appContext = {}
            appContext = await updateAppContext(appContext)
            setInterval(async () => {
                appContext = await updateAppContext(appContext)
            }, fix.appContextTimeInterval)

            const bot = new Telegraf(process.env.BOT_TOKEN)

            await botStart(bot, appContext)
            await botChatMember(bot, appContext)
            // await botCommands(bot, appContext)
            await botMessage(bot, appContext)
            // await botCallback(bot, appContext)

            bot.launch(option)
            process.once('SIGINT', () => bot.stop('SIGINT'))
            process.once('SIGTERM', () => bot.stop('SIGTERM')) 
        }
        else{
            console.log('Хер там... База не подключается...')
        }
    }
    catch(error){
        console.log('Ошибка запуска бота...')
        console.log(error)
    }
}

startChatBot()