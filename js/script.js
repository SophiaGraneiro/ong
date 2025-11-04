function toggleMenu() {
  const nav = document.querySelector("nav ul");
  if (nav) nav.classList.toggle("ativo");
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function carregarPagina(pagina) {
  const conteudo = document.getElementById("conteudo-principal");
  if (!conteudo) return;
  conteudo.innerHTML = "<p>Carregando...</p>";

  try {
    const resp = await fetch(`js/template/${pagina}.html`);
    if (!resp.ok) throw new Error("Erro ao carregar template");
    const html = await resp.text();
    conteudo.innerHTML = html;
    initLoadedContent();
  } catch (err) {
    console.error(err);
    conteudo.innerHTML = "<p>Não foi possível carregar a página. Tente novamente.</p>";
  }
}

function initNavigation() {
  document.querySelectorAll("nav a[data-section]").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const section = this.dataset.section;
      window.location.hash = section;
      carregarPagina(section);
    });
  });

  window.addEventListener("popstate", () => {
    const page = location.hash.replace("#", "") || "home";
    carregarPagina(page);
  });

  const inicial = location.hash.replace("#", "") || "home";
  carregarPagina(inicial);
}

function initLoadedContent() {

  const formApoio = document.getElementById("apoio");
  const mensagemApoio = document.getElementById("mensagem-apoio");
  const listaApoiosKey = "listaApoios";

  function carregarApoiosDoStorage() {
    try {
      const raw = localStorage.getItem(listaApoiosKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function salvarApoiosNoStorage(arr) {
    localStorage.setItem(listaApoiosKey, JSON.stringify(arr));
  }

  function renderApoios() {
    const container = document.getElementById("lista-apoios");
    const arr = carregarApoiosDoStorage();
    if (!container) return;
    if (arr.length === 0) {
      container.innerHTML = "<p>Nenhum apoio registrado ainda.</p>";
      return;
    }
    container.innerHTML = arr
      .map(
        a => `
      <div style="border:1px dashed #aaa;padding:8px;margin:8px 0;border-radius:6px;">
        <h4>${escapeHtml(a.nome)}</h4>
        <p><strong>E-mail:</strong> ${escapeHtml(a.email)}</p>
        <p><strong>Tipo:</strong> ${escapeHtml(a.tipo)}</p>
        <small style="color:#666">Registrado em ${new Date(a.criadoEm).toLocaleString()}</small>
      </div>
    `
      )
      .join("");
  }

  if (formApoio && mensagemApoio) {
    renderApoios();

    formApoio.addEventListener("submit", function (ev) {
      ev.preventDefault();
      const nome = document.getElementById("nome-apoio").value.trim();
      const email = document.getElementById("email-apoio").value.trim();
      const tipo = document.getElementById("tipo_apoio").value.trim();

      if (!nome || !email || !tipo) {
        mensagemApoio.textContent = "Por favor, preencha todos os campos.";
        mensagemApoio.style.color = "red";
        mensagemApoio.style.display = "block";
        return;
      }

      // valida e-mail
      const emailNormalizado = email.trim().toLowerCase();
      const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!regexEmail.test(emailNormalizado)) {
        mensagemApoio.textContent = "Por favor, digite um e-mail válido (ex: nome@dominio.com).";
        mensagemApoio.style.color = "red";
        mensagemApoio.style.display = "block";
        return;
      }

      const arr = carregarApoiosDoStorage();
      arr.unshift({ nome, email, tipo, criadoEm: Date.now() });
      salvarApoiosNoStorage(arr);
      renderApoios();

      mensagemApoio.textContent = "Obrigado pelo seu apoio! Registro recebido.";
      mensagemApoio.style.color = "green";
      mensagemApoio.style.display = "block";
      formApoio.reset();

      setTimeout(() => {
        window.location.hash = "home";
        carregarPagina("home");
      }, 3000);
    });
  }

  const listaVoluntariosKey = "listaVoluntarios";

  function carregarVoluntariosDoStorage() {
    try {
      const raw = localStorage.getItem(listaVoluntariosKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Erro ao ler voluntários do storage:", e);
      return [];
    }
  }

  function salvarVoluntariosNoStorage(arr) {
    try {
      localStorage.setItem(listaVoluntariosKey, JSON.stringify(arr));
    } catch (e) {
      console.error("Erro ao salvar voluntários no storage:", e);
    }
  }

  function renderVoluntarios() {
    const container = document.getElementById("lista-voluntarios");
    if (!container) return;
    const arr = carregarVoluntariosDoStorage();
    if (!arr || arr.length === 0) {
      container.innerHTML = "<p>Nenhum voluntário cadastrado ainda.</p>";
      return;
    }
    container.innerHTML = arr
      .map(
        v => `
      <div style="border:1px solid #ccc;padding:8px;margin:8px 0;border-radius:6px;">
        <h4>${escapeHtml(v.nome)}</h4>
        <p><strong>E-mail:</strong> ${escapeHtml(v.email)}</p>
        <p><strong>Disponibilidade:</strong> ${escapeHtml(v.disponibilidade || "Não informada")}</p>
        <p><strong>Cidade:</strong> ${escapeHtml(v.cidade || "Não informada")}</p>
        <small style="color:#666">Registrado em ${new Date(v.criadoEm).toLocaleString()}</small>
      </div>
    `
      )
      .join("");
  }

  renderVoluntarios();

  const formVol = document.getElementById("Formulario");
  const mensagemVol = document.getElementById("mensagem");
  if (formVol && mensagemVol) {
    formVol.addEventListener("submit", function (ev) {
      ev.preventDefault();

      const nomeEl = document.getElementById("nome");
      const emailEl = document.getElementById("email");
      const dispEl = document.getElementById("disponibilidade");
      const cidadeEl = formVol.querySelector("#cidade");

      const nome = nomeEl ? nomeEl.value.trim() : "";
      const email = emailEl ? emailEl.value.trim() : "";
      const disponibilidade = dispEl ? dispEl.value.trim() : "";
      const cidade = cidadeEl && cidadeEl.value ? cidadeEl.value.trim() : "";

      if (!nome || !email) {
        mensagemVol.textContent = "Por favor, preencha todos os campos obrigatórios.";
        mensagemVol.style.color = "red";
        mensagemVol.style.display = "block";
        return;
      }

      const emailNormalizado = email.trim().toLowerCase();
      const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!regexEmail.test(emailNormalizado)) {
        mensagemVol.textContent = "Por favor, digite um e-mail válido (ex: nome@dominio.com).";
        mensagemVol.style.color = "red";
        mensagemVol.style.display = "block";
        return;
      }

      const arr = carregarVoluntariosDoStorage();
      arr.unshift({
        nome,
        email,
        disponibilidade,
        cidade,
        criadoEm: Date.now()
      });
      salvarVoluntariosNoStorage(arr);

      renderVoluntarios();

      mensagemVol.textContent = "Cadastro enviado com sucesso!";
      mensagemVol.style.color = "green";
      mensagemVol.style.display = "block";
      formVol.reset();

      setTimeout(() => {
        window.location.hash = "voluntarios";
        carregarPagina("voluntarios");
      }, 1200);
    });
  }

  const btnVol = document.getElementById("btn-carregar-voluntarios");
  if (btnVol) {
    btnVol.addEventListener("click", function () {
      const container = document.getElementById("lista-voluntarios");
      if (!container) {
        alert("Erro: 'lista-voluntarios' não encontrada.");
        return;
      }
      try {
        const lista = [
          { nome: "Maria Eliza", cidade: "São Paulo", disponibilidade: "Fins de semana" },
          { nome: "Luiz Davi", cidade: "Campinas", disponibilidade: "Noite" },
          { nome: "João Paulo", cidade: "São Paulo", disponibilidade: "3 vezes na semana" },
          { nome: "Ana Alice", cidade: "São Paulo", disponibilidade: "Todos os dias" },
          { nome: "Pedro Henrique", cidade: "Campinas", disponibilidade: "Feriados" },
          { nome: "Ataliba", cidade: "Atibaia", disponibilidade: "Terça e Quinta" }
        ];
     const base = [...lista, ...carregarVoluntariosDoStorage()];
     container.innerHTML = base
        .map(
          v => `
          <div style="border:1px solid #bdb7b7ff;padding:8px;margin:8px 0;border-radius:6px;">
            <h4>${escapeHtml(v.nome)}</h4>
            <p><strong>Cidade:</strong> ${escapeHtml(v.cidade || "Não informada")}</p>
            <p><strong>Disponibilidade:</strong> ${escapeHtml(v.disponibilidade || "Não informada")}</p>
          </div>
        `
        )
        .join("");
      } catch (error) {
        console.error("Erro ao carregar lista de voluntários:", error);
        container.innerHTML = "<p style='color:red;'>Não foi possível carregar a lista de voluntários.</p>";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
});
