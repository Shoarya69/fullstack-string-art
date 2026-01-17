function updatepins(value){ 
            document.getElementById('volumeValue').textContent =  `pins:- ${value} pins`;
        }
function updateliwt(value){
            document.getElementById('line-wt').textContent = `li-wt:- ${value} line-width`;
        }
function updatemxli(value){
            document.getElementById('mx-line').textContent = `mx-li: ${value} max lines`;
        }
        
        
        
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('up_fo_pro');
    const input = document.getElementById('fi_in_pro');
    
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
function uploadpic(image){
            if(image.files && image.files[0]){
                const file = image.files[0];
                const img = document.getElementById('pic');
                img.src = URL.createObjectURL(file);
            }
        }

function loader(){
    const a = document.getElementById("uploadForm")
    const b = document.getElementById("loader")
    a.classList.add('hidden')
    b.classList.remove('hidden')
}