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
[Descreva a modelagem da aplicação, incluindo a estrutura de dados, diagramas de classes ou entidades, e outras representações visuais relevantes.]

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

Tabela: Payment - Pagamentos das Taxas.
- id: `CUID - Primary Key` - Identificador único do pagamento.
- userId: `STRING - Foreign Key` - Referência ao usuário que fez o pagamento.
- feeId: `STRING - Foreign Key` - Referência à taxa que foi paga.
- amount: `DECIMAL` - Valor do pagamento.

## Tecnologias Utilizadas

Existem muitas tecnologias diferentes que podem ser usadas para desenvolver APIs Web. A tecnologia certa para o seu projeto dependerá dos seus objetivos, dos seus clientes e dos recursos que a API deve fornecer.

[Lista das tecnologias principais que serão utilizadas no projeto.]

## API Endpoints

[Liste os principais endpoints da API, incluindo as operações disponíveis, os parâmetros esperados e as respostas retornadas.]

### Endpoint 1
- Método: GET
- URL: /endpoint1
- Parâmetros:
  - param1: [descrição]
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "message": "Success",
      "data": {
        ...
      }
    }
    ```
  - Erro (4XX, 5XX)
    ```
    {
      "message": "Error",
      "error": {
        ...
      }
    }
    ```

## Considerações de Segurança

[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]

## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
