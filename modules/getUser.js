import { UserClass } from "./classes/UserClass.js"
import { fix } from "./fix.js"
import { User } from "./models/user.js"


export const getUser = async (ctx, appContext) => {
    try{
        // console.log(await User.countDocuments())
        const obj = {_id: 1, id: 1, usernameCurrent: 1, countMessagesInChat: 1, love: 1, text: 1, photoForPresent: 1, time: 1, createdAt: 1, updatedAt: 1, statusName: 1, status: 1}
        let user = await User.findOne({id: ctx.from.id}, obj)
        if(!user){
             user = await User({
                id: ctx.from.id,
                usernameCurrent: ctx.from.username ? ctx.from.username : 'noname',
                countMessagesInChat: 0,
                text: fix.startText,
                statusName: fix.startStatusName,
                status: fix.startStatus,
                time: [{in: Date.now()}],
            })
            await user.save()
        }
        else{
            let check = false
            if(user.usernameCurrent !== ctx.from.username){
                user.usernameCurrent = ctx.from.username
                check = true
            }
            if(!user.status){
                user.status = fix.startStatus
                check = true
            }
            if(!user.text){
                user.text = fix.startText
                check = true
            }
            if(!user.time || user.time.length == 0){
                user.time = [{in: Date.now()}]
                check = true
            }
            if(check) user = await user.save()
        }
        // console.log(user)
        return new UserClass(user)
    }
    catch(error){
        console.log(error)
    }
}