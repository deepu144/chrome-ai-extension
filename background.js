const apiKey = "AIzaSyC7HWz7CCVw27gt-alPdOVZkmhoMscJrAM";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

// Listen for messages from content.js
chrome.runtime.onMessage.addListener(async (message, sender) => {
    if (message.action === "translate") {
        console.log("Translation requested for:", message.targetLanguage);
        const translation = await translateCode(message.code, message.targetLanguage);

        // Send translated code back to content.js
        chrome.tabs.sendMessage(sender.tab.id, {
            action: "showTranslation",
            translation: translation,
        });
    }
});

// Call Gemini API to translate code
async function translateCode(code, targetLanguage) {
    try {
        const payload = {
            contents: [
                {
                    parts: [
                        {
                            text: `Translate the following code to ${targetLanguage}:\n\n${code}`,
                        },
                    ],
                },
            ],
        };

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data && data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "Translation failed or no response from the Gemini API.";
        }
    } catch (error) {
        console.error("Error during translation:", error);
        return "Error occurred while translating.";
    }
}
