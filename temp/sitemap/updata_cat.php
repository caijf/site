<?php
	$data = $_POST["json"];

	file_put_contents("js/cat.js",$data);

?>