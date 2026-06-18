# VibeCoffee-BackEnd-ADM

## ☕ Projeto Integrador - SENAI

Este projeto foi desenvolvido como parte do **Projeto Integrador do curso Técnico em Desenvolvimento de Sistemas do SENAI**, com o objetivo de aplicar conceitos de desenvolvimento backend, banco de dados relacionais, APIs RESTful, autenticação de usuários e boas práticas de programação.

O sistema **VibeCoffee** consiste em uma API administrativa responsável pelo gerenciamento de produtos, categorias, tipos e usuários de uma cafeteria fictícia, permitindo operações completas de cadastro, consulta, atualização e remoção de dados. A API é construída com Node.js e Express, utilizando MySQL como banco de dados e autenticação via JSON Web Tokens (JWT).

## 🚀 Tecnologias Utilizadas

*   **Node.js**: Ambiente de execução JavaScript assíncrono e orientado a eventos.
*   **Express.js**: Framework web rápido e minimalista para Node.js, utilizado para construir a API RESTful.
*   **Knex.js**: Construtor de queries SQL flexível e poderoso, facilitando a interação com o banco de dados MySQL.
*   **MySQL2**: Driver de cliente MySQL para Node.js, oferecendo alta performance e recursos avançados.
*   **JSON Web Token (JWT)**: Padrão aberto (RFC 7519) para criação de tokens de acesso seguro, utilizado para autenticação e autorização.
*   **CORS**: Middleware para Express.js que habilita o Cross-Origin Resource Sharing, permitindo requisições de diferentes domínios.
*   **Body-parser**: Middleware para analisar corpos de requisição HTTP, como JSON e URL-encoded.

## 📂 Estrutura do Projeto

O projeto segue uma estrutura modular e organizada para facilitar a manutenção e escalabilidade:

*   `Middleware/`: Contém middlewares personalizados, como o de autenticação JWT, para interceptar e processar requisições.
*   `controller/`: Camada de lógica de negócio, responsável por processar as requisições, validar dados e interagir com a camada de modelo. Cada entidade (Produto, Categoria, Tipo, Usuário) possui seu próprio controlador.
*   `model/`: Camada de acesso a dados (DAO - Data Access Object) e configuração do banco de dados.
    *   `model/DAO/`: Implementações de acesso a dados para cada tabela, abstraindo as operações SQL.
    *   `model/database/`: Contém o script SQL (`estrutura.sql`) para criação da estrutura do banco de dados.
    *   `model/database_config_knex/`: Configuração do Knex.js para diferentes ambientes (desenvolvimento, produção, etc.).
*   `routes/`: Definição das rotas da API, mapeando URLs para funções de controlador específicas.
*   `app.js`: Ponto de entrada principal da aplicação, onde os middlewares, rotas e o servidor Express são configurados e iniciados.
*   `package.json`: Arquivo de metadados do projeto, listando dependências, scripts e informações gerais.
*   `swagger.js`: Arquivo de configuração para a geração da documentação OpenAPI (Swagger).

## ⚙️ Configuração do Ambiente

Para configurar e executar o projeto localmente, siga os passos abaixo:

### 1. Clonar o Repositório

Abra seu terminal e execute os seguintes comandos para clonar o projeto e navegar até o diretório:

```bash
git clone https://github.com/Cosme-CR/VibeCoffee-BackEnd-ADM.git
cd VibeCoffee-BackEnd-ADM
```

### 2. Instalar Dependências

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) (ou [yarn](https://yarnpkg.com/)) instalados em sua máquina. Em seguida, instale as dependências do projeto:

```bash
npm install
# ou
yarn install
```

### 3. Configurar Banco de Dados

O projeto utiliza **MySQL** como sistema de gerenciamento de banco de dados. Você precisará criar um banco de dados e executar o script de estrutura.

1.  **Crie um banco de dados MySQL** com o nome `db_vibe_coffee`.
2.  **Execute o script `estrutura.sql`** localizado em `model/database/` para criar as tabelas necessárias. Você pode fazer isso usando um cliente MySQL (como MySQL Workbench, DBeaver) ou via linha de comando:

    ```sql
    -- Conteúdo de model/database/estrutura.sql
    create database db_vibe_coffee;
    use db_vibe_coffee;

    create table tbl_usuario (
        id        int          not null primary key auto_increment,
        nome      varchar(100) not null,
        usuario   varchar(100) not null,
        senha     varchar(514) not null
    );

    create table tbl_produto (
        id        int          not null primary key auto_increment,
        nome      varchar(50)  not null,
        descricao text         not null,
        foto      varchar(254) not null,
        status    boolean      not null
    );

    create table tbl_categoria (
        id        int          not null primary key auto_increment,
        categoria varchar(100) not null
    );

    create table tbl_tipo (
        id        int          not null primary key auto_increment,
        tipo      varchar(45)  not null
    );

    create table tbl_tipo_categoria (
        id           int not null primary key auto_increment,
        id_tipo      int not null,
        id_categoria int not null,
        constraint FK_TIPO_TIPOCATEGORIA foreign key (id_tipo) references tbl_tipo(id),
        constraint FK_CATEGORIA_TIPOCATEGORIA foreign key (id_categoria) references tbl_categoria(id)
    );

    create table tbl_produto_tipo_categoria (
        id                    int          not null primary key auto_increment,
        id_tbl_produto        int          not null,
        id_tbl_tipo_categoria int          not null,
        preco                 decimal(6,2) not null,
        constraint FK_PRODUTO_PRODUTO_TIPO_CATEGORIA foreign key (id_tbl_produto) references tbl_produto(id),
        constraint FK_TIPO_CATEGORIA_PRODUTO_TIPO_CATEGORIA foreign key (id_tbl_tipo_categoria) references tbl_tipo_categoria(id)
    );
    ```

3.  **Configurar Conexão com o Banco de Dados (Knex)**

    O arquivo `model/database_config_knex/knexFile.js` contém as configurações de conexão. Verifique se as credenciais (host, user, password, database) estão corretas para o seu ambiente de desenvolvimento.

    ```javascript
    // Conteúdo de model/database_config_knex/knexFile.js
    module.exports = {
      development: {
        client: 'mysql2',
        connection: {
          host: 'localhost',
          port: 3306,
          user: 'root',
          password: 'bcd127', // **ATENÇÃO: Altere para sua senha do MySQL**
          database: 'db_vibe_coffee',
          charset: 'utf8mb4'
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: './migrations'
        },
        seeds: {
          directory: './seeds'
        }
      }
    };
    ```

## ▶️ Execução do Projeto

Para iniciar a API, execute o seguinte comando na raiz do projeto:

```bash
npm start
# ou
node app.js
```

A API estará disponível em `http://localhost:8080`. A documentação Swagger estará acessível em `http://localhost:8080/api-docs`.

## 🔒 Autenticação (JWT)

A API utiliza JSON Web Tokens (JWT) para autenticação e autorização. As rotas que exigem autenticação esperam um token JWT válido no cabeçalho `x-access-token` da requisição.

*   **Segredo (SECRET)**: `charvi` (definido no middleware de JWT)
*   **Tempo de Expiração (EXPIRES)**: 6000 segundos (100 minutos)

Para obter um token, utilize o endpoint de autenticação de usuário (`POST /autenticar`).

## 🗺️ Endpoints da API

A base URL para todos os endpoints é `http://localhost:8080/v1/vibecoffee`.

### Autenticação

#### `POST /autenticar`
*   **Descrição**: Autentica um usuário existente e retorna um token JWT para acesso às rotas protegidas.
*   **Corpo da Requisição (JSON)**:
    ```json
    {
        "usuario": "seu_usuario",
        "senha": "sua_senha"
    }
    ```
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Operação realizada com sucesso!",
        "response": {},
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

### Usuários

#### `POST /usuario`
*   **Descrição**: Cria um novo usuário no sistema.
*   **Autenticação**: Necessária (token JWT no cabeçalho `x-access-token`).
*   **Corpo da Requisição (JSON)**:
    ```json
    {
        "nome": "Nome do Usuário",
        "usuario": "nome_de_usuario",
        "senha": "senha_segura"
    }
    ```
*   **Resposta de Sucesso (201 Created)**:
    ```json
    {
        "status": true,
        "status_code": 201,
        "message": "Usuário criado com sucesso!",
        "response": {
            "id": 10,
            "nome": "Nome do Usuário",
            "usuario": "nome_de_usuario"
        }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `GET /usuario`
*   **Descrição**: Lista todos os usuários cadastrados.
*   **Autenticação**: Necessária.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Usuários encontrados!",
        "response": [
            { "id": 1, "nome": "Admin", "usuario": "admin" },
            { "id": 2, "nome": "João Silva", "usuario": "joao.silva" }
        ]
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `GET /usuario/:id`
*   **Descrição**: Busca um usuário específico pelo seu ID.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID do usuário.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Usuário encontrado!",
        "response": { "id": 1, "nome": "Admin", "usuario": "admin" }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `PUT /usuario/:id`
*   **Descrição**: Atualiza as informações de um usuário existente.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID do usuário a ser atualizado.
*   **Corpo da Requisição (JSON)**: Mesmo formato do `POST /usuario`.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Usuário atualizado com sucesso!",
        "response": { "id": 1, "nome": "Admin Atualizado", "usuario": "admin_novo" }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `DELETE /usuario/:id`
*   **Descrição**: Exclui um usuário do sistema pelo seu ID.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID do usuário a ser excluído.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Usuário excluído com sucesso!",
        "response": {}
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

### Produtos

#### `POST /produto`
*   **Descrição**: Cria um novo produto no sistema.
*   **Autenticação**: Necessária.
*   **Corpo da Requisição (JSON)**:
    ```json
    {
        "nome": "Café Expresso",
        "descricao": "Café forte e aromático.",
        "foto": "http://example.com/expresso.jpg",
        "status": true,
        "tipo_categoria": [
            { "id_tipo_categoria": 1, "preco": 5.50 },
            { "id_tipo_categoria": 2, "preco": 7.00 }
        ]
    }
    ```
*   **Resposta de Sucesso (201 Created)**:
    ```json
    {
        "status": true,
        "status_code": 201,
        "message": "Produto criado com sucesso!",
        "response": {
            "id": 1,
            "nome": "Café Expresso",
            "descricao": "Café forte e aromático.",
            "foto": "http://example.com/expresso.jpg",
            "status": true,
            "tipo_categoria": [
                { "id_tipo_categoria": 1, "preco": 5.50 },
                { "id_tipo_categoria": 2, "preco": 7.00 }
            ]
        }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `GET /produto`
*   **Descrição**: Lista todos os produtos cadastrados.
*   **Autenticação**: Necessária.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Produtos encontrados!",
        "response": [
            { "id": 1, "nome": "Café Expresso", ... },
            { "id": 2, "nome": "Cappuccino", ... }
        ]
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `GET /produto/:id`
*   **Descrição**: Busca um produto específico pelo seu ID.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID do produto.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Produto encontrado!",
        "response": { "id": 1, "nome": "Café Expresso", ... }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `PUT /produto/:id`
*   **Descrição**: Atualiza as informações de um produto existente.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID do produto a ser atualizado.
*   **Corpo da Requisição (JSON)**: Mesmo formato do `POST /produto`.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Produto atualizado com sucesso!",
        "response": { "id": 1, "nome": "Café Expresso Forte", ... }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `DELETE /produto/:id`
*   **Descrição**: Exclui um produto do sistema pelo seu ID.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID do produto a ser excluído.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Produto excluído com sucesso!",
        "response": {}
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

### Categorias

#### `POST /categoria`
*   **Descrição**: Cria uma nova categoria de produto.
*   **Autenticação**: Necessária.
*   **Corpo da Requisição (JSON)**:
    ```json
    {
        "categoria": "Bebidas Quentes",
        "tipo": [
            { "id": 1 },
            { "id": 2 }
        ]
    }
    ```
*   **Resposta de Sucesso (201 Created)**:
    ```json
    {
        "status": true,
        "status_code": 201,
        "message": "Categoria criada com sucesso!",
        "response": {
            "id": 1,
            "categoria": "Bebidas Quentes",
            "tipo": [
                { "id": 1 },
                { "id": 2 }
            ]
        }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `GET /categoria`
*   **Descrição**: Lista todas as categorias cadastradas.
*   **Autenticação**: Necessária.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Categorias encontradas!",
        "response": [
            { "id": 1, "categoria": "Bebidas Quentes", ... },
            { "id": 2, "categoria": "Salgados", ... }
        ]
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `GET /categoria/:id`
*   **Descrição**: Busca uma categoria específica pelo seu ID.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID da categoria.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Categoria encontrada!",
        "response": { "id": 1, "categoria": "Bebidas Quentes", ... }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `PUT /categoria/:id`
*   **Descrição**: Atualiza as informações de uma categoria existente.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID da categoria a ser atualizada.
*   **Corpo da Requisição (JSON)**: Mesmo formato do `POST /categoria`.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Categoria atualizada com sucesso!",
        "response": { "id": 1, "categoria": "Bebidas Frias", ... }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `DELETE /categoria/:id`
*   **Descrição**: Exclui uma categoria do sistema pelo seu ID.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID da categoria a ser excluída.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Categoria excluída com sucesso!",
        "response": {}
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

### Tipos

#### `POST /tipo`
*   **Descrição**: Cria um novo tipo (ex: Pequeno, Médio, Grande) para produtos/categorias.
*   **Autenticação**: Necessária.
*   **Corpo da Requisição (JSON)**:
    ```json
    {
        "tipo": "Pequeno"
    }
    ```
*   **Resposta de Sucesso (201 Created)**:
    ```json
    {
        "status": true,
        "status_code": 201,
        "message": "Tipo criado com sucesso!",
        "response": { "id": 1, "tipo": "Pequeno" }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `GET /tipo`
*   **Descrição**: Lista todos os tipos cadastrados.
*   **Autenticação**: Necessária.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Tipos encontrados!",
        "response": [
            { "id": 1, "tipo": "Pequeno" },
            { "id": 2, "tipo": "Médio" }
        ]
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `GET /tipo/:id`
*   **Descrição**: Busca um tipo específico pelo seu ID.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID do tipo.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Tipo encontrado!",
        "response": { "id": 1, "tipo": "Pequeno" }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `PUT /tipo/:id`
*   **Descrição**: Atualiza as informações de um tipo existente.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID do tipo a ser atualizado.
*   **Corpo da Requisição (JSON)**: Mesmo formato do `POST /tipo`.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Tipo atualizado com sucesso!",
        "response": { "id": 1, "tipo": "Pequeno (Atualizado)" }
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

#### `DELETE /tipo/:id`
*   **Descrição**: Exclui um tipo do sistema pelo seu ID.
*   **Autenticação**: Necessária.
*   **Parâmetros de Rota**: `id` (inteiro, obrigatório) - ID do tipo a ser excluído.
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "status": true,
        "status_code": 200,
        "message": "Tipo excluído com sucesso!",
        "response": {}
    }
    ```
*   **Respostas de Erro**: Veja a seção "Respostas de Erro Padrão".

### Respostas de Erro Padrão

As respostas de erro da API seguem um padrão consistente:

*   **400 Bad Request**: Requisição inválida, dados ausentes ou incorretos.
    ```json
    {
        "status": false,
        "status_code": 400,
        "message": "Requisição inválida",
        "field": "[NOME_DO_CAMPO] inválido"
    }
    ```
*   **401 Unauthorized**: Falha na autenticação (token JWT ausente, inválido ou expirado).
    ```json
    {
        "status": false,
        "status_code": 401,
        "message": "Não autorizado",
        "field": "Token JWT inválido"
    }
    ```
*   **404 Not Found**: Recurso não encontrado.
    ```json
    {
        "status": false,
        "status_code": 404,
        "message": "Recurso não encontrado",
        "field": "ID não encontrado"
    }
    ```
*   **415 Unsupported Media Type**: Tipo de conteúdo da requisição não suportado (ex: não é JSON).
    ```json
    {
        "status": false,
        "status_code": 415,
        "message": "Tipo de mídia não suportado",
        "field": "Content-Type inválido"
    }
    ```
*   **500 Internal Server Error**: Erro inesperado no servidor.
    ```json
    {
        "status": false,
        "status_code": 500,
        "message": "Erro interno do servidor",
        "field": "Detalhes do erro"
    }
    ```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir com o projeto, siga os passos:

1.  Faça um fork do repositório.
2.  Crie uma nova branch para sua feature (`git checkout -b feature/minha-feature`).
3.  Faça suas alterações e commit (`git commit -m 'feat: Minha nova feature'`).
4.  Envie para o branch original (`git push origin feature/minha-feature`).
5.  Abra um Pull Request detalhando suas alterações.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🧑‍💻 Autor(es)

*   Cosme Ribeiro ([Cosme-CR](https://github.com/Cosme-CR))
*   Lucas Duarte ([k4ir0sld](https://github.com/k4ir0sld))
*   Vitor Isidio ([Vitorisidio](https://github.com/Vitorisidio))
