document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('for_test_form-mobile');
    const input = document.getElementById('fi_test_input-mobile');
    
    form.addEventListener('submit', function(e) {
        const file = input.files[0];
        if (!file) return;

        const maxSize = 10 * 1024 * 1024; // 10 MB
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
    const a = document.getElementById("pic_for_loader")
    const b = document.getElementById("loader")
    a.classList.add('hidden')
    b.classList.remove('hidden')
}