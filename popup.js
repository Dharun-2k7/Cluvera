document.getElementById("get").addEventListener("click", () => {
    const resultDiv = document.getElementById("result");
    const opt=document.getElementById("options").value;
    resultDiv.innerHTML = `<div class="loader"></div>`;
    
    // get the api key 
    chrome.storage.sync.get(['geminiApiKey'],({ geminiApiKey }) => {
        if (!geminiApiKey) {
            resultDiv.textContent = "No API key set";
            return;
        }
    });
    // ask the content script for the problem text
     chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.tabs.sendMessage(tab.id, { type: "GET_PROBLEM_TEXT" }, (response) => {
            if (chrome.runtime.lastError) {
                result.textContent = "Error: Could not connect to the tab.";
                return;
            }
            const text = response?.text || "No problem text found.";
            result.textContent = text;
        });
    });  
});
