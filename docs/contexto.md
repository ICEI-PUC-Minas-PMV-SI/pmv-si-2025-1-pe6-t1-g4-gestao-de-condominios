# Introdução

Texto descritivo com a visão geral do projeto abordado. Inclui o contexto, o problema, os objetivos, a justificativa e o público-alvo do projeto.

## Problema

Nesse momento você deve apresentar o problema que a sua aplicação deve resolver. No entanto, não é a hora de comentar sobre a aplicação.

Descreva também o contexto em que essa aplicação será usada, se houver: empresa, tecnologias, etc. Novamente, descreva apenas o que de fato existir, pois ainda não é a hora de apresentar requisitos detalhados ou projetos.

Nesse momento, o grupo pode optar por fazer uso de ferramentas como Design Thinking, que permite um olhar de ponta a ponta para o problema.

> **Links Úteis**:
>
> - [Objetivos, Problema de pesquisa e Justificativa](https://medium.com/@versioparole/objetivos-problema-de-pesquisa-e-justificativa-c98c8233b9c3)
> - [Matriz Certezas, Suposições e Dúvidas](https://medium.com/educa%C3%A7%C3%A3o-fora-da-caixa/matriz-certezas-suposi%C3%A7%C3%B5es-e-d%C3%BAvidas-fa2263633655)
> - [Brainstorming](https://www.euax.com.br/2018/09/brainstorming/)

## Objetivos

Aqui você deve descrever os objetivos do trabalho indicando que o objetivo geral é desenvolver um software para solucionar o problema apresentado acima.

Apresente também alguns (pelo menos 2) objetivos específicos dependendo de onde você vai querer concentrar a sua prática investigativa, ou como você vai aprofundar no seu trabalho.

> **Links Úteis**:
>
> - [Objetivo geral e objetivo específico: como fazer e quais verbos utilizar](https://blog.mettzer.com/diferenca-entre-objetivo-geral-e-objetivo-especifico/)

## Justificativa

Descreva a importância ou a motivação para trabalhar com esta aplicação que você escolheu. Indique as razões pelas quais você escolheu seus objetivos específicos ou as razões para aprofundar em certos aspectos do software.

O grupo de trabalho pode fazer uso de questionários, entrevistas e dados estatísticos, que podem ser apresentados, com o objetivo de esclarecer detalhes do problema que será abordado pelo grupo.

> **Links Úteis**:
>
> - [Como montar a justificativa](https://guiadamonografia.com.br/como-montar-justificativa-do-tcc/)

## Público-Alvo

Descreva quem serão as pessoas que usarão a sua aplicação indicando os diferentes perfis. O objetivo aqui não é definir quem serão os clientes ou quais serão os papéis dos usuários na aplicação. A ideia é, dentro do possível, conhecer um pouco mais sobre o perfil dos usuários: conhecimentos prévios, relação com a tecnologia, relações
hierárquicas, etc.

Adicione informações sobre o público-alvo por meio de uma descrição textual, diagramas de personas e mapa de stakeholders.

> **Links Úteis**:
>
> - [Público-alvo](https://blog.hotmart.com/pt-br/publico-alvo/)
> - [Como definir o público alvo](https://exame.com/pme/5-dicas-essenciais-para-definir-o-publico-alvo-do-seu-negocio/)
> - [Público-alvo: o que é, tipos, como definir seu público e exemplos](https://klickpages.com.br/blog/publico-alvo-o-que-e/)
> - [Qual a diferença entre público-alvo e persona?](https://rockcontent.com/blog/diferenca-publico-alvo-e-persona/)

# Especificações do Projeto

## Requisitos

A classificação das prioridades foi baseada nos seguintes critérios:

ALTA:

- Funcionalidades essenciais para o funcionamento básico do sistema, requisitos relacionados à segurança e integridade dos dados.
- Recursos necessários para conformidade legal
- Funcionalidades que impactam diretamente na operação do condomínio

MÉDIA:

- Funcionalidades que melhoram a experiência do usuário
- Recursos complementares ao funcionamento básico
- Funcionalidades de relatórios e histórico
- Recursos de customização e personalização

BAIXA:

- Funcionalidades não essenciais e que podem ser implementados posteriormente
- Melhorias cosméticas ou de conveniência

### Requisitos Funcionais

| ID     | Descrição do Requisito                                               | Prioridade |
| ------ | -------------------------------------------------------------------- | ---------- |
| RF-001 | Permitir autenticação de usuários através de login e senha           | ALTA       |
| RF-002 | Permitir que o gestor cadastre / visualize / edite e remova usuários | ALTA       |
| RF-003 | Permitir que o gestor cadastre novos condomínios                     | ALTA       |
| RF-004 | Permitir que o gestor cadastre débitos para condôminos               | ALTA       |
| RF-005 | Permitir que o gestor defina data de vencimento dos débitos          | ALTA       |
| RF-006 | Permitir que o gestor registrem pagamentos de débitos                | ALTA       |
| RF-007 | Permitir diferentes perfis de acesso (gestor, condômino)             | ALTA       |
| RF-008 | Permitir que usuários visualizem seus débitos pendentes              | ALTA       |
| RF-009 | Permitir recuperação de senha                                        | ALTA       |
| RF-010 | Permitir que usuários editem seus dados pessoais                     | ALTA       |
| RF-011 | Permitir que usuários cadastrem placas de veículos autorizados       | ALTA       |
| RF-013 | Permitir que gestores gerem relatórios de inadimplência              | MÉDIA      |
| RF-012 | Sistema deve manter histórico de pagamentos por condômino            | BAIXA      |
| RF-014 | Permitir que gestores cadastrem avisos gerais para o condomínio      | BAIXA      |
| RF-015 | Enviar notificações automáticas sobre débitos pendentes              | BAIXA      |

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                                              | Prioridade |
| ------- | ----------------------------------------------------------------------------------- | ---------- |
| RNF-001 | Sistema deve criptografar todas as senhas armazenadas                               | ALTA       |
| RNF-002 | Sistema deve suportar múltiplos acessos simultâneos                                 | ALTA       |
| RNF-003 | Sistema deve estar em conformidade com a LGPD                                       | ALTA       |
| RNF-004 | Sistema deve ser compatível com os principais navegadores (Chrome, Firefox, Safari) | MÉDIA      |
| RNF-005 | Sistema deve ter interface intuitiva e de fácil utilização                          | MÉDIA      |
| RNF-006 | Sistema deve ter documentação técnica atualizada                                    | MÉDIA      |
| RNF-007 | Sistema deve ser responsivo para diferentes tamanhos de tela                        | BAIXA      |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID  | Restrição                                             |
| --- | ----------------------------------------------------- |
| 01  | O projeto deverá ser entregue até o final do semestre |
| 02  | Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
>
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

# Catálogo de Serviços

Descreva aqui todos os serviços que serão disponibilizados pelo seu projeto, detalhando suas características e funcionalidades.

# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![arq](https://github.com/user-attachments/assets/b9402e05-8445-47c3-9d47-f11696e38a3d)

## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)
