let request = require("request");
let fs = require("fs");

let shishen = require('./shishen.js');

/**
 * 下载网络图片
 * @param {object} opts 
 */
function downImg(opts = {}, path = '') {
	return new Promise((resolve, reject) => {
	  request
	    .get(opts)
	    .on('response', (response) => {
	      // console.log("img type:", response.headers['content-type'])
	    })
	    .on("error", (e) => {
	      // console.log("pipe error", e)
	      resolve(true);
	    })
	    .pipe(fs.createWriteStream(path))
	    .on("finish", () => {
	      // console.log("finish");
	      resolve("ok");
	    })
	    .on("close", () => {
	      // console.log("close");
	    })

	})
};

// shishen.data.forEach(item=>{
[{id:317}].forEach(item=>{
	const id = item.id;

	[1,2,3].forEach((skillItem)=>{
		const skillId = id+''+skillItem;
		// const skillId = 3151;

		let url = "https://yys.res.netease.com/pc/zt/20161108171335/data/skill/"+ skillId +".png";
		let opts = {
		  url: url,
		  // headers: {
		  //   'Referer': 'https://yys.163.com/',
		  // }
		};
		let path = "./skill/"+skillId+".png";

		downImg(opts, path).then((err)=>{
			if(err){
				console.log(skillId);
			}
		});
	});
})



