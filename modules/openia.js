import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

export const funcGpt = function(contentText) {

  return new Promise((resolve, reject) => {

    const response = openai.chat.completions.create({
      messages: [{ role: 'user', content: contentText }],
      model: 'gpt-3.5-turbo'
    })
    resolve(response)
  })
} 
