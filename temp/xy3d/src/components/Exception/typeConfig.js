import pic403 from "~/assets/images/403.png";
import pic404 from "~/assets/images/404.png";
import pic500 from "~/assets/images/500.png";

const config = {
  403: {
    img: pic403,
    title: "403",
    desc: "抱歉，你无权访问该页面"
  },
  404: {
    img: pic404,
    title: "404",
    desc: "抱歉，你访问的页面不存在"
  },
  500: {
    img: pic500,
    title: "500",
    desc: "抱歉，服务器出错了"
  }
};

export default config;
