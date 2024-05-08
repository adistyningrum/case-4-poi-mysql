<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POI Management</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="jquery-3.7.1.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <style>
        #map { height: 1000px; }
    </style>
</head>
<body>
    <div id="map"></div>

<div class="modal fade" id="poiModal" tabindex="-1" role="dialog" aria-labelledby="poiModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="poiModalLabel">Tambah POI Baru</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="poiForm">
                    <div class="form-group">
                        <label for="nama_lokasi">Nama Lokasi</label>
                        <input type="text" class="form-control" id="nama_lokasi" name="nama_lokasi" required>
                    </div>
                    <div class="form-group">
                        <label for="deskripsi_lokasi">Deskripsi Lokasi</label>
                        <textarea class="form-control" id="deskripsi_lokasi" name="deskripsi_lokasi" rows="1" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="fasilitas">Fasilitas</label>
                        <textarea class="form-control" id="fasilitas" name="fasilitas" rows="1" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="kategori_lokasi">Kategori Lokasi</label>
                        <textarea class="form-control" id="kategori_lokasi" name="kategori_lokasi" rows="1" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="jam_operasional">Jam Operasional</label>
                        <textarea class="form-control" id="jam_operasional" name="jam_operasional" rows="1" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="kontak_lokasi">Kontak Lokasi</label>
                        <textarea class="form-control" id="kontak_lokasi" name="kontak_lokasi" rows="1" required></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" href=maps.php>Tutup</button>
                <button type="button" class="btn btn-primary" id="simpanPOI">Simpan</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="perbaruiPOIModal" tabindex="-1" role="dialog" aria-labelledby="perbaruiPOIModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="poiModalLabel">Perbarui data POI</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="poiForm">
                    <div class="form-group">
                        <label for="nama_lokasi">Nama Lokasi</label>    
                        <input type="text" class="form-control" id="nama_lokasi" name="nama_lokasi" required>
                    </div>
                    <div class="form-group">
                        <label for="deskripsi_lokasi">Deskripsi Lokasi</label>
                        <textarea class="form-control" id="deskripsi_lokasi" name="deskripsi_lokasi" rows="1" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="fasilitas">Fasilitas</label>
                        <textarea class="form-control" id="fasilitas" name="fasilitas" rows="1" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="kategori_lokasi">Kategori Lokasi</label>
                        <textarea class="form-control" id="kategori_lokasi" name="kategori_lokasi" rows="1" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="jam_operasional">Jam Operasional</label>
                        <textarea class="form-control" id="jam_operasional" name="jam_operasional" rows="1" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="kontak_lokasi">Kontak Lokasi</label>
                        <textarea class="form-control" id="kontak_lokasi" name="kontak_lokasi" rows="1" required></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" href=maps.php>Tutup</button>
                <button type="button" class="btn btn-primary" id="simpanPOI">Simpan</button>
            </div>
        </div>
    </div>
</div>

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>
</html>
