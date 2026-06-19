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
    origin: '*',
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"]
}

// Habilita CORS na API
app.use(cors(corsOptions))

//////////////////////////////////////////////////////////////////////////
// TOKEN E VALIDACAO
//////////////////////////////////////////////////////////////////////////
async function verifyJWT(request, response, next) {
    //importa 
    let jwt = require("./Middleware/MiddlewareJWT.js")

    //pega o token do headres
    let token = request.headers["x-access-token"]
    
    let autenticidadeToken= await jwt.validaJWT(token)
    if (autenticidadeToken) {
        next();
    }else{
        return response.status(401).end()
    }    
}

//////////////////////////////////////////////////////////////////////////
// AUTENTICAR
//////////////////////////////////////////////////////////////////////////
const autenticaRouter = require("./routes/autenticar.routes.js")
app.use("/v1/vibecoffee/autenticar", cors(),autenticaRouter)

//////////////////////////////////////////////////////////////////////////
// PRODUTO
//////////////////////////////////////////////////////////////////////////
const produtoRouter = require("./routes/produto.routes.js")
app.use("/v1/vibecoffee/produto", verifyJWT, cors(),produtoRouter)

//////////////////////////////////////////////////////////////////////////
// CATEGORIA
//////////////////////////////////////////////////////////////////////////
const categoriaRouter = require("./routes/categoria.routes.js")
app.use("/v1/vibecoffee/categoria", verifyJWT, cors(),categoriaRouter)

//////////////////////////////////////////////////////////////////////////
// Tipo
//////////////////////////////////////////////////////////////////////////
const tipoRouter = require("./routes/tipo.routes.js")
app.use("/v1/vibecoffee/tipo", verifyJWT, cors(),tipoRouter)

//////////////////////////////////////////////////////////////////////////
// TIPO CATEGORIA
//////////////////////////////////////////////////////////////////////////
const tipoCategoriaRouter = require("./routes/tipo_categoria.routes.js")
app.use("/v1/vibecoffee/tipocategoria", verifyJWT, cors(), tipoCategoriaRouter)

//////////////////////////////////////////////////////////////////////////
// USUARIO
//////////////////////////////////////////////////////////////////////////
const usuarioRouter = require("./routes/usuario.routes.js")
app.use("/v1/vibecoffee/usuario", verifyJWT, cors(),usuarioRouter)

//////////////////////////////////////////////////////////////////////////
// INICIAR API
//////////////////////////////////////////////////////////////////////////

app.listen(8080, function(){
    console.log("API funcionando em http://localhost:8080")
})















