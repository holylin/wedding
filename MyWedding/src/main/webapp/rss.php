<?php

//get the q parameter from URL
$q=$_GET["q"];//find out which feed was selected
$xml=urldecode($q);

$xmlDoc = new DOMDocument();
$xmlDoc->load($xml);

//get elements from "<channel>"
$channel=$xmlDoc->getElementsByTagName('channel')->item(0);
$channel_title = $channel->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
$channel_link = $channel->getElementsByTagName('link')->item(0)->childNodes->item(0)->nodeValue;
$channel_desc = $channel->getElementsByTagName('description')->item(0)->childNodes->item(0)->nodeValue;

//output elements from "<channel>"
echo("<p><a href='" . $channel_link . "'>" . $channel_title . "</a><br/>");
echo($channel_desc . "</p>");

//get and output "<item>" elements
foreach ($xmlDoc->getElementsByTagName('item') as $x) {
	$item_title=$x->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
	$item_link=$x->getElementsByTagName('link')->item(0)->childNodes->item(0)->nodeValue;
	$item_desc=$x->getElementsByTagName('description')->item(0)->childNodes->item(0)->nodeValue;
	echo ("<p><a href='" . $item_link . "'>" . $item_title . "</a><br/>");
	echo ($item_desc . "</p>");
}
?>