import normalizeISODateString from './normalizeISODateString';

const CHECKER_PREFIX = 'checker-';

export default class Checker {
  constructor(id) {
    this.storageKey = `${CHECKER_PREFIX}${id}`;
  }

  _getLastCheckedAt() {
    return localStorage.getItem(this.storageKey);
  }

  _setLastCheckedAt(checkedAt) {
    localStorage.setItem(this.storageKey, checkedAt);
  }

  async run(checkFn) {
    const lastCheckedAt = this._getLastCheckedAt() || null;
    const checkedAt = normalizeISODateString(new Date().toISOString());

    await checkFn(lastCheckedAt);

    this._setLastCheckedAt(checkedAt);
  }
}
