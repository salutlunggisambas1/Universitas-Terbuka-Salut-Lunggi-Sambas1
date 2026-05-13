

const form = document.getElementById("formPendaftaran");


// =========================
// PREVIEW IMAGE
// =========================
function previewImage(inputId, previewId){

    const input =
    document.getElementById(inputId);

    const preview =
    document.getElementById(previewId);

    input.addEventListener("change", function(e){

        const file = e.target.files[0];

        if(file){

            if(file.type.startsWith("image")){

                preview.src =
                URL.createObjectURL(file);

                preview.style.display =
                "block";

            } else {

                preview.style.display =
                "none";

            }

        }

    });

}


// =========================
// AKTIFKAN PREVIEW
// =========================

previewImage(
    "foto_diri",
    "preview_foto"
);

previewImage(
    "ktp",
    "preview_ktp"
);


// =========================
// CONVERT FILE TO BASE64
// =========================
function toBase64(file){

    return new Promise((resolve, reject) => {

        if(!file){

            resolve("");
            return;

        }

        const reader =
        new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {

            resolve(
                reader.result.split(",")[1]
            );

        };

        reader.onerror = error => {

            reject(error);

        };

    });

}


// =========================
// VALIDASI FORM
// =========================
function validateForm(){

    const nama =
    document.querySelector(
        '[name="nama"]'
    ).value;

    const nik =
    document.querySelector(
        '[name="nik"]'
    ).value;

    const email =
    document.querySelector(
        '[name="email"]'
    ).value;

    const ijazah =
    document.getElementById(
        "ijazah"
    ).files[0];


    // =========================
    // VALIDASI WAJIB
    // =========================

    if(!nama || !nik || !email){

        alert(
            "⚠️ Nama, NIK, dan Email wajib diisi!"
        );

        return false;

    }


    // =========================
    // VALIDASI PDF
    // =========================

    if(ijazah){

        // wajib pdf
        if(
            ijazah.type !==
            "application/pdf"
        ){

            alert(
                "⚠️ File ijazah wajib PDF!"
            );

            return false;

        }

        // maksimal 3MB
        const maxSize =
        3 * 1024 * 1024;

        if(ijazah.size > maxSize){

            alert(
                "⚠️ Ukuran PDF maksimal 3MB!"
            );

            return false;

        }

    }

    return true;

}


// =========================
// SUBMIT FORM
// =========================
form.addEventListener(
"submit",
async function(e){

  e.preventDefault();

const yakin = confirm(
"Periksa kembali data Anda sebelum dikirim.\nPastikan semua data sudah benar."
);

if(!yakin){
    return;
}

// VALIDASI
if(!validateForm()) return;

    // =========================
    // AMBIL FILE
    // =========================

    const foto =
    document.getElementById(
        "foto_diri"
    ).files[0];

    const ktp =
    document.getElementById(
        "ktp"
    ).files[0];

    const ijazah =
    document.getElementById(
        "ijazah"
    ).files[0];


    // =========================
    // BUTTON LOADING
    // =========================

    const btn =
    document.querySelector(
        ".submit"
    );

    btn.innerText =
    "Mengirim...";

    btn.disabled = true;


    try{

        // =========================
        // SIAPKAN DATA
        // =========================

        const data = {

            nama:
            document.querySelector(
                '[name="nama"]'
            ).value,

            nik:
            document.querySelector(
                '[name="nik"]'
            ).value,

            tempat:
            document.querySelector(
                '[name="tempat"]'
            ).value,

            tanggal:
            document.querySelector(
                '[name="tanggal"]'
            ).value,

            jk:
            document.querySelector(
                '[name="jk"]'
            ).value,

            email:
            document.querySelector(
                '[name="email"]'
            ).value,

            agama:
            document.querySelector(
                '[name="agama"]'
            ).value,

            hp:
            document.querySelector(
                '[name="hp"]'
            ).value,

            status:
            document.querySelector(
                '[name="status"]'
            ).value,

            ibu:
            document.querySelector(
                '[name="ibu"]'
            ).value,

            alamat:
            document.querySelector(
                '[name="alamat"]'
            ).value,

            kodepos:
            document.querySelector(
                '[name="kodepos"]'
            ).value,

            asalSekolah:
            document.querySelector(
                '[name="asalSekolah"]'
            ).value,

            tahunLulus:
            document.querySelector(
                '[name="tahunLulus"]'
            ).value,

            jalur:
            document.querySelector(
                '[name="jalur"]:checked'
            )?.value || "",

            jurusan:
            document.querySelector(
                '[name="jurusan"]'
            ).value,


            // FILE BASE64
            foto:
            await toBase64(foto),

            ktp:
            await toBase64(ktp),

            ijazah:
            await toBase64(ijazah)

        };


        // =========================
        // FETCH APPS SCRIPT
        // =========================

const response = await fetch(
"https://script.google.com/macros/s/AKfycbyzLW5X7qZlQEal-AyZJmapD6rXdGcan80FGBCDT0nDRyV1U5V5faH8mTfCNl-PxdrpfA/exec",
{
    method: "POST",

    body: new URLSearchParams(data)
});

const result = await response.text();

console.log(result);


        // =========================
        // SUCCESS
        // =========================

        alert(
            "🎉 Pendaftaran berhasil dikirim!"
        );

        form.reset();


        // reset preview
        document
        .querySelectorAll(".preview")
        .forEach(img => {

            img.style.display =
            "none";

        });

    } catch(err){

        console.error(err);

        alert(
            "❌ Gagal mengirim data!"
        );

    }


    // =========================
    // RESET BUTTON
    // =========================

    btn.innerText =
    "Daftar Sekarang";

    btn.disabled = false;

});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const navbar = document.querySelectorAll('.navbar a');
    const namaUniv = document.querySelector('.logo-text .utama');
    const subUniv = document.querySelector('.logo-text small');

    if (window.scrollY > 50) {
        header.style.background = 'white';
        navbar.forEach(a => a.style.color = '#1e3c72');
        namaUniv.style.color = '#1e3c72';
        subUniv.style.color = '#436b95';
    } else {
        header.style.background = 'rgba(255,255,255,0.1)';
        navbar.forEach(a => a.style.color = 'white');
        namaUniv.style.color = 'white';
        subUniv.style.color = 'rgba(255,255,255,0.8)';
    }
});


// =========================
// AUTO UPPERCASE
// =========================
document
.querySelectorAll("input:not([type='email']), textarea")
.forEach(el => {

    el.addEventListener("input", function(){

        this.value =
        this.value.toUpperCase();

    });

});
