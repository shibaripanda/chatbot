import { fix } from "../fix.js";
import { User } from "../models/user.js"

export class AppClass {

    constructor(app) {
      this.db = app;
    }

    async upDate(obj){
        console.log('updateData', this.db.app)
        await this.db.updateOne(obj)
    }

    async upDateUserImage(username, type, media){
        await User.findOneAndUpdate({usernameCurrent: username}, {photoForPresent: {type: type, media: media}, status: 'premium'})
    }

    async upDateUserName(username, name){
        await User.findOneAndUpdate({usernameCurrent: username}, {statusName: name})
    }

    async showRules(ctx){
        const mes = await ctx.telegram.sendMessage(ctx.message.chat.id, this.db.welcomeMessage, {parse_mode: 'HTML'}).catch(error => console.log(error))
        setTimeout(async () => {
            await ctx.telegram.deleteMessage(mes.chat.id, mes.message_id).catch(error => console.log(error))
        }, fix.timeToDeleteRules)
    }

}