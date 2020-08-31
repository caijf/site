import { types } from "mobx-state-tree";
import { routerHistory } from "router-store";
import Storage from "~/utils/Storage";
import { setAuthorized, removeAuthorized } from "~/utils/authorized";

const storageKey = "__login_info__";

const loginStorage = new Storage(storageKey, window.sessionStorage);

// 初始用户信息
const initUserInfo = {
  token: "",
  username: ""
};

const User = types
  .model({
    token: types.optional(types.string, ""),
    username: types.optional(types.string, "")
  })
  .views(self => ({
    get isLogin() {
      return !!self.token;
    },
    get loginToken() {
      // 可在 services/request 中直接使用
      return self.token;
    }
  }))
  .actions(self => ({
    // 更新数据
    update(data) {
      for (const prop in data) {
        if (Object.prototype.hasOwnProperty.call(data, prop)) {
          self[prop] = data[prop];
        }
      }
    },

    // 登录成功
    login(data) {
      loginStorage.set(data); // 缓存本地
      setAuthorized(data.currentAuthority); // 设置权限
      self.update(data);
    },

    // 退出登录
    logout() {
      loginStorage.remove(); // 删除本地缓存
      removeAuthorized(); // 删除权限
      self.update(initUserInfo); // 重置用户信息
      routerHistory.push("/user/login");
    }
  }));

// // 用于示例演示
// loginStorage.set({
//   username: "guest",
//   token: "guest12343",
//   currentAuthority: ["user"]
// });

export const user = User.create(loginStorage.get() || initUserInfo);

export default User;
