/*****************************************************************************************
 * Objetivo: controla a rota de autenticacao
 * Data:     10/06/2026
 * Autor:    Cosme Ribeiro
 * Versão:   1.0
 *****************************************************************************************/

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
// AUTENTICAR USUÁRIO
//////////////////////////////////////////////////////////////////////////

router.post("/", boddyParserJSON, async function(request, response){

    let dados = request.body
    let conteType = request.headers['content-type']

    let result = await controlerUsuario.autenticarUsuario(dados, conteType)

    response.status(result.status_code)
    response.json(result)

})

//exporte pro app ter acessoas rota de autenticacao
module.exports = router
