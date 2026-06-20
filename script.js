// Fungsi untuk menangani klik tombol beli
function beliKarya(namaKarya, harga) {
    // Mengubah format angka menjadi format rupiah standar
    let hargaFormat = harga.toLocaleString('id-ID');
    
    // Menampilkan pesan pop-up
    alert(`Terima kasih!\nAnda telah memilih: ${namaKarya}\nTotal tagihan: Rp ${hargaFormat}\n\nFitur pembayaran akan segera hadir.`);
}