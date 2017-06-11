import Theme from './Theme';

function renderCount(count) {
  window.chrome.browserAction.setBadgeText({
    text: `${count}`,
  });
  window.chrome.browserAction.setBadgeBackgroundColor({
    color: count === 0 ? Theme.colors.normal : Theme.colors.warning,
  });
}

function warn(text) {
  window.chrome.browserAction.setBadgeText({
    text,
  });
  window.chrome.browserAction.setBadgeBackgroundColor(Theme.colors.warning);
}

export default { renderCount, warn };
