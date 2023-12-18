# Requesitos funcionais

[x] Deve ser possivel se cadastrar;
[x] Deve ser possivel se autenticar;
[x] Deve ser possivel obter o perfil de um usuário logado;
[ ] Deve ser possivel obter o númerode check-ins realizados pelo usuários logado;
[ ] Deve ser possivel o usuário obter seu histórico de check-ins;
[ ] Deve ser possivel o usuário buscar academias próximas;
[ ] Deve ser possivel o usuário buscar academias pelo nome;
[ ] Deve ser possivel o usuário realizar check-in em uma academia;
[ ] Deve ser possivel validar o check-in de um usuário;
[ ] Deve ser possivel cadastrar uma academia;

# Regras de negócio

[x] O usuário não deve poder se cadastrar com um email duplicado;
[x] O usuário não pode fazer 2 check-ins no mesmo dia;
[ ] O usuário não pode fazer check0in se não estiver perto (100m) da academia;
[ ] O check-in só pode ser validado até 20 minutos após criado;
[ ] O check-in só pode ser validado por administradores;
[ ] A academia só pode ser cadastrada por administradores;

# Requisitos não-funcionais

[x] A senha do usuário precisa estar criptografada;
[x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
[ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
[ ] O usuário deve ser identificado por um JWT (Json Web Token);