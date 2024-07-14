import { User } from "../models/user.js"

const premiumUsers = [
    {a: 'room700', b: `<b>Панда</b> 🐼`},
    {a: 'marta_2022', b: '<b>Тигра</b> 🐯'},
    {a: 'JuzWerdi', b: '<b>Пьяница-музыкант</b>'},
    {a: 'Edem_1001', b: '<b>Весёлый Опоссум</b>'},
    {a: 'SkritGroteks', b: '<b>На абордаж!</b>'},
    {a: 'crying_jester', b: '<b>Арлекин!</b>'},
    {a: 'Amykan', b: '<b>Добрый мишутка</b>'},
    {a: 'paul_MPA', b: '<b>Сладкая булка</b>'},
    {a: 'Feriatos', b: '<b>Мармеладова</b>'},
    {a: 'Tom_Yans', b: '<b>Кот в шляпе</b>'},
    {a: 'Lilo1234556', b: '<b>Пирошочик</b>'},
    {a: 'ABitOfRabbit', b: '<b>Кроля ш...</b>'},
    {a: 'StarSky_kitsune', b: '<b>Слоня</b>'}
]



export const firstStartForNewBot = async () => {

    const obj = {_id: 1, id: 1, usernameCurrent: 1, countMessagesInChat: 1, text: 1, photoForPresent: 1, time: 1, createdAt: 1, updatedAt: 1, statusName: 1, status: 1}
    for(let i of premiumUsers){
        let user = await User.findOne({usernameCurrent: i.a}, obj)
        user.status = 'premium'
        user.statusName = i.b
        await user.save()
    }
    
}