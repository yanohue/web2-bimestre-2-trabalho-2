[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/WOKct8pz)
# Task Manager
Objetivo: permitir ao usuário criar, visualizar, atualizar e exluir tarefas usando um client que se comunica através de API com um banco de dados. 



# Membros
* André Yuri Chiarentin Yano



# Configuração - frontend
Instalar as dependências utilizando o comando 'npm install'
* parcel: ^2.10.3
* bootstrap: ^5.3.2

# Configuração - backend
Instalar as dependências utilizando o comando 'npm install'
* express: ^4.18.2
* sequelize: ^6.35.1
* pg: ^8.11.3 => modificado para => mysql2: ^3.6.5
* jsonwebtoken: ^9.0.2
* cors: ^2.8.5
* dotenv: ^16.3.1
* nodemon: ^3.0.2"

# Configuração - db
Ter a versão correta do banco de dados postgreSQL, e além disso criar e configurar o arquivo '.env' na pasta 'resources' do backend.
* postgresql-16.0.1 => moficado para utilizar mySQL 8.0.34 com MySQL Workbench

Observações:
* Crie um banco de dados com o nome especificado no arquivo '.env'
* as tabelas são criadas ao iniciar o backend
* comandos para popular o banco estão no fim do arquivo 'import.sql' (ctrl+f = popular)
* para iniciar execute 'npm start'.

# Execução - frontend
Para iniciar , execute 'npm start', a saída no terminal incluirá a URL de acesso, por exemplo: http://localhost:1234.

# .env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASS="1234"
DB_NAME=task_manager
DB_PORT=3306

JWT_SECRET_KEY=XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o