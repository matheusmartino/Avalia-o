# Overview
Projeto de teste em AspNet Core

# Frontend Architecture
- MVC com JQuery
- Requisições Ajax camada Backend Api

# Backend Architecture
- ASP.NET Core 2.2
- Uso de Repository Pattern 
- Uso de [Entity Framework Core](https://docs.microsoft.com/pt-br/ef/core/), mapeando as entididades com o repositório

# Como Rodar Localmente
Este setup foi feito para Windows, outras plataformas pendente de realização de testes.
1. Instale Visual Studio 2019 Comunity.
2. Instale .NET Core SDK 2.2 for VS2019.
4. Open the `.sln` file and wait for nuget package restore.
5. Configurea Connection String do Banco MySql Local passando as entradas no appsettings.json.
```
   "ConexaoMySql": {
    "MySqlConnectionString": "Server=localhost;DataBase=AvalTecSysDb;Uid=*******;Pwd=********"
  }
```
6. Abra o Package Manager Console **Terminal**, Colocando como **Default Project: Web** no Visual Studio, e execute o seguinte comando:
```
   update-database   
```
7. A solution será compilada e criará o banco, com suas tabelas, caso a connection string esteja correta.
8. Em seguida dar o Play na Solution e aguarde a chamada do endereço `http://localhost:55194/`

