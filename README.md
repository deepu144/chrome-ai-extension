# 📘 LeetCode AI Translator

A Chrome extension that translates LeetCode code snippets into various programming languages and fetches YouTube tutorials using the **Gemini AI** API. It enhances your coding workflow by providing instant translations and tutorial links directly on the LeetCode problem page.

## 🚀 Features

### ✅ Code Translator
- Translate code snippets to multiple programming languages, including:
  - Java
  - Python
  - C++
  - JavaScript
- Seamless integration with LeetCode.
- Copy translated code to the clipboard with a single click.

### 📚 Problem Tutorials
- Fetches **YouTube tutorial links** for the current LeetCode problem.
- Provides up to **5 tutorials** with direct clickable links.
- Automatically identifies the problem name from the URL.

## 🛠️ Installation

1. Clone the repository or download the ZIP:

    ```bash
    git clone https://github.com/yourusername/leetcode-ai-translator.git
    ```

2. Open **Google Chrome** and navigate to:

    ```
    chrome://extensions/
    ```

3. Enable **Developer Mode** (top-right corner).

4. Click **Load unpacked** and select the cloned repository folder.

5. The extension is now added to your browser.

## 📋 Usage

1. Go to any LeetCode problem (e.g., [LeetCode Problems](https://leetcode.com/problems/)).

2. **Translate Code:**
   - Click the "🌐 Translate Code" button on the top-right.
   - Enter your code and choose the target language.
   - Click **Translate** to get the translated code.
   - Use **Copy to Clipboard** to copy the output.

3. **Fetch Tutorials:**
   - Click the "📘 Tutorials" button.
   - View and access up to **5 YouTube tutorials** related to the current problem.

## 📑 File Structure

```
.
├── background.js        # Handles background message passing
├── content.js          # Core logic for translation and tutorials
├── manifest.json       # Chrome extension configuration
├── icons/              # Extension icons
└── README.md           # Project documentation
```

## 🔐 API Key Configuration

The extension uses the **Gemini AI** API for translation and fetching tutorials. Ensure that the API key is correctly set in `content.js` and `background.js`.

```javascript
const apiKey = "YOUR_API_KEY_HERE";
```

> **Note:** Replace `YOUR_API_KEY_HERE` with a valid Gemini AI API key.

## 🧪 Development

1. Make your changes to the code.
2. Reload the extension from `chrome://extensions/`.
3. Test features on LeetCode problems.

## 🐛 Troubleshooting

- Ensure your API key is valid and has appropriate access.
- Verify the extension is loaded with **Developer Mode** enabled.
- Check the **Console** (Press `Ctrl + Shift + J`) for errors.

## 📄 License

This project is licensed under the **MIT License**. Feel free to use and modify it as needed.

## 📧 Contact

For issues and suggestions, open an issue on the [GitHub repository](https://github.com/yourusername/leetcode-ai-translator).

