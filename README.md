# 🤖 Cluvera – Ethical CP Hint Assistant (Chrome Extension)

Cluvera is a Chrome extension designed to help you approach competitive programming problems ethically and effectively. It gives you AI-powered hints without revealing full solutions and disables itself automatically during live contests to maintain fair play.

---
## 🔥 **NEW: Firefox Support Added!**

Cluvera now works on **both Chrome and Firefox**! The extension automatically detects your browser and uses the appropriate APIs.

## ✨ Features

- Extracts problem statements from **LeetCode** and **Codeforces**
- Uses **Groq API** to suggest:
  - Key DSA concepts
  - Problem-solving strategy
  - Algorithm to apply
  - Time and space complexity
  - Edge cases to consider
- Auto-disabled during live contests
- Never shows full solutions unless user explicitly requests
- Ethical, learning-focused assistant for CP learners

### Browser Compatibility:
- ✅ **Chrome(and other chromium based browser)** (Manifest v2 & v3 compatible)
- ✅ **Firefox** (Full support with cross-browser API detection)
- ✅ **Same codebase** for both browsers


---

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript
- WebExtensions API (Chrome & Firefox)
- Groq API (requires your API key)

---
## 🧑‍💻 How to Install

1. **Download or Clone the Repository**  
   ```bash
   git clone https://github.com/Dharun-2k7/Cluvera.git
   ```  
   Or download the ZIP and extract it.

2. **For Chrome**  
   - Go to: `chrome://extensions/`
   - Enable **Developer Mode** (toggle the switch in the top-right corner)
   - Click **"Load unpacked"**
   - Select the folder where the extension files are located.  
     ⚠️ **Important:** Make sure you're selecting the folder that directly contains `manifest.json`  
     - ✅ Example: `Cluvera/`  
     - ❌ Don’t select: `Cluvera/Cluvera/`

3. **For Firefox**  
   - Go to: `about:debugging`
   - Click **"This Firefox"**
   - Click **"Load Temporary Add-on"**
   - Select the `manifest.json` file inside the extension folder.  
   - ⚠️ **Note:** You’ll need to repeat this process **every time you restart Firefox** (will try to solve this in a future version).


4. **Add Your Groq API Key**  
   - After loading the extension, paste your API key in the input box and click **"Save"**.
   - 🔒 Your key is stored locally and never shared.

5. **Done!**  
   - Open **LeetCode** or **Codeforces**
   - Click the **Cluvera** icon in the toolbar
   - Get structured, ethical AI-powered hints 🚀
---

## 📂 Folder Structure

```
cluvera-extension/
├── icons/
│   └── icon.png
├── manifest.json
├── popup.html
├── popup.js
├── popup.css
├── content.js
├── background.js
└── README.md
```

---
🆕**Updates Made**
- Added functionality for GeeksforGeeks
- Added functionality for Hackerrank
- Cross browser

## 🔐 Ethics First

Cluvera promotes **fair learning** by:
- Working only on **practice problems**
- **Disabling itself during live contests**
- Avoiding full solution leaks unless asked explicitly

This ensures users develop real skills without relying on shortcuts.

---

## 🧠 Future Plans

- Add AtCoder support
- Optional dark mode for popup
- GPT/Gemini switch toggle
- Store History 

---

## 👨‍💻 Author

Built with 💻 and 📚 by **Dharun Kaarthick**  
- [GitHub – Dharun-2k7](https://github.com/Dharun-2k7)  
- [LinkedIn – Dharun Kaarthick](https://linkedin.com/in/dharun-kaarthick)

---

## 📝 License

This project is licensed under the MIT License.  
See `LICENSE` file for details.

