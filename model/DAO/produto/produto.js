/* 
* objetivo: arquivo responsavel pelo CRUD no banco de dados MySQL na tabela produto
* Data:       10/06/2026
* Autor :     cosme
* Versao:     1.0  

*/

//import da biblioteca para gerenciar o banco de dados mysql no node.js
const knex          = require('knex')
//importe do arquivo de configuração para conexao com o banco de dados mysql 
const knexConfig    = require('../../database_config_knex/knexFile.js')
//cria a conexao com o banco de dados
const knexConex     = knex(knexConfig.development)

//funcao para inserir dados na tabela de produto 
async function insertProduto(produto){

    try {
        //script pra inserir produto no banco de dados
        let sql = `insert into tbl_produto(
                            nome, 
                            descricao, 
                            foto,  
                            status
                        )
                    values(
                            '${produto.nome}',
                            '${produto.descricao}',
                            '${produto.foto}',
                            '${produto.status}'
                            ); `
        
        //executa o scriptSQL no banco de dados
        let result = await knexConex.raw(sql)
        //console.log(result[0].insertId)
        if(result){
            return result[0].insertId// retorna o id 
        }else{return false}
    } catch (error) {
        console.log(error)//erro 500 descomentar essa linha
        return false
    }

}





//função para atualiza um produto existente na tabela
async function updateProduto(produto) {


    try {
    let sql = `
        UPDATE tbl_produto SET
            nome = ?, 
            descricao = ?,
            foto = ?,
            status = ?
        WHERE id = ?
    `;

    // Os valores do array substituem as '?' na ordem exata em que aparecem
    let result = await knexConex.raw(sql, [
        produto.nome,
        produto.descricao,
        produto.foto,
        produto.status,
        produto.id
    ]);
        
        if (result) {
            return true
        }else{return false}
        
    } catch (error) {
        return false
    }


    
}

//funcao para retornar todos os dados da tabela de produto
async function selectAllProduto() {
    try {
        //script select pra ver todos os filmes
        let sql = `select * from tbl_produto order by id desc`

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


//função para retornar os dados do Produto filtrando pelo id
async function selectByIdProduto(id) {
    try {
        // faz busca no banco de dados pelo id 
        let sql = `select * from tbl_produto where id=${id}`

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

//funcao pra excluir um Produto pelo id
async function deleteProduto(id) {
    try {
        let sql = `DELETE FROM tbl_produto 
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
    insertProduto,
    updateProduto,
    selectAllProduto,
    selectByIdProduto,
    deleteProduto

}