
export const getRandomIndex = async (min, max, exp) => {
    try{
        let rand
        exp = Array.isArray(exp) ? exp : [(isNaN(exp) ? min-1 : exp)]
        while(true){
            rand = Math.floor(Math.random() * (max - min + 1)) + min
            if(exp.indexOf(rand) < 0)
                return rand
        }  
    }
    catch(error){
        console.log(error)
    }  
}