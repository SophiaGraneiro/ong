function toggleMenu() {
    const nav = document.querySelector("nav ul");
    nav.classList.toggle("ativo");
}

document.getElementById("Formulario").addEventListener("submit", function(event) {
    event.preventDefault();  // impede envio automatico

    const nome = document.getElementById("nome").value.trim();
    const data_nascimento = document.getElementById("data_nascimento").value.trim();
    const email = document.getElementById("email").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const estado = document.getElementById("estado").value.trim();
    const disponibilidade = document.getElementById("disponibilidade").value.trim();
    const motivacao = document.getElementById("motivacao").value.trim();
    const sobre = document.getElementById("sobre").value.trim();
    const mensagem = document.getElementById("mensagem");

    if (nome === "" || data_nascimento === "" || email === "" || cpf === "" || telefone === "" || endereco === "" || 
        cep === "" || cidade === "" || estado === "" || disponibilidade === "" || motivacao === "" || sobre === "" ){
            mensagem.textContent = "Por favor, preencha todos os campos.";
            mensagem.style.color = "red";
            mensagem.style.fontWeight = "bold";
            return;
        }
       const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
       if (!emailValido) {
        mensagem.textContent = "Digite um e-mail válido.";
        mensagem.style.color = "red";
        mensagem.style.fontWeight = "bold";
        return;
       }

       const cpfValido = /^\d{11}$/.test(cpf);
if (!cpfValido) {
  mensagem.textContent = "Digite um CPF válido (11 números).";
  mensagem.classList.add("msg-erro");
  return;
}

const telefoneValido = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(telefone);
if (!telefoneValido) {
  mensagem.textContent = "Digite um telefone válido.";
  mensagem.classList.add("msg-erro");
  return;
}
    mensagem.textContent = "Formulário enviado com sucesso!";
     mensagem.style.color = "green";
});

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("apoio");
  const mensagem = document.getElementById("mensagem-apoio");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // impede envio automático

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const tipoApoio = document.getElementById("tipo_apoio").value.trim();

    // Verifica se os campos foram preenchidos
    if (nome === "" || email === "" || tipoApoio === "") {
      mensagem.textContent = "Por favor, preencha todos os campos antes de enviar.";
      mensagem.style.color = "red";
      mensagem.style.fontWeight = "bold";
      return;
    }

    // Verifica formato do e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      mensagem.textContent = "Digite um e-mail válido.";
      mensagem.style.color = "red";
      mensagem.style.fontWeight = "bold";
      return;
    }

    mensagem.textContent = "Obrigado pelo seu apoio! Formulário enviado com sucesso.";
    mensagem.style.color = "green";
    mensagem.style.fontWeight = "bold";

    // Limpa o formulário
    form.reset();
  });
});



