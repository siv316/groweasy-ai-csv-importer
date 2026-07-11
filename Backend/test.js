const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

async function main() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say Hello",
    });

    console.log(response.text);
  } catch (err) {
    console.error(err);
  }
}

main();