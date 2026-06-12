#cria banco 
create database db_vibe_coffe;
#usa banco
use db_vibe_coffe;
#criar tabela usuario
create table tbl_usuario (
    id        int          not null primary key auto_increment,
    nome      varchar(100) not null,
    usuario   varchar(100) not null,
    senha     varchar(514) not null
);

#criar tabela produto
create table tbl_produto (
    id        int          not null primary key auto_increment,
    nome      varchar(50)  not null,
    descricao text         not null,
    foto      varchar(254) not null,
    status    boolean      not null
);

#criar tabela categoria
create table tbl_categoria (
    id        int          not null primary key auto_increment,
    categoria varchar(100) not null
);

#criar tabela tipo
create table tbl_tipo (
    id        int          not null primary key auto_increment,
    tipo      varchar(45)  not null
);

