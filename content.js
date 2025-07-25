// Cross browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

function getProblemText() {
  // Check if we're in a contest first
  if (isInLiveContest()) {
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
  const gfg = document.querySelector(".problems_problem_content__Xm_eO");
  if (gfg && gfg.innerText.trim()) {
    return gfg.innerText.trim();    
  }
  const hkr = document.querySelector(".challenge-body-html");
  if (hkr && hkr.innerText.trim()) {
    return hkr.innerText.trim();
  } 
  return "Problem text not found. Please make sure you're on a problem page.";
}

function isInLiveContest() {
  const url = window.location.href.toLowerCase();

  if (url.includes('leetcode.com')) {
    if (url.includes('/contest/') && url.includes('/problems/')) {
      const statusElements = document.querySelectorAll(
        '.contest-status, [data-test="contest-status"], .status, [class*="status"]'
      );

      for (const status of statusElements) {
        const statusText = status.textContent.toLowerCase();
        if (
          (statusText.includes('running') ||
            statusText.includes('active') ||
            statusText.includes('live') ||
            statusText.includes('in progress')) &&
          !status.closest('.topic, .tag, [class*="topic"], [class*="tag"]')
        ) {
          console.log("LIVE CONTEST: Active status found:", statusText);
          return true;
        }
      }

      const contestNavigation = document.querySelector(
        '.contest-nav, .contest-ranking, .leaderboard, [href*="ranking"]'
      );

      const timerElements = document.querySelectorAll(
        '.timer, .countdown, [class*="timer"], [class*="countdown"]'
      );

      if (contestNavigation && contestNavigation.offsetParent !== null) {
        const hasActiveTimer = Array.from(timerElements).some(timer =>
          timer.textContent.match(/^\d{1,2}:\d{2}:\d{2}$/) &&
          !timer.textContent.includes('00:00:00')
        );

        if (hasActiveTimer) {
          console.log("LIVE CONTEST: Contest navigation with active timer found");
          return true;
        }
      }
    }
  }

  return false; 
}


browserAPI.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "GET_PROBLEM_TEXT") {
    const text = getProblemText();
    sendResponse({ text });
  }
  return true;
});