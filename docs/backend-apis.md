# APIs e Web Services

Este projeto consiste no desenvolvimento de uma API REST que servirá como backend para uma plataforma web e mobile de gestão condominial. 

A aplicação terá como finalidade otimizar a administração de condomínios, facilitando tarefas operacionais e financeiras, como controle de inadimplência, geração de relatórios, reserva de áreas, além de melhorar a organização geral com controle de moradores/apartamentos.

API será projetada para ser segura, escalável e de fácil integração com outras soluções tecnológicas.

## Objetivos da API

O objetivo principal da API para gestão de condomínios é oferecer uma plataforma robusta, segura e acessível que centralize dados, automatize processos administrativos e facilite a comunicação entre moradores, síndicos e administradores. A seguir estão os principais objetivos que a API deve alcançar:

**Gerenciamento de Usuários**

- Cadastro e Atualização:
Permitir o registro e atualização de informações sobre moradores, síndicos e administradores, garantindo consistência e organização nas disponibilidades de dados.

**Gerenciamento de Condomínios**

- Cadastro e Atualização:
Permitir o registro e atualização de informações sobre condomínios, apartamentos, áreas comuns. Além da relação entre os usuários e os componentes do condomínio.

**Processos administrativos**

- Inadimplência: Gerenciar a inadimplência dos moradores, com controle das faturas, pagamentos e penalidades.

- Visão Geral: Oferecer uma visão geral do condomínio, na organização dos moradores, apartamentos, áreas comuns e histórico de pagamentos individuais ou geral.

- Facilitação na comunicação: Permitir que os moradores sejam notificados sobre faturas, reuniões, eventos e outras informações importantes.

**Integração com Web e Mobile** 

- Consistência de Dados: Garantir que tanto a versão web quanto o aplicativo mobile possam consumir os mesmos dados de forma segura e padronizada, promovendo uma experiência fluida ao usuário.

**Facilidade de Integração e Escalabilidade:**  

- A API será construída com estrutura REST, documentação clara e autenticação baseada em token JWT, permitindo integração simples e segura.


## Modelagem da Aplicação

**Estrutura de Dados**

Utilizamos de um ORM (Object-Relational Mapping), o Prisma, para mapear as entidades da aplicação para o banco, facilitando a interação com o banco de dados.

Geral: Todas as tabelas terão um campo `id` como chave primária e a seguinte estrutura de campos:
- createdAt:   `DATETIME - DEFAULT NOW` - Data de criação do registro.
- updatedAt:   `DATETIME` - Data da última atualização do registro.
- createdBy:   `STRING` - Usuário que criou o registro.
- updatedBy:   `STRING` - Usuário que atualizou o registro.

Tabela: user - Dados dos usuários (moradores, síndicos e administradores).

- id: `CUID - Primary Key` - Identificador único do usuário.
- name: `STRING` - Nome completo do usuário.
- profile: `STRING (ADMIN, MANAGER, RESIDENT)` - Tipo de perfil do usuário.
- email: `STRING - UNIQUE` - Email do usuário.
- password: `STRING` - Senha do usuário.
- contactPhone: `STRING - NULL` - Número de telefone do usuário.
- birthDate: `DATETIME - NULL` - Data de nascimento do usuário.
- condominiumId: `STRING - Foreign Key - NULL` - Referência ao condomínio do usuário.
- isActive: `BOOLEAN` - Se o usuário está ativo ou não.

Tabela: condominium - Dados do condomínio.

- id: `CUID - Primary Key` - Identificador único do Condomínio.
- name: `STRING` - Nome do Condomínio.
- address: `STRING` - Endereço do Condomínio.

Tabela: apartment - Dados do apartamento.

- id: `CUID - Primary Key` - Identificador único do Apartamento.
- block: `STRING` - Bloco onde o apartamento se encontra.
- number: `INT` - Número do apartamento.
- floor: `INT` - Andar onde o apartamento se encontra.
- condominiumId: `STRING - Foreign Key` - Referência ao condomínio do apartamento.

Tabela: commonarea - Dados de áreas comuns.

- id: `CUID - Primary Key` - Identificador único da Área Comum.
- type: `STRING (PARKING, BARBECUE, COURT, PARTY_ROOM, OTHER)` - Tipo da Área Comum.
- name: `STRING` - Nome da Área Comum.
- condominiumId: `STRING - Foreign Key` - Referência ao condomínio da Área.

Tabela: commonareareservation - reservas da área comum.

- id: `CUID - Primary Key` - Identificador único da reserva.
- userId: `STRING - Foreign Key` - Referência ao usuário que fez a reserva.
- commonAreaId: `STRING - Foreign Key` - Referência à área comum reservada
- startDate: `DATETIME` - Data de início da reserva.
- endDate: `DATETIME` - Data de término da reserva.

Tabela: fee - Tipos de taxas.
- id: `CUID - Primary Key` - Identificador único da taxa.
- name: `STRING` - Nome da taxa.
- type: `STRING (RENT, CONDOMINIUM, OTHER)` - Tipo da taxa.
- due: `DATETIME` - Data de vencimento da taxa.
- isRecurring: `BOOLEAN` - Se a taxa é recorrente ou não.
- isActive: `BOOLEAN` - Se a taxa está ativa ou não.
- condominiumId: `STRING - Foreign Key` - Referência ao condomínio da taxa.

Tabela: Payment - Pagamentos das Taxas.
- id: `CUID - Primary Key` - Identificador único do pagamento.
- userId: `STRING - Foreign Key` - Referência ao usuário que fez o pagamento.
- paymentDate: `DATETIME` - Data do pagamento.
- feeId: `STRING - Foreign Key` - Referência à taxa que foi paga.
- condominiumId: `STRING - Foreign Key` - Referência ao condomínio do pagamento.
- apartmentId: `STRING - Foreign Key` - Referência ao apartamento do pagamento.
- amount: `DECIMAL` - Valor do pagamento.

Tabela: NoticeManagement - Avisos / notícias do condomínio.

- id: `CUID - Primary Key` - Identificador único do aviso.
- title: `STRING` - Título do aviso.
- description: `STRING` - Descrição mais detalhada.
- date: `DATETIME`
- condominiumId: `STRING - Foreign Key` - Referência ao condomínio ao qual o aviso esta relacionado.

**Diagrama de Classes:**

![arq](img/Diagrama.png)

## Tecnologias Utilizadas

Para garantir uma API Web moderna, segura e eficiente, o projeto adota um conjunto de tecnologias amplamente utilizadas no mercado. A escolha dessas ferramentas leva em consideração a produtividade no desenvolvimento, a escalabilidade do sistema e a facilidade de manutenção. Confira abaixo:

- **JavaScript/TypeScript**  
  Linguagens fundamentais para o desenvolvimento web. TypeScript, em especial, proporciona tipagem estática, maior confiabilidade no código e uma melhor experiência para os desenvolvedores.

- **Express.js**  
  Framework minimalista e flexível para Node.js, utilizado para estruturar o servidor da API de forma leve e eficiente, com suporte a middlewares e rotas bem definidas.

- **MySQL**  
  Sistema de gerenciamento de banco de dados relacional, confiável e amplamente adotado, que permite armazenar os dados estruturados da aplicação com segurança e consistência.

- **Prisma ORM**  
  ORM moderno para Node.js e TypeScript, que facilita a comunicação com o banco de dados. Oferece uma interface intuitiva, geração automática de tipos e consultas seguras com validação em tempo de compilação.

- **Zod**  
  Biblioteca para validação de esquemas e tipos, integrada com TypeScript. É usada para garantir que os dados recebidos e enviados pela API estejam no formato esperado, melhorando a segurança e a confiabilidade da aplicação.

- **Swagger (OpenAPI)**  
  Ferramenta de documentação interativa para APIs REST. Permite visualizar, testar e entender os endpoints da aplicação de maneira clara, sendo útil tanto para desenvolvedores quanto para clientes e stakeholders.

- **Postman**  
  Plataforma de testes de APIs que facilita o desenvolvimento, validação e depuração de requisições HTTP. Muito útil durante as fases de desenvolvimento e QA.

- **Docker**  
  Plataforma de conteinerização que permite empacotar a aplicação e suas dependências em containers isolados. Facilita o deploy, o versionamento e a execução consistente da aplicação em diferentes ambientes (desenvolvimento, testes e produção).

## API Endpoints

## Apartments

<details>
  <summary>
    <code>POST</code> <code><b>/apartments</b></code> (Register an apartments)
  </summary>

**Description:** This endpoint registers an apartment.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/apartments</b></code> (Retrieve all apartments)
  </summary>

**Description:** This endpoint returns a list of all apartments.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/apartments/{id}</b></code> (Retrieve an apartment by ID)
  </summary>

**Description:** This endpoint returns an apartment by ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |
| `404` | Not Found |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/apartments/{id}</b></code> (Update an apartment)
  </summary>

**Description:** This endpoint updates an existing apartment.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |
| `404` | Not Found |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/apartments/{id}</b></code> (Delete an apartment)
  </summary>

**Description:** This endpoint deletes an apartment by ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |
| `404` | Not Found |

</details>

<details>
  <summary>
    <code>POST</code> <code><b>/apartments/{id}/assign-user</b></code> (Assign an user to an apartment)
  </summary>

**Description:** This endpoint assigns a user to an apartment.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/apartments/{id}/unassign-user/{userId}</b></code> (Unassign an user to an apartment)
  </summary>

**Description:** This endpoint unassigns a user to an apartment.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |
| `userId` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

## Authentication

<details>
  <summary>
    <code>POST</code> <code><b>/auth</b></code> (Authenticate and return a JWT token)
  </summary>

**Description:** This endpoint authenticates a user and returns a token.

##### Request Body

**Content-Type:** `application/json`

#### Payload

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |
| `401` | Unauthorized |

</details>

## Common Areas

<details>
  <summary>
    <code>POST</code> <code><b>/common-areas</b></code> (Register a common area)
  </summary>

**Description:** This endpoint registers a common area.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/common-areas</b></code> (Retrieve all common areas)
  </summary>

**Description:** This endpoint returns a list of all common areas.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/common-areas/{id}</b></code> (Retrieve a common area)
  </summary>

**Description:** This endpoint returns a common area.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/common-areas/{id}</b></code> (Update a common area)
  </summary>

**Description:** This endpoint updates a common area.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/common-areas/{id}</b></code> (Delete a common area)
  </summary>

**Description:** This endpoint deletes a common area.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |

</details>

## Condominiums

<details>
  <summary>
    <code>POST</code> <code><b>/condominiums</b></code> (Register a condominium)
  </summary>

**Description:** This endpoint registers a condominium.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/condominiums</b></code> (Retrieve all condominiums)
  </summary>

**Description:** This endpoint returns a list of all condominiums.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/condominiums/{id}</b></code> (Retrieve a condominium)
  </summary>

**Description:** This endpoint returns a condominium.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/condominiums/{id}</b></code> (Update a condominium)
  </summary>

**Description:** This endpoint updates a condominium.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/condominiums/{id}</b></code> (Delete a condominium)
  </summary>

**Description:** This endpoint deletes a condominium.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |

</details>

## Fees

<details>
  <summary>
    <code>POST</code> <code><b>/fees</b></code> (Create a fee)
  </summary>

**Description:** This endpoint creates a new fee.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/fees</b></code> (Retrieve all fees)
  </summary>

**Description:** This endpoint returns a list of all fees.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/fees/{id}</b></code> (Retrieve a fee by ID)
  </summary>

**Description:** This endpoint returns a fee by its ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/fees/{id}</b></code> (Update a fee)
  </summary>

**Description:** This endpoint updates an existing fee.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/fees/{id}</b></code> (Delete a fee)
  </summary>

**Description:** This endpoint deletes a fee by their ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |
| `404` | Not Found |

</details>

## Other

<details>
  <summary>
    <code>POST</code> <code><b>/notice-managements</b></code>
  </summary>

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/notice-managements</b></code>
  </summary>

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/notice-managements/{id}</b></code>
  </summary>

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/notice-managements/{id}</b></code>
  </summary>

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/notice-managements/{id}</b></code>
  </summary>

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |

</details>

## Payments

<details>
  <summary>
    <code>POST</code> <code><b>/Payments</b></code> (Create a Payment)
  </summary>

**Description:** This endpoint creates a new Payment.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/Payments</b></code> (Retrieve all Payments)
  </summary>

**Description:** This endpoint returns a list of all Payments.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/Payments/{id}</b></code> (Retrieve a Payment by ID)
  </summary>

**Description:** This endpoint returns a Payment by its ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/Payments/{id}</b></code> (Update a Payment)
  </summary>

**Description:** This endpoint updates an existing Payment.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/Payments/{id}</b></code> (Delete a Payment)
  </summary>

**Description:** This endpoint deletes a Payment by their ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |
| `404` | Not Found |

</details>

## Users

<details>
  <summary>
    <code>POST</code> <code><b>/users</b></code> (Create a user)
  </summary>

**Description:** This endpoint creates a new user.

##### Request Body

**Content-Type:** `application/json`

#### Payload

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "profile": "ADMIN|MANAGER|RESIDENT",
  "contactPhone": "31999999999",
  "birthDate": "12/12/2012"
}
```

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `201` | Created |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/users</b></code> (Retrieve all users)
  </summary>

**Description:** This endpoint returns a list of all users.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>GET</code> <code><b>/users/{id}</b></code> (Retrieve a user by ID)
  </summary>

**Description:** This endpoint returns a user by their ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |
| `404` | Not Found |

</details>

<details>
  <summary>
    <code>PUT</code> <code><b>/users/{id}</b></code> (Update a user)
  </summary>

**Description:** This endpoint updates an existing user.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Request Body

**Content-Type:** `application/json`

#### Payload

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "profile": "ADMIN|MANAGER|RESIDENT",
  "contactPhone": "31999999999",
  "birthDate": "12/12/2012"
}
```

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |
| `404` | Not Found |

</details>

<details>
  <summary>
    <code>DELETE</code> <code><b>/users/{id}</b></code> (Delete a user)
  </summary>

**Description:** This endpoint deletes a user by their ID.

##### Parameters

| Name | In | Type | Description |
| ---- | -- | ---- | ----------- |
| `id` | path | string |  |

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |
| `404` | Not Found |

</details>

<details>
  <summary>
    <code>POST</code> <code><b>/users/forgot-password</b></code> (Initiate password recovery)
  </summary>

**Description:** This endpoint sends an email to the user who forgot their password containing an OTP code.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |

</details>

<details>
  <summary>
    <code>POST</code> <code><b>/users/forgot-password/validate-otp</b></code> (Validate OTP code)
  </summary>

**Description:** This endpoint validates the OTP code that was sent to the user by email.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `200` | OK |
| `400` | Bad Request |

</details>

<details>
  <summary>
    <code>POST</code> <code><b>/users/reset-password</b></code> (Reset user password)
  </summary>

**Description:** This endpoint resets the user\'s password in the database.

##### Response Status Code

| HTTP Code | Description |
| --------- | ----------- |
| `204` | No Content |
| `400` | Bad Request |

</details>

## Considerações de Segurança

**1. Autenticação e Autorização**
- **Autenticação por Token:**
  A aplicação utiliza endpoints dedicados para autenticação (/auth) que geram tokens para diferentes perfis (ADMIN, MANAGER, RESIDENT). Esses tokens são essenciais para garantir que apenas usuários autenticados possam acessar as demais funcionalidades da API.
- **Autorização Baseada em Perfil:**
  Cada endpoint valida o perfil do usuário autenticado, permitindo ou negando acesso conforme as permissões atribuídas. Por exemplo, testes para criação ou exclusão de usuários demonstram que endpoints sem o token adequado ou com tokens de perfis sem autorização retornam erros (status 401 ou 403), prevenindo acessos indevidos.

**2. Validação de Dados e Tratamento de Erros**
- **Validação dos Inputs:**
  Os testes na collection verificam que payloads inválidos, como e-mails mal formatados ou dados ausentes, resultam em respostas com erros claros e status HTTP apropriados (400 – Bad Request). Essa validação robusta impede ataques como injeção de código e garante que somente dados consistentes sejam processados.
- **Estrutura Padronizada de Erros:**
  As respostas de erro seguem um formato padronizado que inclui mensagens descritivas e um array de erros. Essa abordagem evita a exposição de detalhes sensíveis sobre a lógica interna da aplicação, minimizando a superfície de ataque.

**3. Proteção contra Ataques Comuns**
- **Proteção contra Acesso Não Autorizado:**
  A implementação de testes para requisições sem token ou com token vazio reforça a necessidade de autenticação para o acesso a recursos críticos, mitigando riscos de acesso não autorizado.
- **Validação de Permissões:**
  O sistema valida que o usuário tem permissão para executar ações específicas, por exemplo, ao tentar deletar ou atualizar dados. Endpoints que verificam permissões (retornando status 403 – Forbidden quando necessário) ajudam a prevenir que usuários maliciosos ou mal configurados possam modificar dados que não lhes pertencem.

**4. Comunicação Segura**
- **Uso de HTTPS:**
  A aplicação deve utilizar conexões seguras (HTTPS) para garantir que os tokens e demais dados trafegados não sejam interceptados ou modificados por terceiros.
- **Armazenamento Seguro de Credenciais e Tokens:**
  As senhas dos usuários são armazenadas de forma segura (encriptadas) para evitar que, mesmo em caso de violação, os dados sensíveis sejam comprometidos.

**5. Integração com Ferramentas e Processos de Teste**
- **Testes de Segurança Automatizados:**
  A collection Postman já verifica, por meio dos testes de autorização e de respostas a payloads inválidos, se a aplicação se comporta de maneira segura.
- **Simulação de Ataques:**
  É recomendável, em um estágio posterior, a utilização de ferramentas especializadas (como OWASP ZAP ou Burp Suite) para simular ataques e identificar possíveis vulnerabilidades na aplicação.


# Implantação

A implantação da aplicação em um ambiente de produção requer planejamento para garantir segurança, escalabilidade e disponibilidade. Abaixo estão os requisitos e instruções detalhadas:

## 1. Requisitos de Hardware e Software

### Requisitos Mínimos de Hardware

| Componente     | Especificação             | Observações                                           |
|----------------|---------------------------|-------------------------------------------------------|
| Servidor       | 2 vCPUs, 4 GB RAM, 20 GB SSD | Para ambientes pequenos/médios (até 1.000 usuários). |
| Banco de Dados | 4 vCPUs, 8 GB RAM, 50 GB SSD | Garantir desempenho em operações de leitura/escrita. |
| Rede           | 100 Mbps dedicados         | Latência máxima de 50 ms para conexões API.          |

### Requisitos de Software

| Componente | Versão             | Observações                                        |
|------------|--------------------|----------------------------------------------------|
| Node.js    | 18.x ou superior   | Necessário para execução do backend.              |
| MySQL      | 8.0 ou superior    | Banco de dados relacional principal.              |
| Docker     | 24.x ou superior   | Para conteinerização da aplicação.                |
| Nginx      | 1.25 ou superior   | Opcional para load balancing e proxy reverso.     |
| PM2        | 5.x ou superior    | Gerenciador de processos para Node.js.            |

## 2. Plataforma de Hospedagem

### Opção 1: AWS (Amazon Web Services)

| Serviço | Uso                           | Benefícios                                          |
|---------|-------------------------------|-----------------------------------------------------|
| EC2     | Hospedagem do servidor Node.js | Escalabilidade vertical/horizontal.                |
| RDS     | Banco de dados MySQL gerenciado | Backup automático e alta disponibilidade.         |
| ECS/EKS | Orquestração de containers Docker | Ideal para ambientes microservices.           |
| S3      | Armazenamento de arquivos estáticos | Integração com CDN para performance.         |

### Opção 2: Microsoft Azure

| Serviço      | Uso                            | Benefícios                                      |
|--------------|--------------------------------|-------------------------------------------------|
| Azure VMs    | Hospedagem do servidor Node.js | Flexibilidade de configuração.                 |
| Azure SQL    | Banco de dados MySQL gerenciado | Segurança avançada e monitoramento.           |
| AKS          | Kubernetes para containers Docker | Escalabilidade automática.                   |
| Blob Storage | Armazenamento de arquivos estáticos | Redundância global e baixa latência.        |

## 3. Configuração do Ambiente

### Passos para Configuração

#### Instalação de Dependências

```bash
# Node.js e NPM
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Docker
sudo apt-get install docker.io
sudo systemctl enable docker
```

#### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NODE_ENV=production
SERVER_PORT=8080
DATABASE_URL=mysql://USUÁRIO:SENHA@HOST:PORTA/BANCO
JWT_SECRET=SUA_CHAVE_SECRETA_AQUI
```

#### Configuração do Banco de Dados

```terminal
npm run prisma:seed 
```

#### Build da Aplicação

```bash
npm install
npm run dev
```

## 4. Deploy da Aplicação

### Opção 1: Docker (Recomendado)

#### Crie um Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

#### Build e Push da Imagem

```bash
docker build -t gestao-condominios:latest .
docker tag gestao-condominios:latest SUA_REGISTRY/gestao-condominios:latest
docker push SUA_REGISTRY/gestao-condominios:latest
```

Implante no AWS ECS/Azure AKS:  
Siga a documentação da plataforma para configurar clusters e serviços.

### Opção 2: Servidor Dedicado (EC2/Azure VM)

#### Inicie o Serviço com PM2

```bash
npm install -g pm2
pm2 start dist/index.js --name "gestao-condominios"
pm2 save
pm2 startup
```

## 5. Testes em Produção

### Tipos de Testes

| Teste        | Ferramenta     | Objetivo                                                             |
|--------------|----------------|----------------------------------------------------------------------|
| Smoke Test   | Postman/Newman | Verificar se os endpoints críticos (ex: /auth, /users) estão respondendo. |
| Teste de Carga | Artillery/K6  | Simular 100 usuários concorrentes para avaliar escalabilidade.       |
| Monitoramento | AWS CloudWatch | Acompanhar métricas de CPU, memória e latência.                     |

### Comandos para Validação

```bash
# Verifique se a aplicação está online
curl -X GET http://localhost:8080/health

# Teste autenticação
curl -X POST http://localhost:8080/auth   -H "Content-Type: application/json"   -d '{"email": "admin@example.com", "password": "abc123"}'
```

## Observações Finais

- **Escalabilidade**: Utilize auto-scaling groups (AWS) ou VM Scale Sets (Azure) para ajustar recursos conforme a demanda.
- **Backup**: Configure backups diários do banco de dados via RDS/Azure SQL.
- **Segurança**: Habilite HTTPS via Let's Encrypt ou certificados gerenciados pela plataforma de nuvem.

## Testes

**1. Casos de Teste para Requisitos Funcionais**  
A collection implementa testes para as principais funcionalidades da aplicação, incluindo:  
- **Autenticação (Auth):**  
  - Testes para geração de tokens de acesso para diferentes perfis (ADMIN, MANAGER, RESIDENT).  
  - Validação de tentativas com credenciais inválidas e de payloads vazios, garantindo respostas com status 401 (não autorizado) ou 400 (bad request) e estruturas de erro padronizadas.  
- **Gestão de Usuários (Users):**  
  - Criação de usuários com payloads válidos, onde o teste armazena o ID do novo usuário para uso em testes subsequentes.  
  - Validação de campos obrigatórios, como e-mail, senha, nome e perfil, testando também cenários de payloads incompletos ou dados incorretos (ex.: e-mail inválido, perfil com valor incorreto).  
  - Testes para recuperação de senha (forgot-password e reset-password) e para operações de leitura, atualização (PUT /users/:id) e exclusão (DELETE /users/:id), incluindo verificações de permissões (ex.: requisições sem token ou com token de usuário sem permissão).  
- **Outras Funcionalidades:**  
  - Endpoints para “Common Area”, “Condominiums”, “Apartments” e “Fee” também são testados quanto à resposta (status 200, 201, etc.), formato dos dados (JSON) e estrutura dos objetos retornados.  
  - Cada endpoint possui verificações detalhadas quanto à existência e tipo de propriedades (por exemplo, que os arrays retornados contenham objetos com campos como id, type, quantity, etc.).

**2. Testes de Integração**  
- A collection valida a interação entre diferentes módulos do sistema:  
  - Por exemplo, a autenticação é testada em vários endpoints, onde o token gerado em um teste (ex.: /auth - ADMIN) é reutilizado para testar a criação, consulta e atualização de usuários e outros recursos.  
  - A encadeação de requisições (como criação de condomínio seguido de criação de apartamento vinculado a esse condomínio) demonstra a integração correta dos componentes da aplicação.

**3. Testes de Carga e Desempenho**
- Apesar de a collection Postman não incluir testes de carga propriamente ditos, a estratégia de testes pode ser complementada com:
  - Execução da collection via Newman em cenários de alta concorrência para medir o tempo de resposta e identificar gargalos.

**4. Ferramentas Utilizadas**
- **Postman:** Para criação, organização e execução dos testes de API.
- **Newman:** Para automação e execução em ambientes de integração contínua, permitindo a execução de testes em lote e a geração de relatórios detalhados.

Esta abordagem garante que cada componente seja testado isoladamente (testes unitários), que as integrações entre eles estejam funcionando corretamente (testes de integração) e que a aplicação seja capaz de suportar condições reais de uso (testes de carga), utilizando um conjunto robusto de ferramentas para automatizar e agilizar o processo de validação contínua.

# Referências

- Prisma: https://www.prisma.io/docs
- Node.js: https://nodejs.org/en/docs/
- Swagger: https://swagger.io/docs/
- Docker: https://docs.docker.com/
- Postman: https://www.postman.com/