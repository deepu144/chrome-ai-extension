console.log("LeetCode AI Translator content script loaded.");

(function () {
    'use strict';
    function createTranslationPanel(){
        let panel = document.getElementById('translation-panel');
        if (!panel){
            panel = document.createElement('div');
            panel.id = 'translation-panel';
            panel.style.position = 'fixed';
            panel.style.top = '10px';
            panel.style.right = '10px';
            panel.style.width = '500px';
            panel.style.height = '650px';
            panel.style.background = '#1E1E2E';
            panel.style.borderRadius = '12px';
            panel.style.padding = '20px';
            panel.style.zIndex = '10000';
            panel.style.display = 'flex';
            panel.style.flexDirection = 'column';
            panel.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
            panel.style.color = '#FFFFFF';
            panel.style.fontFamily = 'Arial, sans-serif';

            const closeButton = document.createElement('button');
            closeButton.innerText = '✖';
            closeButton.style.alignSelf = 'flex-end';
            closeButton.style.cursor = 'pointer';
            closeButton.style.border = 'none';
            closeButton.style.background = 'transparent';
            closeButton.style.fontSize = '20px';
            closeButton.style.color = '#FF5C5C';
            closeButton.addEventListener('click', () => panel.remove());
            panel.appendChild(closeButton);

            const title = document.createElement('h2');
            title.innerText = '🔍 Code Translator';
            title.style.margin = '0 0 20px';
            title.style.color = '#FFD700';
            title.style.textAlign = 'center';
            panel.appendChild(title);

            const textArea = document.createElement('textarea');
            textArea.id = 'code-input';
            textArea.placeholder = '🚀 Paste your code here...';
            textArea.style.width = '100%';
            textArea.style.height = '180px';
            textArea.style.borderRadius = '8px';
            textArea.style.padding = '10px';
            textArea.style.marginBottom = '20px';
            textArea.style.background = '#2E2E3E';
            textArea.style.color = '#FFFFFF';
            textArea.style.fontSize = '14px';
            panel.appendChild(textArea);

            const languageDropdown = document.createElement('select');
            languageDropdown.id = 'target-language';
            languageDropdown.style.padding = '10px';
            languageDropdown.style.borderRadius = '8px';
            languageDropdown.style.background = '#2E2E3E';
            languageDropdown.style.color = '#FFFFFF';
            languageDropdown.style.marginBottom = '20px';
            ['Select Language', 'Java', 'Python', 'C++', 'JavaScript'].forEach(lang => {
                const option = document.createElement('option');
                option.value = lang;
                option.textContent = lang;
                languageDropdown.appendChild(option);
            });
            panel.appendChild(languageDropdown);

            const translateButton = document.createElement('button');
            translateButton.innerText = '✨ Translate';
            translateButton.style.marginTop = '10px';
            translateButton.style.padding = '12px';
            translateButton.style.background = 'linear-gradient(45deg, #6A5ACD, #4CAF50)';
            translateButton.style.color = 'white';
            translateButton.style.border = 'none';
            translateButton.style.borderRadius = '8px';
            translateButton.style.cursor = 'pointer';
            translateButton.style.fontWeight = 'bold';
            translateButton.addEventListener('click', translateCode);
            panel.appendChild(translateButton);

            const outputDiv = document.createElement('pre');
            outputDiv.id = 'translated-output';
            outputDiv.style.marginTop = '20px';
            outputDiv.style.borderRadius = '8px';
            outputDiv.style.padding = '15px';
            outputDiv.style.height = '200px';
            outputDiv.style.overflowY = 'auto';
            outputDiv.style.background = '#282A36';
            outputDiv.style.color = '#00FF7F';
            outputDiv.style.fontSize = '14px';
            outputDiv.style.whiteSpace = 'pre-wrap';
            outputDiv.innerText = '🚧 Translation will appear here...';
            panel.appendChild(outputDiv);

            const copyButton = document.createElement('button');
            copyButton.innerText = '📋 Copy to Clipboard';
            copyButton.id = 'copy-button';
            copyButton.style.marginTop = '10px';
            copyButton.style.padding = '10px';
            copyButton.style.background = '#4CAF50';
            copyButton.style.color = 'white';
            copyButton.style.border = 'none';
            copyButton.style.borderRadius = '8px';
            copyButton.style.cursor = 'pointer';
            copyButton.style.display = 'none';
            copyButton.addEventListener('click', copyToClipboard);
            panel.appendChild(copyButton);

            document.body.appendChild(panel);
        }
    }

    async function translateCode(){
        const code = document.getElementById('code-input').value.trim();
        const targetLanguage = document.getElementById('target-language').value;
        const outputDiv = document.getElementById('translated-output');
        const copyButton = document.getElementById('copy-button');

        if (!code) {
            alert('🚨 Please paste some code to translate.');
            return;
        }
        if (targetLanguage === 'Select Language'){
            alert('🌐 Please select a target language.');
            return;
        }
        const apiKey = 'AIzaSyC7HWz7CCVw27gt-alPdOVZkmhoMscJrAM';
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        try {
            outputDiv.innerText = '🔄 Translating... Please wait.';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: `Translate the following code to ${targetLanguage}:\n\n${code}` },
                                { text: 'Provide only the code. Do not include explanations, comments, or code blocks (e.g., ```).'  }
                            ]
                        }
                    ]
                })
            });

            const data = await response.json();
            if (data && data.candidates && data.candidates.length > 0) {
                let translatedCode = data.candidates[0].content.parts[0].text;
                translatedCode = translatedCode.replace(/```[a-zA-Z]*\n?/g, '').replace(/```\s*$/, '');

                outputDiv.innerText = translatedCode;
                copyButton.style.display = 'block';
            } else {
                outputDiv.innerText = '❌ Translation failed. Please try again.';
            }
        } catch (error) {
            console.error('Error:', error);
            outputDiv.innerText = '🚫 Error occurred while translating.';
        }
    }

    function copyToClipboard() {
        const outputDiv = document.getElementById('translated-output');
        navigator.clipboard.writeText(outputDiv.innerText).then(() => {
            alert('✅ Code copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('❌ Failed to copy code.');
        });
    }

    function addTranslateButton() {
        const button = document.createElement('button');
        button.innerText = '🌐 Translate Code';
        button.style.position = 'fixed';
        button.style.top = '7px';
        button.style.right = '484px';
        button.style.zIndex = '9999';
        button.style.padding = '6px 8px';
        button.style.background = '#222222';
        button.style.color = '#28C244';
        button.style.border = 'none';
        button.style.borderRadius = '8px';
        button.style.cursor = 'pointer';
        button.style.fontWeight = 'bold'
        button.addEventListener('mouseover', () => {
            button.style.background = '#333333'; 
        });
        button.addEventListener('mouseout', () => {
            button.style.background = '#222222'; 
        });
        button.addEventListener('click', createTranslationPanel);
        document.body.appendChild(button);
    }

    function init(){
        addTranslateButton();
    }

    window.addEventListener('load', init);
})();

function createTutorialPanel(){
    let tutorialPanel = document.getElementById('tutorial-panel');

    if (!tutorialPanel) {
        tutorialPanel = document.createElement('div');
        tutorialPanel.id = 'tutorial-panel';
        tutorialPanel.style.position = 'fixed';
        tutorialPanel.style.top = '10px';
        tutorialPanel.style.right = '520px';
        tutorialPanel.style.width = '500px';
        tutorialPanel.style.height = '400px';
        tutorialPanel.style.background = '#1E1E2E';
        tutorialPanel.style.borderRadius = '12px';
        tutorialPanel.style.padding = '20px';
        tutorialPanel.style.zIndex = '10000';
        tutorialPanel.style.display = 'flex';
        tutorialPanel.style.flexDirection = 'column';
        tutorialPanel.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
        tutorialPanel.style.color = '#FFFFFF';
        tutorialPanel.style.overflowY = 'auto';
        tutorialPanel.style.fontFamily = 'Arial, sans-serif';

        const closeButton = document.createElement('button');
        closeButton.innerText = '✖';
        closeButton.style.alignSelf = 'flex-end';
        closeButton.style.cursor = 'pointer';
        closeButton.style.border = 'none';
        closeButton.style.background = 'transparent';
        closeButton.style.fontSize = '20px';
        closeButton.style.color = '#FF5C5C';
        closeButton.addEventListener('click', () => tutorialPanel.remove());
        tutorialPanel.appendChild(closeButton);

        const title = document.createElement('h2');
        title.innerText = '📚 Problem Tutorials';
        title.style.margin = '0 0 20px';
        title.style.color = '#FFD700';
        title.style.textAlign = 'center';
        tutorialPanel.appendChild(title);

        const tutorialLinks = document.createElement('div');
        tutorialLinks.id = 'tutorial-links';
        tutorialLinks.innerText = '🔍 Fetching tutorials...';
        tutorialLinks.style.marginTop = '10px';
        tutorialLinks.style.padding = '10px';
        tutorialLinks.style.borderRadius = '8px';
        tutorialLinks.style.background = '#282A36';
        tutorialLinks.style.color = '#00FF7F';
        tutorialLinks.style.overflowY = 'auto';
        tutorialLinks.style.height = '80%';
        tutorialPanel.appendChild(tutorialLinks);
        document.body.appendChild(tutorialPanel);
        fetchTutorials();
    }
}

function getProblemName() {
    const url = window.location.href;
    const match = url.match(/\/problems\/([^\/]+)/);
    return match ? match[1].replace(/-/g, ' ') : null;
}

async function fetchTutorials() {
    const problemName = getProblemName();
    const tutorialLinks = document.getElementById('tutorial-links');

    if (!problemName) {
        tutorialLinks.innerText = '❌ Unable to extract problem name.';
        return;
    }

    try {
        const apiKey = 'AIzaSyC7HWz7CCVw27gt-alPdOVZkmhoMscJrAM';
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: `Give me 5 YouTube links for the LeetCode problem "${problemName}". Only provide links with short titles.` },
                            {text : `don't give any description. give only title with link only like key value pair. give youtube link only don't give actuall problem leetcode link`}
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        if (data && data.candidates && data.candidates.length > 0) {
            const tutorials = data.candidates[0].content.parts[0].text.split('\n');
            tutorialLinks.innerHTML = '';

            tutorials.forEach(link => {
                if (link.trim()) {
                    try {
                        console.log(link);
                        
                        const urlMatch = link.match(/\((https?:\/\/[^\s)]+)\)/);
            
                        if (urlMatch && urlMatch[1]) {
                            const validURL = new URL(urlMatch[1].trim());
            
                            const tutorialLink = document.createElement('a');
                            tutorialLink.href = validURL.href;
                            tutorialLink.target = '_blank';
                            tutorialLink.style.display = 'block';
                            tutorialLink.style.color = '#4CAF50';
                            tutorialLink.style.marginBottom = '10px';
                            tutorialLink.style.textDecoration = 'underline';
                            tutorialLink.innerText = validURL.href;
            
                            tutorialLinks.appendChild(tutorialLink);
                        } else {
                            console.error("No valid URL found in:", link);
                        }
                    } catch (error) {
                        console.error("Invalid URL:", link, error);
                    }
                }
            });
            
            
        } else {
            tutorialLinks.innerText = '❌ No tutorials found.';
        }
    } catch (error) {
        console.error('Error fetching tutorials:', error);
        tutorialLinks.innerText = '🚫 Error occurred while fetching tutorials.';
    }
}

function addTutorialButton() {
    const tutorialButton = document.createElement('button');
    tutorialButton.innerText = '📘 Tutorials';
    tutorialButton.style.position = 'fixed';
    tutorialButton.style.top = '9px';
    tutorialButton.style.right = '1150px';
    tutorialButton.style.zIndex = '9999';
    tutorialButton.style.padding = '6px 8px';
    tutorialButton.style.background = '#2F2F2F';
    tutorialButton.style.color = '#F39F16';
    tutorialButton.style.border = 'none';
    tutorialButton.style.borderRadius = '8px';
    tutorialButton.style.cursor = 'pointer';
    tutorialButton.style.fontWeight = 'bold';
    tutorialButton.addEventListener('click', createTutorialPanel);
    document.body.appendChild(tutorialButton);
}

function initTutorialFeature() {
    addTutorialButton();
}

window.addEventListener('load', initTutorialFeature);