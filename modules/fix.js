
export const fix = {
    commands: ['addHello'],
    startText: 'Лениво менять буквы',
    startStatusName: 'Сопля зелёная 🐸',
    startStatus: 'simple',
    appContextTimeInterval: 500000,
    timeToShowInfo: 500000,
    timeToDeleteInfo: 9500,
    timeToDeleteRules: 150000,
    timeToDeleteMedia: 5400000,
    memberLevel: [
        {text: 'Сопля зелёная 🐸', min: 0, max: 250},
        {text: 'Простолюдин 🐰', min: 251, max: 1000},
        {text: 'Cадомит 🧛', min: 1001, max: 2500},
        {text: 'Матерый извращуга 😈', min: 2501, max: 1000000}
    ],
    configLimitUse: async (appContext) => {
        return {
            window: 3000,
            limit: 3,
            onLimitExceeded: async (ctx, next) => {
                if(typeof ctx['message'] == "undefined"){
                    ctx.answerCbQuery(appContext.text.takeTime[ctx.from.language_code], {show_alert: true})
                }
                else if(typeof ctx['message'] !== "undefined"){
                    await fix.deleteMessageFromUser(ctx, 'configLimitUse')
                }
            }
        }
    }
}