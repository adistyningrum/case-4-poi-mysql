<?php
include 'koneksi.php';

$id = $_POST['id'];

$sql = "DELETE FROM maps WHERE latitude = $id";

$response = array(); // Membuat array untuk response

if ($conn->query($sql) === TRUE) {
    $response['status'] = 'success'; 
    $response['message'] = 'Data POI berhasil dihapus';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Error: ' . $sql . '<br>' . $conn->error;
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
