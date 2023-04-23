import type { NextApiRequest, NextApiResponse } from 'next'
import { 
  OpenAIApi,
  Configuration, 
  CreateCompletionResponseChoicesInner,
} from 'openai';
import { getPrompt } from '../../prompt';

type Data = {
  prompt: string,
  sway: string,
  // baseCompletion: any,
}
type Error = {
  error: string,
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const prompt = getPrompt(req.body.userInput);
  // Run first prompt
  console.info(`Prompt sending to the OpenAI API: ${prompt}\n`)

  try {
    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 2048,
    });
    
    const basePromptOutput = baseCompletion.data.choices.pop();
    console.log(basePromptOutput);

    const sway = basePromptOutput!.text!;

    console.log(sway);
  
    console.info(`Prompt output from the OpenAI API: ${basePromptOutput}`)

    res.status(200).json({ prompt, sway });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.toString() })
  }
};

export default handler;
