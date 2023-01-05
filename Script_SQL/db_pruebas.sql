create database pruebas;

create table usuarios(
    idUsuario int primary key auto_increment,
    nombre varchar(50) not null,
    email varchar(50) not null
);