module.exports = {
  login: req => {
    const username = req.body.username || "测试用户";
    const token = new Date().getTime().toString();
    // console.log(req.body);
    return {
      errMsg: "test",
      data: {
        username,
        token,
        currentAuthority: ["user"]
      }
    };
  }
};
