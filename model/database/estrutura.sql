# Permite criar um database
create database db_vibe_coffee;

use db_vibe_coffee;

# criar tabela usuario
create table tbl_usuario (
    id        int          not null primary key auto_increment,
    nome      varchar(100) not null,
    usuario   varchar(100) not null,
    senha     varchar(514) not null
);

# criar tabela produto
create table tbl_produto (
    id        int          not null primary key auto_increment,
    nome      varchar(50)  not null,
    descricao text         not null,
    foto      varchar(254) not null,
    status    boolean      not null
    );

# criar tabela categoria
create table tbl_categoria (
    id        int          not null primary key auto_increment,
    categoria varchar(100) not null
);

# criar tabela tipo
create table tbl_tipo (
    id        int          not null primary key auto_increment,
    tipo      varchar(45)  not null
);

# ALTERADA: criar tabela tipo_categoria
create table tbl_tipo_categoria (
    id           int not null primary key auto_increment,
    id_tipo      int not null,  -- Nome ajustado para o seu SELECT
    id_categoria int not null,  -- Nome ajustado para o seu SELECT

    ## fazer relacao entre duas tabelas
    constraint FK_TIPO_TIPOCATEGORIA
    foreign key (id_tipo)
    references tbl_tipo(id),

    constraint FK_CATEGORIA_TIPOCATEGORIA
    foreign key (id_categoria)
    references tbl_categoria(id)
);

# criar tabela produto_tipo_categoria
create table tbl_produto_tipo_categoria (
    id                    int          not null primary key auto_increment,
    id_tbl_produto        int          not null,
    id_tbl_tipo_categoria int          not null,
    preco                 decimal(6,2) not null,

    ## fazer relacao entre duas tabelas
    constraint FK_PRODUTO_PRODUTO_TIPO_CATEGORIA
    foreign key (id_tbl_produto)
    references tbl_produto(id),

    constraint FK_TIPO_CATEGORIA_PRODUTO_TIPO_CATEGORIA
    foreign key (id_tbl_tipo_categoria)
    references tbl_tipo_categoria(id)
);










--#TRIGGER


DELIMITER $

-- ============================================================
-- TRIGGER 1: Ao deletar PRODUTO
-- Remove todos os registros filhos em tbl_produto_tipo_categoria
-- ============================================================
CREATE TRIGGER trg_before_delete_produto
BEFORE DELETE ON tbl_produto
FOR EACH ROW
BEGIN
    DELETE FROM tbl_produto_tipo_categoria
    WHERE id_tbl_produto = OLD.id;
END$


-- ============================================================
-- TRIGGER 2: Ao deletar TIPO
-- 1º Remove de tbl_produto_tipo_categoria (filha)
-- 2º Remove de tbl_tipo_categoria (intermediária)
-- ============================================================
CREATE TRIGGER trg_before_delete_tipo
BEFORE DELETE ON tbl_tipo
FOR EACH ROW
BEGIN
    DELETE FROM tbl_produto_tipo_categoria
    WHERE id_tbl_tipo_categoria IN (
        SELECT id FROM tbl_tipo_categoria
        WHERE id_tipo = OLD.id
    );

    DELETE FROM tbl_tipo_categoria
    WHERE id_tipo = OLD.id;
END$


-- ============================================================
-- TRIGGER 3: Ao deletar CATEGORIA
-- 1º Remove de tbl_produto_tipo_categoria (filha mais funda)
-- 2º Remove de tbl_tipo_categoria (intermediária)
-- 3º Remove de tbl_tipo (os tipos ligados à categoria)
-- 4º Remove de tbl_produto (os produtos ligados via tipo_categoria)
-- ============================================================
CREATE TRIGGER trg_before_delete_categoria
BEFORE DELETE ON tbl_categoria
FOR EACH ROW
BEGIN
    -- Remove produto_tipo_categoria ligados à categoria
    DELETE FROM tbl_produto_tipo_categoria
    WHERE id_tbl_tipo_categoria IN (
        SELECT id FROM tbl_tipo_categoria
        WHERE id_categoria = OLD.id
    );

    -- Remove os produtos ligados à categoria via tbl_produto_tipo_categoria
    -- (produtos que só existiam por causa dessa categoria)
    DELETE FROM tbl_produto
    WHERE id IN (
        SELECT DISTINCT ptc.id_tbl_produto
        FROM tbl_produto_tipo_categoria ptc
        INNER JOIN tbl_tipo_categoria tc ON ptc.id_tbl_tipo_categoria = tc.id
        WHERE tc.id_categoria = OLD.id
    );

    -- Remove a relação tipo_categoria
    DELETE FROM tbl_tipo_categoria
    WHERE id_categoria = OLD.id;

    -- Remove os tipos ligados à categoria
    DELETE FROM tbl_tipo
    WHERE id IN (
        SELECT id_tipo FROM tbl_tipo_categoria
        WHERE id_categoria = OLD.id
    );
END$


-- ============================================================
-- TRIGGER 4: Ao deletar TIPO_CATEGORIA
-- Tabela pai: tbl_tipo_categoria
-- Tabela filha: tbl_produto_tipo_categoria (FK: id_tbl_tipo_categoria)
-- Remove todos os registros filhos em tbl_produto_tipo_categoria
-- ============================================================
CREATE TRIGGER trg_before_delete_tipo_categoria
BEFORE DELETE ON tbl_tipo_categoria
FOR EACH ROW
BEGIN
    DELETE FROM tbl_produto_tipo_categoria
    WHERE id_tbl_tipo_categoria = OLD.id;
END$


DELIMITER ;