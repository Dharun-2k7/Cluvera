document.getElementById("get").addEventListener("click", () => {
    const result = document.getElementById("result");
    result.textContent = "Loading...";

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
