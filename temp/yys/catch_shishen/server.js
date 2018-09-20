// var http = require('http');

// var server = http.createServer((req, res)=>{
// 	console.log('有客户端连接');

// 	res.writeHeader(200, {
// 		'content-type': 'text/html;charset="utf-8'
// 	});
// 	res.write('这是正文部分');
// 	res.end();
// }).listen(8888);
// console.log('服务器开启成功');

const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '');

const server = http.createServer((req, res)=>{
	const url = req.url;
	const file = root + url;

	fs.readFile(file, (err, data)=>{
		if(err){
			res.writeHeader(404, {
				'content-type': 'text/html;charset="utf-8"'
			});
			res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
			res.end();
		}else{
			res.writeHeader(200, {
				'content-type': 'text/html;charset="utf-8"'
			});
			res.write(data);
			res.end();
		}
	})
}).listen(8888);

console.log('服务器开启成功');