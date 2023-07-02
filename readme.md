# APP

Gym Pass App

## RFs (Requisitos funcionais)
funcionalidades da aplicação

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma acadeima.

## RNs (Regras de negócios)
condições para os requisitos funcionais

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não poed fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado em até 20 minutos após criação;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrado por administradores;

## RFNs (Requisitos não funcionais)
requisitos técnicos e coisas que não partem nem dependam do usuário final

- [x] Senhas devem estar criptografadas;
- [x] Todos os dados precisam ser persistidos num banco de dados PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT.