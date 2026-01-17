async function autoUpload() {
  // console.log("⚡ autoUpload triggered");
  const form = document.getElementById("uploadForm");
  const input = document.getElementById("fileInput");
  const file = input.files[0];
  console.log("📁 Selected file:", file);

  if (!file) return alert("No file selected");

  const formData = new FormData(form);
  console.log("🧾 FormData entries:", [...formData.entries()]);

  const response = await fetch(form.action, {
    method: "POST",
    body: formData,
    credentials: "same-origin"
  });

  console.log("🔁 Response:", response.status);
  if (response.ok) window.location.reload();
  else alert("Upload failed!");
}


function loader(){
    const a = document.getElementById("uploadForm_mob_12345")
    const b = document.getElementById("loader_mob_12345")
    a.classList.add('hidden')
    b.classList.remove('hidden')
}

function dot(image){
            if(image.files && image.files[0]){
                const file = image.files[0];
                const img = document.getElementById('preview');
                img.src = URL.createObjectURL(file);
            }
        }

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('uploadForm');
    const input = document.getElementById('fileinput');
    
    form.addEventListener('submit', function(e) {
        const file = input.files[0];
        if (!file) return;

        const maxSize = 2 * 1024 * 1024; // 2 MB
        if (file.size > maxSize) {
            e.preventDefault();
            // alert("File is too big! Max allowed size is 1MB.");
            // const tooLargeURL = "{{ url_for('too_large') }}";
            window.location.href = tooLargeURL;
        }
    });
});