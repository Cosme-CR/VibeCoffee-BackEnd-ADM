/*****************************************************************************************
 * Objetivo:    Arquivo responsável pela configuração e padronização das mensagens da API
 * Data:        10/06/2025
 * Autor:       Cosme Ribeiro
 * Versão:      1.0
 *****************************************************************************************/

// Padronização do cabeçalho para retorno dos endpoints da API
const DEFAULT_MESSAGE = {
    api_description:    "API VibeCoffee",
    developer:          "Cosme Ribeiro",
    version:            "1.0.4.26",
    status:             Boolean,
    status_code:        Number,
    response:           {}
}
    

// Mensagens de erro da API
const ERROR_INTERNAL_SERVER_MODEL = {
    status:         false,
    status_code:    500,
    message:        "Não foi possível processar a requisição devido a um erro na modelagem de dados."
}


const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status:         false,
    status_code:    500,
    message:        "Não foi possível processar a requisição devido a um erro na controller."
}
    
const ERROR_BAD_REQUEST = {
    status:         false,
    status_code:    400,
    message:        "Os dados enviados na requisição não estão corretos."
}

    
const ERROR_NOT_FOUND = {
    status:         false,
    status_code:    404,
    message:        "Nenhum dado foi encontrado para retorno."
}
    
const ERROR_CONTENT_TYPE = {
    status:         false,
    status_code:    415,
    message:        "Não foi possível processar a requisição. A API aceita apenas dados no formato JSON."
}
    
    
// Mensagens de sucesso da API
const SUCCESS_CREATED_ITEM = {
    status:         true,
    status_code:    201,
    message:        "Registro inserido com sucesso."
}

    
const SUCCESS_RESPONSE = {
    status:         true,
    status_code:    200
}

const SUCCESS_UPDATE_ITEM = {
    status:         true,
    status_code:    200,
    message:        "Registro atualizado com sucesso."
}

const SUCCESS_DELETE_ITEM = {
    status:         true,
    status_code:    200,
    message:        "Registro removido com sucesso."
}

const SUCCESS_CREATED_ITEM_WARNING = {
    status:         true,
    status_code:    201,
    message:        "Os dados principais foram inseridos com sucesso, porém alguns dados apresentaram problemas."
}
    
// Mensagem de sucesso na autenticação 
const SUCCESS_AUTHENTICATION = {
    status:         true,
    status_code:    200,
    message:        "Autenticação realizada com sucesso.",
    token:          "" // O JWT gerado será injetado aqui dinamicamente pela controller
}

// Mensagem de erro para credenciais inválidas (Usuário ou Senha incorretos)
const ERROR_UNAUTHORIZED = {
    status:         false,
    status_code:    401,
    message:        "Usuário ou senha inválidos. Acesso negado."
}
  
module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_RESPONSE,
    SUCCESS_UPDATE_ITEM,
    SUCCESS_DELETE_ITEM,
    SUCCESS_CREATED_ITEM_WARNING,
    SUCCESS_AUTHENTICATION,
    ERROR_UNAUTHORIZED
}