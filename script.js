$( document ).ready(function() {
    read_maps();
});

var map = L.map('map', { contextmenu: true }).setView([-7.250445, 112.768845], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    var marker = L.marker([lat, lng]).addTo(map);
    $('#nama_lokasi').val('');
    $('#deskripsi_lokasi').val('');
    $('#fasilitas').val('');
    $('#kategori_lokasi').val('');
    $('#jam_operasional').val('');
    $('#kontak_lokasi').val('');

    $('#poiModal').modal('show');
    $('#simpanPOI').click(function() {
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
                lat: lat,
                lng: lng,
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

});


function addMarkers(data) {
    data.forEach(function(marker) {
        var newMarker = L.marker([marker.latitude, marker.longitude], { draggable: true }).addTo(map).openPopup();
        var popupContent = '<h3>' + marker.nama_lokasi + '</h3>' +
                            '<p><strong>Latitude:</strong> ' + marker.latitude + '</p>' +
                            '<p><strong>Longitude:</strong> ' + marker.longitude + '</p>' +
                            '<p><strong>Deskripsi Lokasi:</strong> ' + marker.deskripsi_lokasi +'</p>' +
                            '<p><strong>Fasilitas:</strong> ' + marker.fasilitas + '</p>' +
                            '<p><strong>Kategori Lokasi:</strong> ' + marker.kategori_lokasi + '</p>' +
                            '<p><strong>Jam Operasional:</strong> ' + marker.jam_operasional + '</p>' +
                            '<p><strong>Kontak Lokasi:</strong> ' + marker.kontak_lokasi + '</p>';
        newMarker.bindPopup(popupContent).openPopup();
    });
}


function createPopupContent(marker) {
    var content = '<h3>' + marker.nama_lokasi + '</h3>';
    content += '<p><strong>Latitude:</strong> ' + marker.latitude + '</p>';
    content += '<p><strong>Longitude:</strong> ' + marker.longitude + '</p>';
    content += '<p><strong>Deskripsi:</strong> ' + marker.deskripsi_lokasi + '</p>';
    content += '<p><strong>Fasilitas:</strong> ' + marker.fasilitas + '</p>';
    content += '<p><strong>Kategori:</strong> ' + marker.kategori_lokasi + '</p>';
    content += '<p><strong>Jam Operasional:</strong> ' + marker.jam_operasional + '</p>';
    content += '<p><strong>Kontak:</strong> ' + marker.kontak_lokasi + '</p>';
    return content;
}

function read_maps(){
$.ajax({
    url: 'read_maps.php',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        $.each(data, function (index, marker) {
            var popupContent = createPopupContent(marker);
            var newMarker = L.marker([marker.latitude, marker.longitude]).addTo(map).bindPopup(popupContent).openPopup();
            newMarker.on('contextmenu', function(e) {
            hapusDataPOI(marker.latitude);
            });
        });
    },
    error: function (xhr, status, error) {
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
                    marker.removeFrom(map);
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

// function updateDataPOI(id, newData) {
//     $.ajax({
//         url: 'update_maps.php',
//         type: 'POST',
//         data: {
//             id: id,
//             newData: newData
//         },
//         success: function (response) {
//             alert("Data POI berhasil diperbarui.");
//         },
//         error: function (xhr, status, error) {
//             console.error(error);
//             alert("Terjadi kesalahan saat memperbarui data POI.");
//         }
//     });
// }

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
