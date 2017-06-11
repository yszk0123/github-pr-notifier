const DEFAULT_INTERVAL = 3;

function getInterval() {
  return parseInt(localStorage.getItem('interval'), 10);
}

function setInterval(interval) {
  localStorage.setItem('interval', interval);
}

function addAlarm() {
  const interval = getInterval() || DEFAULT_INTERVAL;
  const delayInMinutes = Math.max(Math.ceil(interval), 1);

  window.chrome.alarms.create({ delayInMinutes });
}

export default { addAlarm, getInterval, setInterval };
