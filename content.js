function getProblemText() {
  // Check if we're in a contest first
  if (isInContest()) {
    return "Contest mode detected. This extension is disabled during live contests to maintain fair play.";
  }

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
<<<<<<< HEAD
=======


>>>>>>> dc8cfa9055cce7ba6bd8cdffb5c6cf93ed705b88
    const gfg=document.querySelector(".problems_problem_content__Xm_eO");
    if (gfg && gfg.innerText.trim()) {
    return gfg.innerText.trim();    
}
<<<<<<< HEAD
return "Problem text not found. Please make sure you're on a problem page.";
=======
>>>>>>> dc8cfa9055cce7ba6bd8cdffb5c6cf93ed705b88
}

function isInContest() {
  const url = window.location.href.toLowerCase();
  
  // LeetCode contest detection URL
  if (url.includes('leetcode.com')) {
    if (url.includes('/contest/') || url.includes('/contests/')) {
      return true;
    }
    
    // Check for weekly/biweekly contest patterns
    if (url.match(/\/contest\/weekly-contest-\d+/) || 
        url.match(/\/contest\/biweekly-contest-\d+/)) {
      return true;
    }
    
    // Check for contest timer on page
    const contestTimer = document.querySelector('.contest-timer, .countdown-timer, [data-test="contest-timer"]');
    if (contestTimer && contestTimer.textContent.includes(':')) {
      return true;
    }
    
    // Check for contest navigation or indicators
    const contestIndicators = document.querySelectorAll('[href*="contest"], .contest-nav, .contest-header');
    if (contestIndicators.length > 0) {
      return true;
    }
  }
  
  // Codeforces contest detection
  if (url.includes('codeforces.com')) {
    // Check for contest URLs
    if (url.includes('/contest/') || url.includes('/contests/')) {
      return true;
    }
    
    // Check for gym contests
    if (url.includes('/gym/')) {
      return true;
    }
  }
  return false;
}

chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
  if (req.type === "GET_PROBLEM_TEXT") {
    const text = getProblemText();
    sendResponse({ text });
  }
  return true;
});