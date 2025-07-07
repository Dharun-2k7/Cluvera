# 🤖 Cluvera – Ethical CP Hint Assistant (Chrome Extension)

Cluvera is a Chrome extension designed to help you approach competitive programming problems ethically and effectively. It gives you AI-powered hints without revealing full solutions and disables itself automatically during live contests to maintain fair play.

---

## ✨ Features

- Extracts problem statements from **LeetCode** and **Codeforces**
- Uses **Gemini AI** to suggest:
  - Key DSA concepts
  - Problem-solving strategy
  - Algorithm to apply
  - Time and space complexity
  - Edge cases to consider
- Auto-disabled during live contests
- Never shows full solutions unless user explicitly requests
- Ethical, learning-focused assistant for CP learners

---

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript
- Chrome Extensions API
- Gemini API (requires your API key)

---

## 🧑‍💻 How to Install

1. **Download or Clone the Repository**
   ```bash
   git clone https://github.com/Dharun-2k7/Cluvera.git
   ```
   Or download the ZIP and extract it.

2. **Open Chrome Extensions Page**
   Go to: `chrome://extensions/`

3. **Enable Developer Mode**
   Toggle the switch in the top-right corner.

4. **Click "Load Unpacked"**
   Select the folder where the extension files are located.

5. **Add Your Gemini API Key**
   Open `popup.js` and replace:
   ```js
   const API_KEY = "your-gemini-api-key";
   ```

6. **Done!**
   - Open a LeetCode or Codeforces problem
   - Click the Cluvera icon in the toolbar
   - Get structured, ethical AI-powered hints

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

## 🔐 Ethics First

Cluvera promotes **fair learning** by:
- Working only on **practice problems**
- **Disabling itself during live contests**
- Avoiding full solution leaks unless asked explicitly

This ensures users develop real skills without relying on shortcuts.

---

## 🧠 Future Plans

- Add HackerRank and AtCoder support
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
