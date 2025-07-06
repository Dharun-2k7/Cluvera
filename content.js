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

  return "Problem text not found. Please make sure you're on a problem page.";
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
    
    // Check for contest timer
    const contestTimer = document.querySelector('.contest-state-phase, .countdown, #sidebar .contest-countdown');
    if (contestTimer) {
      const timerText = contestTimer.textContent.toLowerCase();
      if (timerText.includes('running') || timerText.includes('before') || timerText.includes(':')) {
        return true;
      }
    }
    
    // Check for contest status in page
    const contestStatus = document.querySelector('.contest-state');
    if (contestStatus && contestStatus.textContent.toLowerCase().includes('running')) {
      return true;
    }
    
    // Check for submission pages during contests
    if (url.includes('/submission/') || url.includes('/submit/')) {
      const contestLinks = document.querySelectorAll('a[href*="/contest/"]');
      if (contestLinks.length > 0) {
        return true;
      }
    }
  }
  
  // AtCoder contest detection
  if (url.includes('atcoder.jp')) {
    if (url.includes('/contests/') && !url.includes('/tasks/')) {
      return true;
    }
    
    const contestTimer = document.querySelector('.contest-timer, .countdown');
    if (contestTimer && contestTimer.textContent.includes(':')) {
      return true;
    }
  }
  
  // CodeChef contest detection
  if (url.includes('codechef.com')) {
    if (url.includes('/contests/') || url.includes('/contest/')) {
      return true;
    }
    
    const contestTimer = document.querySelector('.contest-timer, .countdown');
    if (contestTimer && contestTimer.textContent.includes(':')) {
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