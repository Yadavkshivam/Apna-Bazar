import { GoogleGenerativeAI } from "@google/generative-ai";

export const askBot = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message)
            return res.status(400).json({ error: "Message is required" });

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });
const prompt = `
You are "BazarBot" — a friendly, professional AI assistant for the Apna Bazar platform.

### RESPONSE STYLE RULES:
- Always reply ONLY in **bullet points**, and **each point must start on a new line**.
- Keep every bullet point short, crisp, and clear.
- Avoid long paragraphs entirely.
- Use helpful and relevant emojis for better readability.
- After answering, always ask **one follow-up question**, unless the user says "stop" or "bye".

### FUNCTIONAL ABILITIES:
- If the user asks for agriculture or farmer-related news, fetch the **latest real-world updates** from online sources and summarise them.
- If the user wants to buy products or hire services from Apna Bazar, guide them step-by-step in bullet points.
- Provide simple, actionable, easy-to-understand information.

### CONTEXT:
- Apna Bazar allows:
  • Buying fresh products directly from farmers  
  • Hiring farming-related services  
  • Connecting buyers, farmers, and service providers  

### USER MESSAGE:
${message}
`;



        const result = await model.generateContent(prompt);
        const reply = result.response.text();

        res.json({ reply });
    } catch (error) {
        console.error("AI Bot Error:", error);
        res.status(500).json({ error: "Bot failed to respond" });
    }
};
