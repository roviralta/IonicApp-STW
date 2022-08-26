<?php



$target_path = "uploads/";

 

$target_path = $target_path . basename( $_FILES['file']['name']);



if(move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {

header("Content-type : application/json");

    $data = "done";

    echo json_encode( $data );

} else{

header("Content-type : application/json");

	$data = "error";

	echo json_encode( $data );

}

 

?>

