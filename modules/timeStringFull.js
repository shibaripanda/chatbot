

export const timeStringFull = async (time) => {
    try{
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
        }
        return time.toLocaleString('ru', options)
    }
    catch(error){
        console.log(error)
    }
}