const express = require("express");
const axios = require("axios");

// PORTA QUE O SERVIDOR VAI FUNCIONAR
const PORT = 3000;
const app = express();

// PERMITE QUE O SERVIDOR RECEBA JSON
app.use(express.json());
app.use(express.static("public"));

// ROTA QUE SERA USADA PARA SALVAR AS PERGUNTAS NO MONGO
app.route("*").post((req, res) => {
  const data = JSON.stringify({
    collection: "respostas",
    database: "magius",
    dataSource: "Magius-Form",
    document: req.body,
  });

  // CONFIGURACAO DA REQUISICAO
  const config = {
    method: "post",
    url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-syiod/endpoint/data/v1/action/insertOne",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "B1Ir1QFCn0PqXha6W7cPNJbGT91ad9CYqo1c8UCQtSe6RC6bYHXNFayAZgY2nV4F",
    },
    data,
  };

  // AXIOS EH USADO PARA FACILITAR O USO DO FETCH(FAZER REQUISICAO)
  axios(config)
    .then(function (res) {
      res.send(res.data);
    })
    .catch(function (err) {
      res.send(err);
    });
});

// INICIA O SERVIDOR NA PORTA DEFINIDA NO INICIO DO CODIGO
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
