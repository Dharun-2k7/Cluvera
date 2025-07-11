// Cross browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

document.addEventListener("DOMContentLoaded", () => {
    if (typeof browser !== 'undefined') {
        // Firefox
        browserAPI.storage.sync.get(['groqApiKey']).then(({ groqApiKey }) => {
            if (groqApiKey) { 
                document.getElementById("api-key").value = groqApiKey;
            }
        });
    } else {
        // Chrome 
        browserAPI.storage.sync.get(['groqApiKey'], ({ groqApiKey }) => {
            if (groqApiKey) { 
                document.getElementById("api-key").value = groqApiKey;
            }
        });
    }
    
    document.getElementById("save-btn").addEventListener("click", () => {
        const apiKey = document.getElementById("api-key").value.trim();
        if (!apiKey) {
            alert("Please enter an API key");
            return;
        }
        
        if (typeof browser !== 'undefined') {
            // Firefox 
            browserAPI.storage.sync.set({ groqApiKey: apiKey }).then(() => {
                const successMsg = document.getElementById("success-message");
                successMsg.style.display = "block";
                setTimeout(() => window.close(), 1000);
            });
        } else {
            // Chrome 
            browserAPI.storage.sync.set({ groqApiKey: apiKey }, () => {
                const successMsg = document.getElementById("success-message");
                successMsg.style.display = "block";
                setTimeout(() => window.close(), 1000);
            });
        }
    });
});