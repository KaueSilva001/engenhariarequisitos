document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector('.wrapper');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const loginForm = document.querySelector(".form-box.login form");

    registerLink.onclick = () => {
        wrapper.classList.add('active');
    }

    loginLink.onclick = () => {
        wrapper.classList.remove('active');
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        window.location.href = "inicio.html";
    });
});
