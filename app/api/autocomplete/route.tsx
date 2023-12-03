import { OpenAIStream, StreamingTextResponse } from "ai";
import { OpenAI } from "langchain/llms/openai";

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

const USE_GPT4_TURBO = false;
const DEV_MODE = false;

const test = "this is a test response of a sentance";

export async function POST(req: Request): Promise<Response> {
  // Check if the OPENAI_API_KEY is set, if not return 400
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return new Response(
      "Missing OPENAI_API_KEY – make sure to add it to your .env file.",
      {
        status: 400,
      }
    );
  }

  let { content, context, style } = await req.json();

  console.log("inside api content, context, style: ", content, context, style);

  const MODEL = "gpt-3.5-turbo-1106";

  const llmWriter = new OpenAI({
    modelName: MODEL,
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
    maxTokens: -1,
  });

  const postGenPrompt =
    `You are an expert writing assistant that continues existing text based on context from prior text. ` +
    `Give more weight/priority to the later characters than the beginning ones. ` +
    `Limit your response to only one complete sentence.` +
    `${style ? `Follow this style instructions: ${style}` : ""}` +
    `${context ? `Write the new sentence in this context: ${context}` : ""}` +
    `${content ? `Complete the last sentence: ${content}` : ""}`;

  console.log("postGenPrompt: ", postGenPrompt);

  let res = test;
  if (!DEV_MODE) {
    res = await llmWriter.call(postGenPrompt);
  }
  console.log("res in /api/write/generate! res: ", res);

  return new Response(JSON.stringify({ result: res }), {
    headers: { "Content-Type": "application/json" },
  });
}
