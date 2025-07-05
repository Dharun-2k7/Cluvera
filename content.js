function getProblemText() {
  const leetcodeSelectors = [
    '[data-track-load="description_content"]',
    '.xFUwe', 
    '.content__u3I1', 
    '[data-cy="question-content"]',
    '.question-content',
    '.elfjS',
    '[data-track-load="description_content"] .elfjS'
  ];
  
  for (const selector of leetcodeSelectors) {
    const element = document.querySelector(selector);
    if (element && element.innerText.trim()) {
      return element.innerText.trim();
    }
  }
  
  const cf = document.querySelector(".ttypography");
  if (cf && cf.innerText.trim()) {
    return cf.innerText.trim();
  }

  return "Problem text not found. Please make sure you're on a problem page.";
}

chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
  if (req.type === "GET_PROBLEM_TEXT") {
    const text = getProblemText();
    sendResponse({ text });
  }
  return true; 
});