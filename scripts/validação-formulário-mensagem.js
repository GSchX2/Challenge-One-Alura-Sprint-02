const formularioRodape = document.querySelector('[data-form-msg]');

function validacaoFormularioRodape(evento) {
    evento.preventDefault();

    if (formularioRodape.elements['nome'].value.length < 3) {
        alert("O campo nome não foi preenchido corretamente");
    }

    if (formularioRodape.elements['mensagem'].value === "") {
        alert("Nenhuma mensagem foi escrita");
    }
}


formularioRodape.addEventListener("submit", validacaoFormularioRodape);