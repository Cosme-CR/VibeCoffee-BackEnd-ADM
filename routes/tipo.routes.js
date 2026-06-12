// importe do express
const controllerTipo = require("../controller/tipo/controler_tipo.js")

const express = require("express")

// cria objeto de rota para o arquivo
const router = express.Router()

// Importa o body-parser 
const bodyParser = require("body-parser")
// Cria a função que processa o JSON 
const bodyParserJSON = bodyParser.json()

//////////////////////////////////////////////////////////////////////////
// TIPO
//////////////////////////////////////////////////////////////////////////

// Inserir tipo
router.post("/", bodyParserJSON, async function(request, response){

    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerTipo.inserirNovoTipo(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

// Buscar tipo
router.get("/:id", async function(request, response){

    let id = request.params.id

    let result = await controllerTipo.buscarTipo(id)

    response.status(result.status_code)
    response.json(result)

})

// Listar tipos
router.get("/", async function(request, response){

    let result = await controllerTipo.listarTipo()

    response.status(result.status_code)
    response.json(result)

})

// Atualizar tipo
router.put("/:id", bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerTipo.atualizarTipo(
        dados,
        id,
        contentType
    )

    response.status(result.status_code)
    response.json(result)

})

// Deletar tipo
router.delete("/:id", async function(request, response){

    let id = request.params.id

    let result = await controllerTipo.apagarTipo(id)

    response.status(result.status_code)
    response.json(result)

})

// exporte pro app ter acesso as rotas do tipo
module.exports = router