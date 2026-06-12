/*****************************************************************************************
 * Objetivo: API VibeCoffee
 * Data: 10/06/2026
 * Autor: Cosme Ribeiro
 * Versão: 1.0
 *****************************************************************************************/

// Import das bibliotecas
const express = require("express")
const cors = require("cors")
const boddyParser = require("body-parser")

// Criando objeto do express
const app = express()

// Configuração do CORS
const corsOptions = {
    origin: ["*"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"]
}

// Habilita CORS na API
app.use(cors(corsOptions))


//////////////////////////////////////////////////////////////////////////
// PRODUTO
//////////////////////////////////////////////////////////////////////////
const produtoRouter = require("./routes/produto.routes.js")

app.use("/v1/vibecoffee/produto", cors(),produtoRouter)

//////////////////////////////////////////////////////////////////////////
// CATEGORIA
//////////////////////////////////////////////////////////////////////////
const categoriaRouter = require("./routes/categoria.routes.js")

app.use("/v1/vibecoffee/categoria", cors(),categoriaRouter)


//////////////////////////////////////////////////////////////////////////
// Tipo
//////////////////////////////////////////////////////////////////////////
const tipoRouter = require("./routes/tipo.routes.js")

app.use("/v1/vibecoffee/tipo", cors(),tipoRouter)



//////////////////////////////////////////////////////////////////////////
// USUARIO
//////////////////////////////////////////////////////////////////////////
const usuarioRouter = require("./routes/usuario.routes.js")

app.use("/v1/vibecoffee/usuario", cors(),usuarioRouter)


//////////////////////////////////////////////////////////////////////////
// INICIAR API
//////////////////////////////////////////////////////////////////////////

app.listen(8080, function(){
    console.log("API funcionando em http://localhost:8080")
})















