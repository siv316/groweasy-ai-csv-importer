const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function parseCRM(records) {
  const prompt = `
You are a CRM data extraction assistant.

Convert the following CSV records into GrowEasy CRM format.

Extract these fields:
created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description

Rules:
- Skip records without email and mobile.
- crm_status must be one of:
GOOD_LEAD_FOLLOW_UP
DID_NOT_CONNECT
BAD_LEAD
SALE_DONE
- Return ONLY valid JSON.
- Do not include markdown.

CSV Records:
${JSON.stringify(records)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = { parseCRM };