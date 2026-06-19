/*****************************************************************************************
 * Objetivo: controla a rota de tipo_categoria
 * Data:     18/06/2026
 * Autor:    Lucas Duarte
 * Versão:   1.0
 *****************************************************************************************/

const express = require("express")
const router  = express.Router()

const bodyParser     = require("body-parser")
const bodyParserJSON = bodyParser.json()

const controllerTipoCategoria = require("../controller/categoria/controller_tipo_categoria.js")

// Listar todos os tipo_categoria com nomes
router.get("/", async function(request, response){
    let result = await controllerTipoCategoria.listarTipoCategoria()
    response.status(result.status_code)
    response.json(result)
})

module.exports = router