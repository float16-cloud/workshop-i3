import { createAzure } from '@ai-sdk/azure';

export const azure =  createAzure({
  baseURL: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
  apiVersion: process.env.API_VERSION
})
