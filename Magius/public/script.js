function abrirPopUp() {
  document.getElementById("pop-up").style.display = "block";
}

function fecharPopUp() {
  document.getElementById("pop-up").style.display = "none";
}

document.getElementById("myForm").addEventListener("submit", function (event) {
  // Previne que a pagina seja recarregada
  // event.preventDefault();

  // Cria objeto que irá armazenar os valores das perguntas
  const perguntas = {};

  // Define o número de perguntas do formulário
  const num_perguntas = 25;

  // Obter os valores do formulário
  for (let i = 1; i <= num_perguntas; i++) {
    const valor = document.querySelector(`input[name="p${i}"]:checked`).value;

    perguntas[`pergunta${i}`] = valor;
  }

  // Configuracao para se comunicar com o servidor
  const url = "http://localhost:3000";
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
    body: JSON.stringify(perguntas),
  };

  // Envia as perguntas para o servidor(index.js) enviar para o mongodb
  fetch(url, config)
    .then(() => window.alert("Resposta enviada com sucesso!"))
    .catch((error) => {
      window.alert("Erro ao enviar resposta: " + error.message);
    });
});
