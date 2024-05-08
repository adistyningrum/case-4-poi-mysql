<?php
include 'koneksi.php';

$id = $_POST['id'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$nama_lokasi = $_POST['nama_lokasi'];
$deskripsi_lokasi = $_POST['deskripsi_lokasi'];
$fasilitas = $_POST['fasilitas'];
$kategori_lokasi = $_POST['kategori_lokasi'];
$jam_operasional = $_POST['jam_operasional'];
$kontak_lokasi = $_POST['kontak_lokasi'];

$sql = "UPDATE maps SET latitude='$lat', longitude='$lng', nama_lokasi='$nama_lokasi', deskripsi_lokasi='$deskripsi_lokasi', fasilitas='$fasilitas', kategori_lokasi='$kategori_lokasi', jam_operasional='$jam_operasional', kontak_lokasi='$kontak_lokasi' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Data POI berhasil diperbarui";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
