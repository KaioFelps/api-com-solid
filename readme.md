# APP

Gym Pass App

## RFs (Requisitos funcionais)
funcionalidades da aplicação

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma acadeima.

## RNs (Regras de negócios)
condições para os requisitos funcionais

- O usuário não deve poder se cadastrar com um e-mail duplicado;
- O usuário não poed fazer 2 check-ins no mesmo dia;
- O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- O check-in só pode ser validado em até 20 minutos após criação;
- O check-in só pode ser validado por administradores;
- A academia só pode ser cadastrado por administradores;

## RFNs (Requisitos não funcionais)
requisitos técnicos e coisas que não partem nem dependam do usuário final

- [x] Senhas devem estar criptografadas;
- [x] Todos os dados precisam ser persistidos num banco de dados PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT.