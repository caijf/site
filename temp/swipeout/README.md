# Swipeout 左滑删除

### 安装

In Node.js/io.js

	npm install swipeout

In an AMD loader:

	require(['swipeout'], function(Swipeout){
		// do something ...
	});
	
In a browser:

	<script src="swipeout.js"></script>
	<script>
		var listSwipeout = new Swipeout(options);
	</script>


### Note

- **swipeout.close** *method* 关闭当前滑出元素
- **swipeout.getOpenEl** *method* 获取当前滑出元素