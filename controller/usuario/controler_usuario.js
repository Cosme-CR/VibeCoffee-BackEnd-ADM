/*****************************************************************************************
 * Objetivo:    Arquivo responsável pela validação, tratamento e manipulação dos dados para o CRUD de usuario.
 * Data:        10/06/2026
 * Autor:       Cosme Ribeiro
 * Versão:      1.0
 *****************************************************************************************/

// Import do arquivo de padronização de mensagens
const config_message = require("../modulo/configMessages.js")

// Import do DAO de produto
const usuarioDAO = require("../../model/DAO/usuario/usuario.js")




/*****************************************************************************************
 * Função responsável por inserir um novo usuario
 *****************************************************************************************/
async function inserirNovoUsuario(usuario, contentType) {

    // Cria uma cópia do objeto de mensagens para evitar alterações no original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        // Valida se o Content-Type da requisição é JSON
        if (String(contentType).toLocaleLowerCase()== 'application/json') {
            
            // Realiza a validação dos dados recebidos
            let validar = await validarDados(usuario)

            // Caso exista erro na validação, retorna a mensagem correspondente
            if (validar) {
                return validar
            }else{
                // Encaminha os dados para o DAO realizar a inserção no banco
                let result = await usuarioDAO.insertUsuario(usuario)

                // Verifica se o DAO retornou sucesso
                if (result) {

                    // Adiciona ao objeto o ID gerado pelo banco de dados
                    usuario.id = result

                    // Configura a mensagem de sucesso
                    message.DEFAULT_MESSAGE.status          = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message         = message.SUCCESS_CREATED_ITEM.message

                    // Adiciona os dados inseridos ao retorno
                    message.DEFAULT_MESSAGE.response = usuario

                } else {

                    // Retorna erro interno da model
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
                return message.DEFAULT_MESSAGE
            }
        }else{return message.ERROR_CONTENT_TYPE}//415
            
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}


/*****************************************************************************************
 * Função responsável por listar todos os usuarios cadastrados
 *****************************************************************************************/
async function listarUsuarios() {

    // Cria uma cópia do objeto de mensagens para evitar alterações no original
    let message = JSON.parse(JSON.stringify(config_message))


    try {
        // Solicita ao DAO a lista completa de usuarios cadastrados
        let result = await usuarioDAO.selectAllUsuario()

        // Verifica se o DAO conseguiu processar a consulta
        if (result) {
            //Validação para verificar se existe conteúdo no array
            if(result.length > 0){
                // Configura os dados de sucesso da resposta
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code

                // Adiciona a quantidade de registros encontrados
                message.DEFAULT_MESSAGE.response.count = result.length

                // Adiciona a lista de usuarios ao retorno
                message.DEFAULT_MESSAGE.response.usuario = result

                return message.DEFAULT_MESSAGE
            }else{

                return message.ERROR_NOT_FOUND //404
            }
        }else{
           
            return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
        }
    } catch (error) {
        //console.log("caiu 3",error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

/*****************************************************************************************
 * Função responsável por buscar um usuario através do ID
 *****************************************************************************************/
async function buscarUsuario(id) {

    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        // Valida se o ID informado é válido
        if (id == undefined || id == "" || id == null || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = "[ID] invalido"
            return message.ERROR_BAD_REQUEST
        } else {
            // Solicita ao DAO a busca do usuario pelo ID
            let result = await usuarioDAO.selectByIdUsuario(id)


            // Verifica se a consulta foi executada com sucesso
            if (result) {

                // Verifica se o usuario foi encontrado
                if (result.length > 0) {
                        
                    // Configura a resposta de sucesso
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code

                    // Adiciona os dados encontrados ao retorno
                    message.DEFAULT_MESSAGE.response.usuario = result

                    return message.DEFAULT_MESSAGE
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

/*****************************************************************************************
 * Função responsável por atualizar um usuario existente
 *****************************************************************************************/
async function atualizarUsuario(usuario, id, contentType) {

    // Cria uma cópia do objeto de mensagens para evitar alterações no original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // Valida se o Content-Type da requisição é JSON
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            // Verifica se o usuario existe antes da atualização
            let resultBuscarId = await buscarUsuario(id)

            if (resultBuscarId.status) {

                // Valida os dados recebidos
                let validar = await validarDados(usuario)

                if (!validar) {
                    
                    // Adiciona o ID ao objeto para atualização
                    usuario.id = id

                    // Solicita ao DAO a atualização do usuario
                    let result = await usuarioDAO.updateUsuario(usuario)

                    if (result) {

                        // Configura a resposta de sucesso
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message

                        // Adiciona os dados atualizados ao retorno
                        message.DEFAULT_MESSAGE.response = usuario

                        return message.DEFAULT_MESSAGE

                    } else {

                        // Erro interno da model
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return validar
                }
            }else{
                return resultBuscarId//400 ou 404 ou 500
            }
        }else{
            return message.ERROR_CONTENT_TYPE//415 tipo errado
        }

    } catch (error) {
       // console.log(erro)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}

/*****************************************************************************************
 * Função responsável por excluir um usuario
 *****************************************************************************************/
async function apagarUsuario(id) {

    // Cria uma cópia do objeto de mensagens para evitar alterações no original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        // Verifica se o usuario existe antes da exclusão
        let resultBuscarId = await buscarUsuario(id)

        if (resultBuscarId.status) {

            // Solicita ao DAO a exclusão do usuario
            let result = await usuarioDAO.deleteUsuario(id)

            if (result) {

                // Configura a resposta de sucesso
                message.DEFAULT_MESSAGE.status = message.SUCCESS_DELETE_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_DELETE_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCCESS_DELETE_ITEM.message

                return message.DEFAULT_MESSAGE

            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarId
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


/*****************************************************************************************
 * Função responsável por validar os dados do usuario
 *****************************************************************************************/
async function validarDados(usuario) {

    // Cria uma cópia do objeto de mensagens para evitar alterações no original
    let message = JSON.parse(JSON.stringify(config_message))

    // VALIDA NOME
    if (
        usuario.nome        == undefined ||
        usuario.nome        == ""        ||
        usuario.nome        == null      ||
        usuario.nome.length >  50
    ) {

        message.ERROR_BAD_REQUEST.field = "[NOME] invalido"
        return message.ERROR_BAD_REQUEST


    // VALIDA USUARIO
    } else if (
        usuario.usuario        == undefined ||
        usuario.usuario        == ""        ||
        usuario.usuario        == null      ||
        usuario.usuario.length > 100
    ) {

        message.ERROR_BAD_REQUEST.field = "[USUARIO] invalida"
        return message.ERROR_BAD_REQUEST

    // VALIDA SENHA
    } else if (
        usuario.senha        == undefined ||
        usuario.senha        == ""        ||
        usuario.senha        == null      ||
        usuario.senha.length > 254
    ) {

        message.ERROR_BAD_REQUEST.field = "[SENHA] invalida"
        return message.ERROR_BAD_REQUEST

    } else {

        // Dados válidos
        return false
    }
}


/*****************************************************************************************
 * Exportação das funções da controller
 *****************************************************************************************/
module.exports = {
    inserirNovoUsuario,
    listarUsuarios,
    buscarUsuario,
    atualizarUsuario,
    apagarUsuario
}

