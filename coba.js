$(document).ready(function() {
    var mainMarker = null; 
    
    read_maps(); 

    var map = L.map('map', { contextmenu: true }).setView([-7.250445, 112.768845], 10); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map); 


    map.on('click', function(e) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
    
        if (!mainMarker) {
            mainMarker = L.marker([lat, lng], { draggable: true }).addTo(map);
            createInfo(mainMarker);
        } else {
            mainMarker.setLatLng([lat, lng]);
            editMarkerInfo(mainMarker);
        }
    });
    

    function createInfo(marker) {
        $('#nama_lokasi').val(marker.options.nama_lokasi || '');
        $('#deskripsi_lokasi').val(marker.options.deskripsi_lokasi || '');
        $('#fasilitas').val(marker.options.fasilitas || '');
        $('#kategori_lokasi').val(marker.options.kategori_lokasi || '');
        $('#jam_operasional').val(marker.options.jam_operasional || '');
        $('#kontak_lokasi').val(marker.options.kontak_lokasi || '');
    
        $('#poiModal').modal('show');

        $('#simpanPOI').off('click').on('click', function() {
            var nama_lokasi = $('#nama_lokasi').val();
            var deskripsi_lokasi = $('#deskripsi_lokasi').val();
            var fasilitas = $('#fasilitas').val();
            var kategori_lokasi = $('#kategori_lokasi').val();
            var jam_operasional = $('#jam_operasional').val();
            var kontak_lokasi = $('#kontak_lokasi').val();

            $.ajax({
                url: 'create_maps.php',
                type: 'POST',
                data: {
                    lat: marker.getLatLng().lat,
                    lng: marker.getLatLng().lng,
                    nama_lokasi: nama_lokasi,
                    deskripsi_lokasi: deskripsi_lokasi,
                    fasilitas: fasilitas,
                    kategori_lokasi: kategori_lokasi,
                    jam_operasional: jam_operasional,
                    kontak_lokasi: kontak_lokasi
                },
                success: function(response) {
                    console.log('Data POI berhasil disimpan');
                    marker.bindPopup('<b>' + nama_lokasi + '</b><br>' + deskripsi_lokasi).openPopup();
                    read_maps();
                },
                error: function(xhr, status, error) {
                    console.error('Terjadi kesalahan:', error);
                }
            });

            $('#poiModal').modal('hide');
        });
    }

    function editMarkerInfo(marker) {
        $('#nama_lokasi').val(marker.options.nama_lokasi || '');
        $('#deskripsi_lokasi').val(marker.options.deskripsi_lokasi || '');
        $('#fasilitas').val(marker.options.fasilitas || '');
        $('#kategori_lokasi').val(marker.options.kategori_lokasi || '');
        $('#jam_operasional').val(marker.options.jam_operasional || '');
        $('#kontak_lokasi').val(marker.options.kontak_lokasi || '');
    
        $('#perbaruiPOIModal').modal('show');
    
        $('#simpanPOI').off('click').on('click', function() {
            var nama_lokasi = $('#nama_lokasi').val();
            var deskripsi_lokasi = $('#deskripsi_lokasi').val();
            var fasilitas = $('#fasilitas').val();
            var kategori_lokasi = $('#kategori_lokasi').val();
            var jam_operasional = $('#jam_operasional').val();
            var kontak_lokasi = $('#kontak_lokasi').val();
    
            $.ajax({
                url: 'update_maps.php',
                type: 'POST',
                data: {
                    id: marker.options.id,
                    lat: marker.getLatLng().lat,
                    lng: marker.getLatLng().lng,
                    nama_lokasi: nama_lokasi,
                    deskripsi_lokasi: deskripsi_lokasi,
                    fasilitas: fasilitas,
                    kategori_lokasi: kategori_lokasi,
                    jam_operasional: jam_operasional,
                    kontak_lokasi: kontak_lokasi
                },
                success: function(response) {
                    var result = JSON.parse(response);
                    if (result.status === 'success') {
                        console.log('Data POI berhasil diperbarui');
                        marker.options.nama_lokasi = nama_lokasi;
                        marker.options.deskripsi_lokasi = deskripsi_lokasi;
                        marker.options.fasilitas = fasilitas;
                        marker.options.kategori_lokasi = kategori_lokasi;
                        marker.options.jam_operasional = jam_operasional;
                        marker.options.kontak_lokasi = kontak_lokasi;
                        marker.bindPopup('<b>' + nama_lokasi + '</b><br>' + deskripsi_lokasi).openPopup();
                    } else {
                        console.error('Gagal memperbarui data POI:', result.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Terjadi kesalahan:', error);
                }
            });
    
            $('#perbaruiPOIModal').modal('hide');
        });
    }
    
    function addMarkers(data) {
        data.forEach(function(marker) {
            var newMarker = L.marker([marker.latitude, marker.longitude], { 
                draggable: true,
                id: marker.id,
                nama_lokasi: marker.nama_lokasi,
                deskripsi_lokasi: marker.deskripsi_lokasi,
                fasilitas: marker.fasilitas,
                kategori_lokasi: marker.kategori_lokasi,
                jam_operasional: marker.jam_operasional,
                kontak_lokasi: marker.kontak_lokasi
            }).addTo(map);
            var popupContent = createPopupContent(marker);
            newMarker.bindPopup(popupContent).openPopup();
            newMarker.on('contextmenu', function(e) {
                hapusDataPOI(marker.id);
            });
            newMarker.on('dragend', function(e) {
                editMarkerInfo(newMarker);
            });
        });
    }

    function createPopupContent(marker) {
        var content = '<h3>' + marker.nama_lokasi + '</h3>';
        content += '<p><strong>Latitude:</strong> ' + marker.latitude + '</p>';
        content += '<p><strong>Longitude:</strong> ' + marker.longitude + '</p>';
        content += '<p><strong>Deskripsi Lokasi:</strong> ' + marker.deskripsi_lokasi + '</p>';
        content += '<p><strong>Fasilitas:</strong> ' + marker.fasilitas + '</p>';
        content += '<p><strong>Kategori Lokasi:</strong> ' + marker.kategori_lokasi + '</p>';
        content += '<p><strong>Jam Operasional:</strong> ' + marker.jam_operasional + '</p>';
        content += '<p><strong>Kontak Lokasi:</strong> ' + marker.kontak_lokasi + '</p>';
        return content;
    }

    function read_maps() {
        $.ajax({
            url: 'read_maps.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                addMarkers(data);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    function hapusDataPOI(id) {
        showConfirmationDialog("Apakah Anda yakin ingin menghapus data POI ini?", function(result) {
            if (result) {
                $.ajax({
                    url: 'delete_maps.php',
                    type: 'POST',
                    data: { id: id },
                    success: function(response) {
                        read_maps();
                        showDialog("Data POI berhasil dihapus.");
                    },
                    error: function(xhr, status, error) {
                        console.error(error);
                        showDialog("Terjadi kesalahan saat menghapus data POI.");
                    }
                });
            }
        });
    }

    function showConfirmationDialog(message, callback) {
        var dialog = document.createElement("div");
        dialog.textContent = message;
        dialog.style.backgroundColor = "red";
        dialog.style.color = "white";
        dialog.style.padding = "10px";
        dialog.style.position = "fixed";
        dialog.style.top = "50%";
        dialog.style.left = "50%";
        dialog.style.transform = "translate(-50%, -50%)";
        dialog.style.zIndex = "9999";
        
        var btnYes = document.createElement("button");
        btnYes.textContent = "Ya";
        btnYes.style.marginRight = "10px";
        btnYes.addEventListener("click", function() {
            document.body.removeChild(dialog);
            if (callback) {
                callback(true);
            }
        });
    
        var btnNo = document.createElement("button");
        btnNo.textContent = "Batal";
        btnNo.addEventListener("click", function() {
            document.body.removeChild(dialog);
            if (callback) {
                callback(false);
            }
        });
    
        dialog.appendChild(btnYes);
        dialog.appendChild(btnNo);
    
        document.body.appendChild(dialog);
    }
});
