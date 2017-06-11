async function queryTabs(url) {
  return new Promise((resolve, reject) => {
    window.chrome.tabs.query(
      {
        currentWindow: true,
        url,
      },
      resolve,
    );
  });
}

async function createTab(url) {
  return new Promise((resolve, reject) => {
    window.chrome.tabs.create({ url }, resolve);
  });
}

async function updateTab(tabId, options) {
  return new Promise((resolve, reject) => {
    window.chrome.tabs.update(tabId, options, resolve);
  });
}

async function openTab(url) {
  const tabs = await queryTabs(url);
  if (tabs && tabs.length > 0) {
    await updateTab(tabs[0].id, { url, active: true });
    return;
  }
  await createTab(url);
}

export default { openTab };
