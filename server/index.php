<!DOCTYPE html>

<html>

<head>

  <meta charset="utf-8">

  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">

  <title>Server Upload</title>

</head>

<body>

<h1>Images Uploaded</h1>

  <?php

$scan = scandir('uploads');

$i = 0;

  foreach($scan as $file)

  {

    if (!is_dir($file))

    {

	echo '<img src="uploads/'.$file.'" style="float: left; width: 400px; margin: 10px;"/>';

    }

  }

  ?>

</body>

</html>

