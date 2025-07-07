document.getElementById("get").addEventListener("click", () => {
  const resultDiv = document.getElementById("result");
  const opt = document.getElementById("select").value;
  resultDiv.innerHTML = `<div class="loader"></div>`;

  // Get API key from storage
  chrome.storage.sync.get(['geminiApiKey'], ({ geminiApiKey }) => {
    if (!geminiApiKey) {
      resultDiv.textContent = "❌ No Gemini API key set in options.";
      return;
    }

    // Get problem text from content script
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(tab.id, { type: "GET_PROBLEM_TEXT" }, async (response) => {
        if (chrome.runtime.lastError) {
          resultDiv.textContent = " Error: Could not connect to the tab.\nTry refreshing the problem page.";
          return;
        }

        const text = response?.text || " No problem text found.";

        // Check if contest mode is detected
        if (text.includes("Contest mode detected")) {
          resultDiv.innerHTML = `
            <div style="text-align: center; padding: 20px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; color: #856404;">
              <h3 style="margin: 0 0 10px 0; color: #856404;"> 🚫 Contest Mode</h3>
              <p style="margin: 0; line-height: 1.5;">This extension is disabled during live contests to maintain fair play and integrity.</p>
              <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #6c757d;">You can use hints on practice problems after the contest ends.</p>
            </div>
          `;
          return;
        }

        if (text.includes("Problem text not found")) {
          resultDiv.textContent = text;
          return;
        }

        // Get Gemini AI Hint
        try {
          const hint = await getGeminiHint(text, opt, geminiApiKey);
          resultDiv.innerHTML = formatHint(hint);
        } catch (error) {
          console.error("Gemini API Error:", error);
          resultDiv.textContent = "❌ Gemini API Error: " + error.message;
        }
      });
    });
  });
});

document.getElementById("clear-btn").addEventListener("click", () => {
  document.getElementById("result").textContent = "Select the options";
});

// Format the hint response for better readability
function formatHint(hint) {
  // Add some basic formatting to make hints more readable
  return hint
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background: #f1f1f1; padding: 2px 4px; border-radius: 3px;">$1</code>');
}

// Gemini prompt generation & API call
async function getGeminiHint(text, opt, apiKey) {
  const promptMap = {
    hints: `You are a helpful CP mentor.\n\nRead the problem below and give only the high-level hints:\n- Key concepts involved\n- Patterns to recognize\n- Don't explain full logic\n\nProblem:\n\n${text}`,
    code: `You are a logic-focused assistant for DSA.\n\nRead the problem and explain:\n- Approach to solve it\n -explain the algorithms needed briefly\n- Best suited algorithm\n- Avoid giving full code\n\nProblem:\n\n${text}`,
    explanations: `Act like a DSA tutor and giva a java code .\n\nBased on the problem, give a conceptual explanation of:\n- What's being asked\n- How to think through it step by step \n- Common pitfalls or edge cases\n\nProblem:\n\n${text}`
  };

  const prompt = promptMap[opt] || promptMap["hints"];

  // Gemini API endpoint
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: prompt }] 
        }]
      })
    }
  );

  // Check if response is successful
  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error Response:", errorData);
    throw new Error(errorData.error?.message || `API Error: ${response.status}`);
  }

  const data = await response.json();
  console.log("Gemini Response:", data);

  // Extract the response text
  const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!responseText) {
    console.error("No response text found:", data);
    throw new Error("No response received from Gemini API");
  }

  return responseText;
}