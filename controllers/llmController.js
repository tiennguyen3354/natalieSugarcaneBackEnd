import Groq from 'groq-sdk'; 
   
export const getChatResponse = async (req, res) => { 

    // Groq SDK setup
    const groq = new Groq({ apiKey: "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" }); 
    try {
        const { userMessage } = req.body;
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: "user", content: userMessage }],
          model: "llama3-8b-8192",
        });
        res.json({ reply: chatCompletion.choices[0]?.message?.content || "" });
      } catch (error) {
        console.error("Error with Groq API:", error);
        res.status(500).json({ error: "Failed to generate a response." });
      }
}