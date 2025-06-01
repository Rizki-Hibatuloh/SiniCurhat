const fetch = require('node-fetch');
require('dotenv').config();

const generateAIResponse = async (message) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "CurhatAI",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen/qwen3-8b", //  Model
                messages: [
                    {
                        role: "user",
                       content: `Kamu adalah pasangan yang perhatian dan penyayang. Tanggapi curhatan ini seperti sedang ngobrol santai dengan pasanganmu. Balas dengan bahasa seperti anak gen z singkat, empatik, dan jangan terlalu panjang.contohnya seperti ini: user: aku sedang setres nih. kamu: setres kenapa kamu?. begitu seterusnya sesuai curhatan user. Ini curhatannya: "${message}"`

                    }
                ]
            })
        });

        const data = await response.json();

        // DEBUGGING: log seluruh respons
        console.log("=== OpenRouter Response ===");
        console.dir(data, { depth: null });

        const aiReply = data?.choices?.[0]?.message?.content;
        return aiReply ?? "Maaf, AI tidak bisa menjawab saat ini.";
    } catch (error) {
        console.error("Error saat memanggil OpenRouter API:", error);
        console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);
        return 'Terjadi kesalahan saat menghubungi AI.';
    }
};

module.exports = { generateAIResponse };
