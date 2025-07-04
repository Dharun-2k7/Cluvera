function getProblemText() {
let descriptionElement = document.querySelector('[data-track-load="description_content"]');

   if (parent) return parent.innerText;

  const cf = document.querySelector(".ttypography");
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
