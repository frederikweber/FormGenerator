<?php
	$text = $_GET['text'];
	header('Content-type: text/html');
	header('Content-Disposition: attachment; filename="form.html"');
	echo $text;
?>