import TabsService from './TabsService';

const notificationsById = {};

function getNotification(id) {
  return notificationsById[id];
}

function addNotification(id, notification) {
  notificationsById[id] = notification;
}

function removeNotification(id) {
  delete notificationsById[id];
}

async function openNotification(id) {
  const { url } = getNotification(id);

  await TabsService.openTab(url);

  return closeNotification(id);
}

function buildNotificationOptions({ title, message }) {
  return {
    type: 'basic',
    iconUrl: 'images/icon38.png',
    requireInteraction: true,
    isClickable: true,
    title,
    message,
  };
}

function showNotification(id, { title, message, url }) {
  addNotification(id, { url });

  window.chrome.notifications.create(
    id,
    buildNotificationOptions({ title, message }),
  );
}

function closeNotification(id) {
  removeNotification(id);

  return new Promise(resolve => {
    window.chrome.notifications.clear(id, resolve);
  });
}

export default {
  removeNotification,
  showNotification,
  openNotification,
};
