/*****************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação dos dados para o CRUD de tipos.
 * Data: 10/06/2025
 * Autor: Cosme Ribeiro
 * Versão: 1.1
 *****************************************************************************************/

// Import da configuração de mensagens
const configMessage = require("../modulo/configMessages.js")

// Import do DAO responsavel por fazer o crud no banco de dados
const TipoDAO = require("../../model/DAO/tipo/tipo.js")

/*****************************************************************************************
 * Inserir novo tipo
 *****************************************************************************************/
async function inserirNovoTipo(tipo, contentType) {

    // Cria uma cópia do objeto de mensagens para evitar alterações no original
    let message = JSON.parse(JSON.stringify(configMessage))
    
    try {
    
        if (String(contentType).toLocaleLowerCase() == 'application/json') {
            
            let validar = await validarDados(tipo)
    
            // se validar retornar algo significa que é json de erro e ja sera retornado 
            if(validar){
                return validar
            }else{
                // Encaminha os dados do tipo para o DAO
                let result = await TipoDAO.insertTipo(tipo)
    
                if (result) {
    
                    tipo.id = result // coloca o id ao cargo apos ele ser inserido no banco 
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = tipo
                            
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL // erro 500
                        
                }
                 return message.DEFAULT_MESSAGE
            }
        }else{return message.ERROR_CONTENT_TYPE} // 415
                
    } catch (error) {
        console.error(error)

        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
        
}

/*****************************************************************************************
 * Buscar tipo por ID
 *****************************************************************************************/
async function buscarTipo(id) {
        // 200 achou
        // 404 nao achou
        // 500 erro na model
        let message = JSON.parse(JSON.stringify(configMessage))
    
        try {
            // Validação para garantir que o ID seja válido
            if (id == undefined || id == "" || id == null ||  isNaN(id) ) {
                message.ERROR_BAD_REQUEST.field = "[ID] invalido"
                return message.ERROR_BAD_REQUEST // 400
            }else{
                
                let result = await TipoDAO.selectByIdTipo(id)
    
                if (result) {
                    if (result.length > 0) {
                        message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                        message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                        message.DEFAULT_MESSAGE.response.tipo       = result
                        
                        return message.DEFAULT_MESSAGE               // 200 sucesso
                    }else{
                        return message.ERROR_NOT_FOUND              // 404
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL      // erro 500 model
                }
            }
    
        } catch (error) {
            console.error(error)

            return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
        }
        
}

/*****************************************************************************************
 * Listar todos os tipos
 *****************************************************************************************/
async function listarTipo() {
    
    let message = JSON.parse(JSON.stringify(configMessage))
        
    try {
            
        let result = await TipoDAO.selectAllTipo()

        // valida se DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length > 0) {
                    
                message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count  = result.length
                message.DEFAULT_MESSAGE.response.tipo   = result
                    
                // retorna tudo
                return message.DEFAULT_MESSAGE // 200 dados do tipo
            }else{
                return message.ERROR_NOT_FOUND // 404
            }
                
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL // 500 model
        }
    
    } catch (error) {
        console.error(error)

        return message.ERROR_INTERNAL_SERVER_CONTROLLER // erro 500 controller
    }
}

/*****************************************************************************************
 * Atualizar tipo
 *****************************************************************************************/
async function atualizarTipo(tipo, id, contentType) {

    // validacao pra aceitar apenas json
    const message = JSON.parse(JSON.stringify(configMessage))

    try {

        if (String(contentType).toLocaleLowerCase() == 'application/json') {
    
                let resultBuscarId = await buscarTipo(id)
                if (resultBuscarId.status) {
                    let validar = await validarDados(tipo)
                    if (!validar) {
                        
                        // Adiciona o atributo ID do tipo ao objeto para atualização
                        tipo.id = id
                        // chama a funcao do dao pra atualizar tipo de dentro do banco de dados
                        let result = await TipoDAO.updateTipo(tipo)
    
                        if (result) {
                            message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATE_ITEM.status
                            message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                            message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATE_ITEM.message
                            message.DEFAULT_MESSAGE.response    = tipo

                            return message.DEFAULT_MESSAGE
     
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL // 500
                        }
                    }else{
                        return validar
                    }
                }else{
                    return resultBuscarId // 400 ou 404 ou 500
                }
            }else{
                return message.ERROR_CONTENT_TYPE // 415 tipo errado
            }

    } catch (error) {

        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
        
/*****************************************************************************************
 * Excluir tipo
 *****************************************************************************************/
async function apagarTipo(id) {

    const message = JSON.parse(JSON.stringify(configMessage))

    try {

        // Verifica se o tipo existe antes de remover
        const resultBuscarId = await buscarTipo(id)

        if (resultBuscarId.status) {
             // Solicita ao DAO a exclusão do tipo
            const result = await TipoDAO.deleteTipo(id)

            if (result) {
                message.DEFAULT_MESSAGE.status      = message.SUCCESS_DELETE_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_DELETE_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_DELETE_ITEM.message

                return message.DEFAULT_MESSAGE
                
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            
        }else{
            return resultBuscarId
        }

    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

/*****************************************************************************************
 * Validação dos dados do tipo
 *****************************************************************************************/
async function validarDados(tipo) {

    const message = JSON.parse(JSON.stringify(configMessage))

    if (
        //!tipo ||
        tipo.tipo         == undefined ||
        tipo.tipo         == null      ||
        tipo.tipo.trim()  == ""        || // trim() remove espaços em branco do início e do final da string
        tipo.tipo.length  > 45
    ) {
        message.ERROR_BAD_REQUEST.field = "[tipo] inválido"
        return message.ERROR_BAD_REQUEST
    }else{return false }
}
   
/*****************************************************************************************
 * Export das funções
 *****************************************************************************************/
module.exports = {
    inserirNovoTipo,
    buscarTipo,
    listarTipo,
    atualizarTipo,
    apagarTipo
}