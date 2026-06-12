/* 
* objetivo: arquivo responsavel pelo CRUD no banco de dados MySQL na tabela tipo
* Data:       11/06/2026
* Autor :     cosme
* Versao:     1.0  

*/

//import da biblioteca para gerenciar o banco de dados mysql no node.js
const knex          = require('knex')
//importe do arquivo de configuração para conexao com o banco de dados mysql 
const knexConfig    = require('../../database_config_knex/knexFile.js')
//cria a conexao com o banco de dados
const knexConex     = knex(knexConfig.development)

//funcao para inserir dados na tabela de tipo 
async function insertTipo(tipo){

    try {
        //script pra inserir tipo no banco de dados
        let sql = `insert into tbl_tipo(
                            tipo
                        )
                    values(
                            '${tipo.tipo}'
                            ); `
        
        //executa o scriptSQL no banco de dados
        let result = await knexConex.raw(sql)
        //console.log(result[0].insertId)
        if(result){
            return result[0].insertId// retorna o id 
        }else{return false}
    } catch (error) {
        //console.log(error)//erro 500 descomentar essa linha
        return false
    }

}

//função para atualiza uma  tipo existente na tabela
async function updateTipo(tipo) {


    try {
        //script para atualizar dados no BD
        let sql =`update tbl_tipo set

            tipo        =  '${tipo.tipo}'
           
            where id = ${tipo.id}`

        //executa o script acima de
        let result = await knexConex.raw(sql)
        
        if (result) {
            return true
        }else{return false}
        
    } catch (error) {
        return false
    }


    
}

//funcao para retornar todos os dados da tabela de tipo
async function selectAllTipo() {
    try {
        //script select pra ver todos os tipo
        let sql = `select * from tbl_tipo order by id desc`

        // executa o script no banco
        let result = await knexConex.raw(sql)

        // verifica se o script retornou um array
        if (Array.isArray(result)) {
            return result[0] 
        }else{
            return false
        }

    } catch (error) {
        //console.log(error)
        return false 
        
    }

}

//função para retornar os dados da tipo filtrando pelo id
async function selectByIdTipo(id) {
    try {
        // faz busca no banco de dados pelo id 
        let sql = `select * from tbl_tipo where id=${id}`

        let result = await knexConex.raw(sql)
        if (Array.isArray(result)) {
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }
    
}

//funcao pra excluir uma tipo pelo id
async function deleteTipo(id) {
    try {
        let sql = `DELETE FROM tbl_tipo 
                            WHERE id = ${id};`

        let result = await knexConex.raw(sql)
        if(result){
            return true 
        }else{return false}

    } catch (error) {
        console.log(error)

        return false
    }
    
} 

module.exports = {
    insertTipo,
    updateTipo,
    selectAllTipo,
    selectByIdTipo,
    deleteTipo

}