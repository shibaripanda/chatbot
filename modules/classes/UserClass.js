import { fix } from "../fix.js";
import { User } from "../models/user.js";
import { timeStringFull } from "../timeStringFull.js";

export class UserClass {

    constructor(user) {
      this.db = user;
    }

    async addLove(ctx){
        const love = await User.findOneAndUpdate({usernameCurrent: ctx.message.text.split(' ')[1]}, {$addToSet: {love: this.db.id}})
        if(love){
            await ctx.telegram.sendMessage(-1001703165720, `У ${love.usernameCurrent} завелся воздыхатель или воздыхательница!`, {parse_mode: 'HTML'}).catch(error => console.log(error))
            await ctx.telegram.sendMessage(-1001703165720, `❤️‍🔥`, {parse_mode: 'HTML'}).catch(error => console.log(error))
            await ctx.reply(ctx.message.text.split(' ')[1] + ' ' + 'Готово!', {parse_mode: 'HTML'}).catch(error => console.log(error))
            if(this.db.love.includes(love.id)){
                setTimeout(async () => {
                    await ctx.telegram.sendMessage(-1001703165720, 'Некоторое время назад у нас появились любовнички!!!\n❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥', {parse_mode: 'HTML'}).catch(error => console.log(error))
                }, await getRandomIndex(100000, 1000000))
            }
        }
        else{
            await ctx.reply(ctx.message.text.split(' ')[1] + ' ' + 'возможно ошибка в имени', {parse_mode: 'HTML'}).catch(error => console.log(error))
        }
    }
    async upDate(obj){
        console.log('updateData', this.db.usernameCurrent)
        await this.db.updateOne(obj)
    }
    async in(){
        console.log('in', this.db.usernameCurrent)
        await this.db.updateOne({$addToSet: {time: {in: Date.now()}}})
    }
    async out(){
        console.log('out', this.db.usernameCurrent)
        await this.db.updateOne({$addToSet: {time: {out: Date.now()}}})
    }
    async incMessage(){
        console.log('message', this.db.usernameCurrent)
        await this.db.updateOne({$inc: {countMessagesInChat: 1}})
    }
    countDays() {
        return Math.round((Date.now() - new Date(this.db.createdAt).getTime())  /  86400000)
    }
    timeFromLastMessage(){
        return Date.now() - new Date(this.db.updatedAt).getTime()
    }
    name(){
        if(this.db.status == 'simple'){
            return fix.memberLevel.find(item => this.db.countMessagesInChat >= item.min && this.db.countMessagesInChat <= item.max).text
        }
        return this.db.statusName
    }
    async myInfo(){
        const info = `<b>${this.name()}</b>` + 
        `\n"${this.db.text}"` +
        `\n▫️▫️▫️▫️▫️▫️▫️` +
        `\n<b>🐼 Я с вами:</b> ${this.countDays()} дней` + 
        `\n<b>🐼 Первый:</b> ${await this.dateStart()}` + 
        `\n<b>🐼 Последний:</b> ${await this.dateLast()}` +
        `\n<b>❤️‍🔥 Поклонники:</b> ${this.db.love.length}` +
        `\n💬 ${this.db.countMessagesInChat} 🚪 ${this.db.time.length}`
        return info
    }
    async dateStart(){
        return await timeStringFull(this.db.createdAt)
    }
    async dateLast(){
        return await timeStringFull(this.db.updatedAt)
    }
    async messageInChat(ctx){
        const text = await this.myInfo()
        if(this.db.status == 'premium' && this.db.photoForPresent){
            const media = {...this.db.photoForPresent, caption: text, parse_mode: 'HTML'}
            const mes = await ctx.telegram.sendMediaGroup(ctx.message.chat.id, [media], {parse_mode: 'HTML'}).catch(error => console.log(error))
            setTimeout(async () => {
                for(let i of mes){
                    await ctx.telegram.deleteMessage(i.chat.id, i.message_id).catch(error => console.log(error))
                }
            }, fix.timeToDeleteInfo)
        }
        else{
            const mes = await ctx.telegram.sendMessage(ctx.message.chat.id, text, {parse_mode: 'HTML'}).catch(error => console.log(error))
            setTimeout(async () => {
                await ctx.telegram.deleteMessage(mes.chat.id, mes.message_id).catch(error => console.log(error))
            }, fix.timeToDeleteInfo)
        }
    }

}