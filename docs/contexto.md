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

Desenvolver um MVP de uma aplicação web e mobile para otimizar a gestão financeira e administrativa de condomínios, facilitando o pagamento das taxas pelos inquilinos e disponibilizar uma ferramenta eficiente para a administração condominial. Após a criação do MVP, novas funcionalidades poderão ser adicionadas conforme a evolução do projeto e as necessidades dos usuários.

## Objetivos Específicos

- Facilitar a gestão de pagamentos dos inquilinos: Implementar funcionalidades que permitam aos moradores visualizar boletos, realizar pagamentos e acompanhar o histórico de suas despesas condominiais, garantindo transparência e praticidade.

- Apoiar a administração condominial: Disponibilizar ferramentas para que síndicos e administradores possam gerenciar pagamentos recebidos, acompanhar inadimplências e gerar relatórios financeiros de maneira automatizada.


## Justificativa

Descreva a importância ou a motivação para trabalhar com esta aplicação que você escolheu. Indique as razões pelas quais você escolheu seus objetivos específicos ou as razões para aprofundar em certos aspectos do software.

O grupo de trabalho pode fazer uso de questionários, entrevistas e dados estatísticos, que podem ser apresentados, com o objetivo de esclarecer detalhes do problema que será abordado pelo grupo.

> **Links Úteis**:
>
> - [Como montar a justificativa](https://guiadamonografia.com.br/como-montar-justificativa-do-tcc/)

## Público-Alvo

O sistema de gerenciamento de condomínios será utilizado por diferentes perfis de usuários, cada um com necessidades específicas dada as devidas funções e participações dentro do contexto e também diferentes níveis de familiaridades e disponibilidades tecnológicas. O objetivo é garantir uma experiência acessível e eficiente para todos os envolvidos nas operações.
### Usuários

1. Síndicos/Administradores de Condomínio
Esses usuários são os principais responsáveis pela gestão do condomínio, tomando decisões estratégicas e operacionais além das finanças do condomínio. Podem ter experiência variada com tecnologia, desde aqueles mais acostumados a sistemas digitais até outros que preferem processos tradicionais em papel. Buscam otimizar os processos gerenciais do condomínio.

2. Moradores e Proprietários
Os moradores utilizam o sistema principalmente para acompanhar débitos, registrar solicitações, fazer reservas de áreas comuns e participar da comunicação interna do condomínio. Como o público anterior, a experiência e disponibilidade tecnológica é variada.

3. Prestadores de Serviço e Equipe de Segurança
Responsáveis pelo controle de acesso e segurança do condomínio, esses profissionais utilizam o sistema para registrar atividades, liberar acessos e monitorar ocorrências.

### Mapa de Stakeholders
- Usuários diretos: síndicos, administradores, moradores, prestadores de serviço.
- Usuários indiretos: contadores, empresas terceirizadas.
- Influenciadores: associações de moradores.

### Conclusão
O sistema deve ser intuitivo, acessível em diferentes dispositivos e garantindo a funcionalidade para suprir às necessidades de cada perfil de usuário. Além disso, a segurança dos dados é um fator chave para garantir a confiabilidade por parte dos usuários.


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

| ID  | Restrição                                                                |
| --- | ------------------------------------------------------------------------ |
| 01  | O sistema deve ser desenvolvido e implementado até o final do semestre   |
| 02  | O sistema deve estar disponível somente em ambientes Web e Mobile        |
| 03  | O sistema deve ser desenvolvido com um orçamento limitado                |

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
