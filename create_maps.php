<?php
include 'koneksi.php';

$lat = $_POST['lat'];
$lng = $_POST['lng'];
$nama_lokasi = $_POST['nama_lokasi'];
$deskripsi_lokasi = $_POST['deskripsi_lokasi'];
$fasilitas = $_POST['fasilitas'];
$kategori_lokasi = $_POST['kategori_lokasi'];
$jam_operasional = $_POST['jam_operasional'];
$kontak_lokasi = $_POST['kontak_lokasi'];

$sql = "INSERT INTO maps (latitude, longitude, nama_lokasi, deskripsi_lokasi, fasilitas, kategori_lokasi, jam_operasional, kontak_lokasi) 
        VALUES ('$lat', '$lng', '$nama_lokasi', '$deskripsi_lokasi', '$fasilitas', '$kategori_lokasi', '$jam_operasional', '$kontak_lokasi')";

if ($conn->query($sql) === TRUE) {
    echo "Data POI berhasil disimpan";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
