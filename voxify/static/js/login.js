document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const forgotPasswordLink = document.getElementById('forgot-password-link');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === 'admin' && password === '123') {
            window.location.href = '/disclaimer'; 
        } else {
            alert('Username atau password salah.');
        }
    });

    forgotPasswordLink.addEventListener('click', (event) => {
        event.preventDefault();
        alert('Fitur ini belum bisa digunakan.');
    });

});