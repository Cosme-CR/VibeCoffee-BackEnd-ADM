// importe do express
const controlerUsuario = require("../controller/usuario/controler_usuario.js")

const express = require("express")

// cria objeto de rota para o arquivo
const router = express.Router()

// Importa o body-parser 
const bodyParser = require("body-parser")
// Cria a função que processa o JSON 
const boddyParserJSON = bodyParser.json()


//////////////////////////////////////////////////////////////////////////
// USUÁRIO
//////////////////////////////////////////////////////////////////////////

// Inserir usuário
router.post("/", boddyParserJSON, async function(request, response){

    let dados = request.body
    let conteType = request.headers['content-type']

    let result = await controlerUsuario.inserirNovoUsuario(dados, conteType)

    response.status(result.status_code)
    response.json(result)

})

// Buscar usuário
router.get("/:id", async function(request, response){

    let id = request.params.id

    let result = await controlerUsuario.buscarUsuario(id)

    response.status(result.status_code)
    response.json(result)

})

// Listar usuários
router.get("/", async function(request, response){

    let result = await controlerUsuario.listarUsuarios()

    response.status(result.status_code)
    response.json(result)

})

// Atualizar usuário
router.put("/:id", boddyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controlerUsuario.atualizarUsuario(
        dados,
        id,
        contentType
    )

    response.status(result.status_code)
    response.json(result)

})

// Deletar usuário
router.delete("/:id", async function(request, response){

    let id = request.params.id

    let result = await controlerUsuario.apagarUsuario(id)

    response.status(result.status_code)
    response.json(result)

})


//exporte pro app ter acessoas rota do usuario
module.exports = router