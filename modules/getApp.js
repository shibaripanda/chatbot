import { AppClass } from "./classes/AppClass.js"
import { App } from "./models/app.js"


export const getApp = async () => {
    try{
        let app = await App.findOneAndUpdate({app: 'app'}, {}, {upsert: true, returnDocument: 'after'})
        // console.log(app)
        return new AppClass(app)
    }
    catch(error){
        console.log(error)
    }
}