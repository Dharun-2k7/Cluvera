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
  // AtCoder problem statement
  const atcoder = document.querySelector('#task-statement');
  if (atcoder && atcoder.innerText.trim()) {
    return atcoder.innerText.trim();
  }
  // USACO (official + guide) problem statements
  if (location.hostname.includes('usaco.org')) {
    const usacoOrgSelectors = [
      '#problem-text',
      '#probtext',
      'div.problem-text',
      'div#content > div'
    ];
    for (const selector of usacoOrgSelectors) {
      const el = document.querySelector(selector);
      if (el && el.innerText && el.innerText.trim().length > 50) {
        return el.innerText.trim();
      }
    }
  }
  if (location.hostname.includes('usaco.guide')) {
    const usacoGuideSelectors = [
      'main .prose',
      'article.prose',
      'article.markdown-body',
      'article',
      '[data-testid="problem-markdown"]'
    ];
    for (const selector of usacoGuideSelectors) {
      const el = document.querySelector(selector);
      if (el && el.innerText && el.innerText.trim().length > 50) {
        return el.innerText.trim();
      }
    }
  }
  // Generic USACO fallback
  const usacoGeneric = document.querySelector('#problem-text, div.problem-statement, section#problem, #content');
  if (usacoGeneric && usacoGeneric.innerText && usacoGeneric.innerText.trim().length > 100) {
    return usacoGeneric.innerText.trim();
  }
  return "Problem text not found. Please make sure you're on a problem page.";
}

function isInLiveContest() {
  const url = window.location.href.toLowerCase();

  // Find likely contest container areas to scope timer checks
  const getContestContainers = () => {
    const selectors = [
      '.contest', '#contest', '[id*="contest"]', '[class*="contest"]',
      // Codeforces
      '#sidebar', '.contest-state', '.roundbox',
      // LeetCode
      '.contest-nav', '[data-test="contest-status"]',
      // AtCoder
      '#contest-timer', '#main-div'
    ];
    return Array.from(document.querySelectorAll(selectors.join(', ')));
  };

  // Helper: detect active countdown timers with HH:MM:SS within contest areas
  const hasActiveCountdown = () => {
    const timerSelectors = '#countdown, #contest-timer, .timer, .countdown, [class*="timer"], [class*="countdown"]';
    const containers = getContestContainers();
    const roots = containers.length ? containers : [document];
    for (const root of roots) {
      const timers = root.querySelectorAll(timerSelectors);
      const found = Array.from(timers).some(timer => {
        const txt = (timer.textContent || '').replace(/\s+/g, ' ').trim();
        return /\b\d{1,2}:\d{2}:\d{2}\b/.test(txt) && !/\b00:00:00\b/.test(txt);
      });
      if (found) return true;
    }
    return false;
  };

  // LeetCode contests: allow status text or an active timer
  if (url.includes('leetcode.com')) {
    if (url.includes('/contest/') && url.includes('/problems/')) {
      const statusElements = document.querySelectorAll(
        '.contest-status, [data-test="contest-status"], .status, [class*="status"]'
      );
      for (const status of statusElements) {
        const statusText = (status.textContent || '').toLowerCase();
        if (
          (statusText.includes('running') ||
            statusText.includes('active') ||
            statusText.includes('live') ||
            statusText.includes('in progress')) &&
          !status.closest('.topic, .tag, [class*="topic"], [class*="tag"]')
        ) {
          return true;
        }
      }
      if (hasActiveCountdown()) {
        return true;
      }
    }
  }

  // Codeforces: only block when an active countdown exists in contest area
  if (url.includes('codeforces.com')) {
    if (url.includes('/contest/') || url.includes('/gym/')) {
      if (hasActiveCountdown()) {
        return true;
      }
    }
  }

  // CodeChef: require an active timer in contest area
  if (url.includes('codechef.com')) {
    if (url.includes('/contests/') || url.includes('/problems/')) {
      if (hasActiveCountdown()) {
        return true;
      }
    }
  }

  // HackerRank: require an active timer or contests challenge path
  if (url.includes('hackerrank.com')) {
    if (url.includes('/contests/')) {
      if (hasActiveCountdown()) {
        return true;
      }
    }
  }

  // AtCoder: require an active timer or tasks under contests
  if (url.includes('atcoder.jp')) {
    if (url.includes('/contests/')) {
      if (hasActiveCountdown()) {
        return true;
      }
    }
  }

  // USACO: do not auto-detect contest mode (no live contests currently)
  // Intentionally no contest detection for usaco.org
  // can add live contest detection if live contest are added in usaco.org
  return false; 
}


browserAPI.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "GET_PROBLEM_TEXT") {
    const text = getProblemText();
    sendResponse({ text });
  }
  return true;
});