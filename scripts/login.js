const login = document.querySelector('[data-login]');

login.addEventListener("submit", (evento) => {
    evento.preventDefault();

    window.location.href = "../views/menu-administrador.html";
})