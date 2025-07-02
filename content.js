function getProblemText() {
  const leet = document.querySelector('[data-key="description"]');
  if (leet) return leet.innerText;

  const cf = document.querySelector(".problem-statement");
  if (cf) return cf.innerText;

  return "Problem text not found.";
}

chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
  if (req.type === "GET_PROBLEM_TEXT") {
    const text = getProblemText();
    sendResponse({ text });
  }
  return true; 
});
