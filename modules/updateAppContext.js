import { getApp } from "./getApp.js"


export const updateAppContext = async (appContext) => {
    try{
        appContext.app = await getApp()
        
        return appContext
    }
    catch(error){
        console.log(error)
    }
}