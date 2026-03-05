// ===== ELEMENTOS =====
const form = document.getElementById("formDenuncia");
const lista = document.getElementById("listaDenuncias");
const inputFile = document.getElementById("envio");
const preview = document.getElementById("preview");

// ===== CARREGAR DENÚNCIAS =====
document.addEventListener("DOMContentLoaded", carregarDenuncias);

/*function carregarDenuncias() {
    if (!lista) return;

    const denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
    lista.innerHTML = "";

    denuncias.forEach((denuncia, index) => {
        lista.innerHTML += `
            <div class="cardDenuncia">
                <strong>${denuncia.nome}</strong> - ${denuncia.opcao}<br>
                <small>${denuncia.email}</small>
                <p>${denuncia.descricao}</p>
                <button onclick="removerDenuncia(${index})">Remover</button>
                <hr>
            </div>
        `;
    });
}
*/
function carregarDenuncias() {
    if (!lista) return;

    const denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
    lista.innerHTML = "";

    denuncias.forEach((denuncia, index) => {

        let imagensHTML = "";

        if (denuncia.imagens) {
            denuncia.imagens.forEach(img => {
                imagensHTML += `<img src="${img}" style="max-width:200px; margin:5px; border-radius:8px;">`;
            });
        }

        lista.innerHTML += `
            <div class="cardDenuncia">
                <strong>${denuncia.nome}</strong> - ${denuncia.opcao}<br>
                <small>${denuncia.email}</small>
                <p>${denuncia.descricao}</p>
                <div>${imagensHTML}</div>
                <button onclick="removerDenuncia(${index})">Remover</button>
                <hr>
            </div>
        `;
    });
}

// ===== ENVIAR FORMULÁRIO =====
/*if (form) {
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const opcao = document.getElementById("opcao").value;
    const descricao = document.getElementById("descricao").value.trim();
    const arquivos = document.getElementById("envio").files;

    if(nome === "" || email === "" || opcao === "" || descricao === "" || arquivos.length === 0) {
        alert("Por favor, preencha todos os campos e envie uma foto da denúncia.");
        return;
    }

    const novaDenuncia = { nome, email, opcao, descricao };

    const denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
    denuncias.push(novaDenuncia);

    localStorage.setItem("denuncias", JSON.stringify(denuncias));

    alert("Denúncia enviada com sucesso! Obrigado por contribuir com a sua cidade 💙");

    form.reset();
});
}*/

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const opcao = document.getElementById("opcao").value;
    const descricao = document.getElementById("descricao").value.trim();
    const arquivos = document.getElementById("envio").files;

    if (nome === "" || email === "" || opcao === "" || descricao === "" || arquivos.length === 0) {
        alert("Por favor, preencha todos os campos e envie uma foto da denúncia.");
        return;
    }

    let imagens = [];
    let arquivosProcessados = 0;

    for (let i = 0; i < arquivos.length; i++) {

        const reader = new FileReader();

        reader.onload = function (e) {

            imagens.push(e.target.result);
            arquivosProcessados++;

            if (arquivosProcessados === arquivos.length) {

                const novaDenuncia = {
                    nome,
                    email,
                    opcao,
                    descricao,
                    imagens
                };

                const denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
                denuncias.push(novaDenuncia);

                localStorage.setItem("denuncias", JSON.stringify(denuncias));

                alert("Denúncia enviada com sucesso! 💚");

                form.reset();
                preview.innerHTML = "";
                carregarDenuncias();
            }
        };

        reader.readAsDataURL(arquivos[i]);
    }

});

// ===== REMOVER DENÚNCIA =====
function removerDenuncia(index) {
    const denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];

    denuncias.splice(index, 1);

    localStorage.setItem("denuncias", JSON.stringify(denuncias));

    carregarDenuncias();
}

// ===== PRÉ-VISUALIZAÇÃO DE IMAGENS =====
if (inputFile) {
    inputFile.addEventListener("change", function () {

        preview.innerHTML = "";
        const arquivos = this.files;

        if (arquivos.length > 0) {
            preview.style.display = "block";

            for (let i = 0; i < arquivos.length; i++) {
                const file = arquivos[i];

                if (file.type.startsWith("image/")) {

                    const reader = new FileReader();

                    reader.onload = function (e) {

                        const img = document.createElement("img");
                        img.src = e.target.result;
                        img.style.maxWidth = "150px";
                        img.style.margin = "5px";
                        img.style.borderRadius = "8px";

                        preview.appendChild(img);

                    };

                    reader.readAsDataURL(file);
                }
            }
        } else {
            preview.style.display = "none";
        }
    });
}
