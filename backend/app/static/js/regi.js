function show(){
    const eye = document.getElementById('togglePassword2');
    const pass = document.getElementById('password2');
    if (pass.type== "password"){
        // pass.classList.add('auth-in-0');    // add new class
        // pass.classList.remove('auth-in');
        pass.type = "text";
        eye.textContent = "🙈";

    }
    else{
    //     pass.classList.add('auth-in');    // add new class
    //     pass.classList.remove('auth-in-0');
        pass.type = "password";
        eye.textContent="👁️";
    }
}