document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['geminiApiKey'], ({ geminiApiKey }) => {
        if (geminiApiKey) { 
            document.getElementById("api-key").value = geminiApiKey;
        }
    });
    
    document.getElementById("save-btn").addEventListener("click", () => {
        const apiKey = document.getElementById("api-key").value.trim();
        if (!apiKey) {
            alert("Please enter an API key");
            return;
        }
        
        chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
            const successMsg = document.getElementById("success-message");
            successMsg.style.display = "block";
            setTimeout(() => window.close(), 1000);
        });
    });
});
