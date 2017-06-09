import * as constants from '../constants';
import User from '../User';

const FETCH_INTERVAL = 3 * 60 * 1000; // 3min
const LIMIT = 20;
const user = new User();

async function onFetch() {
  try {
    const { data } = await user.fetchRequestedReviewsCount({ limit: LIMIT });
    chrome.browserAction.setBadgeText({ text: `${data.search.issueCount}` });
  } catch (error) {
    chrome.browserAction.setBadgeText({ text: '..' });
    console.error(error);
  }
}

setInterval(onFetch, FETCH_INTERVAL);
onFetch();
