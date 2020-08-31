const cacheData = {};
const cache = {
  // eslint-disable-next-line
  getItem: function(key) {
    return cacheData[key];
  },
  // eslint-disable-next-line
  setItem: function(key, data) {
    cacheData[key] = data;
  },
  // eslint-disable-next-line
  removeItem: function(key) {
    const ret = cacheData[key];
    delete cacheData[key];
    return ret;
  }
};

const setStorage = storage => {
  try {
    if (storage && storage.getItem && storage.setItem && storage.removeItem) {
      return storage;
    }
    return window.localStorage;
  } catch (err) {
    // eslint-disable-next-line
    console.warn(err);
    if (typeof window !== "undefined") {
      return window.localStorage;
    }
  }
  return cache;
};

class Storage {
  constructor(key, storage) {
    this.key = key;
    this.storage = setStorage(storage);
  }

  set(data) {
    this.storage.setItem(this.key, JSON.stringify(data));
  }

  get() {
    return JSON.parse(this.storage.getItem(this.key));
  }

  remove() {
    this.storage.removeItem(this.key);
  }
}

export default Storage;
