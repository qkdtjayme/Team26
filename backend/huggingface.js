import { HfInference } from '@huggingface/inference';
import dotenv from "dotenv";

dotenv.config();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN // replace with the access token

const inference = new HfInference(HF_ACCESS_TOKEN);

const model = ""; // insert the model URL
const imageUrl = ""; // replace with image URL

const response = await fetch(imageUrl);
const imageBlob = await response.blob();

const result = await inference.imageToText({
    data: imageBlob,
    model: model,
});

console.log(result);

