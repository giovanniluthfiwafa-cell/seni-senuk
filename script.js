// Mengimpor modul Firebase dari Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyB--TePuTJhqq6LwTBU3AC2NtibcdcT4vI",
  authDomain: "seni-senuk.firebaseapp.com",
  projectId: "seni-senuk",
  storageBucket: "seni-senuk.firebasestorage.app",
  messagingSenderId: "420208554604",
  appId: "1:420208554604:web:977388095d8b40ba259e49"
};

// Menghidupkan Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi Menampilkan Karya dari Firebase
async function muatGaleri() {
    const galeri = document.getElementById('daftar-karya');
    galeri.innerHTML = '<p>Memuat karya dari server...</p>'; 

    try {
        const querySnapshot = await getDocs(collection(db, "karya_seni"));
        galeri.innerHTML = ''; 
        
        querySnapshot.forEach((doc) => {
            const karya = doc.data();
            let hargaFormat = parseInt(karya.harga).toLocaleString('id-ID');

            galeri.innerHTML += `
                <div class="kartu-karya">
                    <img src="${karya.gambar}" alt="${karya.judul}" style="width:100%; height:200px; object-fit:cover;">
                    <h3>${karya.judul}</h3>
                    <p class="harga">Rp ${hargaFormat}</p>
                    <button onclick="alert('Fitur pembayaran sedang dalam pengembangan!')">Beli Karya Ini</button>
                </div>
            `;
        });
    } catch (error) {
        galeri.innerHTML = '<p>Galeri masih kosong atau terjadi kesalahan.</p>';
        console.error(error);
    }
}

// Fungsi Mengunggah Karya ke Firebase
const formUpload = document.getElementById('formUpload');
if(formUpload) {
    formUpload.addEventListener('submit', async function(event) {
        event.preventDefault(); 
        
        // Mengambil data dari input di index.html
        const linkGambar = document.getElementById('linkGambar').value;
        const judulInput = document.getElementById('judulKarya').value;
        const hargaInput = document.getElementById('hargaKarya').value;

        try {
            // Mengirim data ke Firebase menggunakan link gambar dari user
            await addDoc(collection(db, "karya_seni"), {
                judul: judulInput,
                harga: hargaInput,
                gambar: linkGambar 
            });
            
            alert(`✅ Keren! Karya "${judulInput}" berhasil disimpan ke Database online.`);
            formUpload.reset(); 
            muatGaleri(); // Refresh galeri otomatis agar gambar langsung muncul
            
        } catch (error) {
            alert("❌ Gagal menyimpan data ke Firebase.");
            console.error(error);
        }
    });
}

// Tampilkan galeri saat web dibuka pertama kali
muatGaleri();
