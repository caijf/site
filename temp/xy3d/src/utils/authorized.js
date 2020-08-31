import Storage from "./Storage";

const storageKey = "__authorized__";

const authorizedStorage = new Storage(storageKey, window.sessionStorage);

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

// 获取权限
export function getAuthorized() {
  return authorizedStorage.get();
}

// 设置权限
export function setAuthorized(authorizedData) {
  authorizedStorage.set(authorizedData);
}

// 删除权限
export function removeAuthorized() {
  authorizedStorage.remove();
}

// 检查是否有权限
export function checkAuthorized(authority) {
  if (!authority) {
    return true;
  }

  // 当前权限
  const currentAuthority = getAuthorized();

  // 相等，用于数字、字符串
  if (authority === currentAuthority) {
    return true;
  }

  // 数组处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return true;
    }
    if (Array.isArray(currentAuthority)) {
      for (let i = 0; i < currentAuthority.length; i += 1) {
        const element = currentAuthority[i];
        if (authority.indexOf(element) >= 0) {
          return true;
        }
      }
    }
    return false;
  }

  // string 处理
  if (typeof authority === "string") {
    if (Array.isArray(currentAuthority)) {
      for (let i = 0; i < currentAuthority.length; i += 1) {
        const element = currentAuthority[i];
        if (authority.indexOf(element) >= 0) {
          return true;
        }
      }
    }
    return false;
  }

  // Promise 处理
  if (isPromise(authority)) {
    return authority.then(() => true).catch(() => false);
  }

  // Function 处理
  if (typeof authority === "function") {
    try {
      const bool = authority(currentAuthority);
      // 函数执行后返回值是 Promise
      if (isPromise(bool)) {
        return authority.then(() => true).catch(() => false);
      }
      return bool;
    } catch (error) {
      throw error;
    }
  }

  // 不支持的参数，统一返回false
  return false;
}
