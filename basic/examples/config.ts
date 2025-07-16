import { createAzure } from "@ai-sdk/azure";

export const azure =  createAzure({
  baseURL: process.env.AZURE_BASE_API,
  apiKey: process.env.AZURE_API_KEY,
  apiVersion: process.env.API_VERSION
})