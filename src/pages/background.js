import * as constants from '../constants';
import User from '../User';
import TabsService from '../common/TabsService';
import NotificationsService from '../common/NotificationsService';
import BadgeService from '../common/BadgeService';
import AlarmsService from '../common/AlarmsService';
import Checker from '../common/Checker';

const ALARM_STARTUP_DELAY = 3000;
const AVATAR_SIZE = 32;
const LAST_CHECKED_AT_KEY = 'last-checked-at';
const LIMIT = 5;
const user = new User();
const checker = new Checker('notification');

function notifyIfNeeded(data) {
  if (!data.search.issueCount) {
    return;
  }

  data.search.edges.forEach(edge => {
    const { id, title, url, author } = edge.node;
    const notificationId = `github-pr-notifier-${Date.now()}-${id}`;

    NotificationsService.showNotification(notificationId, {
      title,
      url,
      message: `${url} by ${author.login}`,
    });
  });
}

async function update() {
  try {
    await checker.run(async lastCheckedAt => {
      const { data } = await user.fetchRequestedReviews({
        limit: LIMIT,
        avatarSize: AVATAR_SIZE,
        updatedAt: lastCheckedAt,
      });

      notifyIfNeeded(data);

      BadgeService.renderCount(data.search.issueCount);
    });
  } catch (error) {
    BadgeService.warn('..');
    console.error(error);
  } finally {
    AlarmsService.addAlarm();
  }
}

function handleUpdate() {
  if (!navigator.onLine) {
    handleOffline();
    return;
  }

  update();
}

function handleOffline() {
  BadgeService.warn('offline');
}

function handleInstalled(details) {
  if (details.reason === 'install') {
    window.chrome.runtime.openOptionsPage();
  }
}

function handleOnline() {
  update();
}

function handleMessage() {
  update();
}

window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);

window.chrome.alarms.create({ when: Date.now() + ALARM_STARTUP_DELAY });
window.chrome.alarms.onAlarm.addListener(handleUpdate);

window.chrome.runtime.onInstalled.addListener(handleInstalled);
window.chrome.runtime.onMessage.addListener(handleUpdate);

window.chrome.notifications.onClicked.addListener(id => {
  NotificationsService.openNotification(id);
});
window.chrome.notifications.onClosed.addListener(id => {
  NotificationsService.removeNotification(id);
});
