# Front-end Móvel

Este projeto consiste no desenvolvimento de uma interface mobile interativa para uma aplicação, cujo objetivo é permitir que usuários consultem, interajam e realizem operações em um sistema de administração de condomínios. A interface será projetada especificamente para dispositivos móveis, com foco em usabilidade, desempenho e adaptação a diferentes tamanhos de tela. A experiência do usuário será otimizada para interações por toque, garantindo uma navegação fluida, acessível e intuitiva. O design seguirá uma abordagem moderna e minimalista, alinhada às boas práticas de UX/UI mobile, visando facilitar o uso diário da aplicação em smartphones e tablets.

## Projeto da Interface

#### Dentro da aplicação

Uma vez autenticado, o usuário tem acesso a uma interface organizada e funcional, projetada para facilitar as rotinas do condomínio.

#### Estrutura e Telas Principais

* **Dashboard (Início):** Tela inicial que apresenta um resumo das informações mais relevantes, como avisos importantes, próximas reservas e atalhos para as funções mais utilizadas.
* **Tela de Comunicados:** Funciona como um mural digital, exibindo avisos, notícias e comunicados do síndico ou da administração.
* **Tela de Reservas de Áreas Comuns:** Interface que permite aos moradores visualizarem a disponibilidade de espaços (como salão de festas e churrasqueira) e realizarem agendamentos de forma simples.
* **Tela Financeira:** Seção para consulta de boletos, histórico de pagamentos e visualização de balancetes do condomínio.
* **Tela de Detalhes:** Exibe informações específicas ao ser acionada, como o conteúdo completo de um comunicado, os detalhes de uma reserva ou as informações de um boleto.

Em geral, a aplicação apresenta um design simples, porém robusto, capaz de entregar ao usuário uma experiencia de uso agradável e facilitada. O acesso fácil às informações mais importantes de forma segura e intuitiva faz da aplicação uma maneira objetiva de realizar consultas e solicitar serviços.


### Wireframes
![Tela de Dashboard](img/Wireframes_Mobile/Flow.png) 

<small>Wireframes individuais - [Ver pasta Wireframes](img/Wireframes_Mobile/Wireframes_individuais)</small>

Os wireframes foram desenvolvidos de modo a auxiliar no processo de desenvolvimento, dando clareza e direção à equipe, facilitando a visualização da estrutura e funcionalidade das interfaces antes da implementação final. Abaixo estão os principais wireframes e a descrição de seus fluxos.


**Tela Inicial, Login e Redefinir senha**
![Tela de Inicial](docs/img/Wireframes_Mobile/Tela_Inicial_login.png)

O fluxo de acesso do usuário começa na Tela Inicial de Boas-Vindas. Sua estrutura é composta por uma imagem de destaque, uma mensagem de saudação e um botão de chamada para ação "Entrar".

Ao acionar o botão, o usuário é direcionado para a Tela de Login. Nesta etapa, ele pode se autenticar na aplicação informando seu e-mail e senha. A tela também fornece um link para "Redefinir senha", que inicia o fluxo de recuperação de acesso caso o usuário tenha esquecido suas credenciais.
<br>

**Dashboard e Menu**
![Tela de Dashboard](img/Wireframes_Mobile/Dashboard_Menu.png)    

A Tela de Dashboard funciona como o painel de controle principal da aplicação. A tela é projetada para fornecer uma visão geral dos dados mais importantes através de cartões de indicadores (KPIs) e gráficos.

A navegação principal é consolidada em um menu lateral (drawer), acionado por um ícone no canto superior esquerdo. Ao ser ativado, o menu revela os links para as seções essenciais do sistema: Apartamentos, Usuários, Reservas, Pagamentos e Notificações. Na parte inferior do menu, a opção "Sair" permite que o usuário encerre sua sessão de forma segura.
<br>

**Padrão de Gerenciamento de informações (CRUD)**
![Tela de Dashboard](img/Wireframes_Mobile/Tela_de_Consulta_Completa.png) 

Este conjunto de wireframes estabelece o fluxo padrão para o gerenciamento de registros na aplicação. O processo tem como ponto de partida uma Tela de Consulta, que exibe uma lista paginada dos itens cadastrados e oferece a ação principal de "Adicionar".

A partir da tela de consulta, o fluxo se desdobra:

* **Criação (Create):** Ao acionar "Adicionar", o usuário é levado à Tela de Adição, onde preenche um formulário com os dados necessários. A ação "Salvar" confirma a inclusão do novo registro e retorna à lista, enquanto "Cancelar" descarta a operação.

* **Leitura e Ações (Read, Update, Delete):** Ao selecionar um item da lista, o sistema exibe a Tela de Detalhamento, que apresenta todas as informações do registro selecionado. A partir desta tela, é possível:

    * Editar (Update): Aciona a tela de edição, que reutiliza a estrutura do formulário para modificar os dados existentes.

    * Remover (Delete): Exclui permanentemente o registro do sistema, retornando o usuário à tela de consulta.
    
    A aplicação emprega uma estrutura CRUD padronizada em todos os seus módulos de gerenciamento, variando apenas a entidade de dados exibida em cada tela.   


### Design Visual

O estilo visual da interface foi concebido para ser limpo, moderno e funcional, com uma paleta de cores que garante excelente legibilidade e foco no conteúdo.

#### Paleta de Cores

A paleta de cores foi definida a partir de um conjunto específico para garantir consistência visual em toda a aplicação.

* **Cor Primária (Ações):** Um tom de **azul profundo (`#1E40AF`)** é a cor principal, utilizada em botões de ação, links, ícones ativos e elementos que exigem atenção do usuário.
* **Cores Neutras (Base):**
    * **Branco (`#FFFFFF`)** e **Preto (`#000000`)** servem como a base da interface, para fundos e textos, garantindo máximo contraste.
    * A escala de **cinza** é usada para criar hierarquia e profundidade:
        * **`gray.500` (`#2D2D2D`)** funciona como a cor principal para texto de alta ênfase.
        * **`gray.400` (`#707070`)** para textos secundários, legendas e ícones inativos.
* **Cores de Feedback e Destaque:**
    * A paleta de **verde**, como **`green.500` (`#3ECF8F`)**, é utilizada para indicar sucesso, confirmações e status positivos. O tom mais claro, **`green.400` (`#70E1C1`)**, usado para fundos ou destaques sutis relacionados a uma ação bem-sucedida.

#### Tipografia

A escolha tipográfica prioriza a clareza e a legibilidade.

* **Fonte Principal:** Família de fontes **Sans-Serif** moderna.
* **Hierarquia e Peso:** A hierarquia é estabelecida através de diferentes pesos (Regular, Medium, Bold) e tamanhos de fonte, distinguindo claramente Títulos, Subtítulos, Corpo de texto e Legendas.

#### Iconografia

* **Estilo:** Os ícones seguem um estilo **minimalista e consistente**, predominantemente de linha (`outline`), para garantir que sejam facilmente reconhecíveis sem causar distração visual.
* **Aplicação:** São utilizados em pontos estratégicos, como na barra de navegação (Tab Bar), botões de ação e para ilustrar itens em listas, melhorando a identificação rápida das funcionalidades.

#### Elementos Gráficos e Componentes

* **Cards:** A informação é organizada em cards com **cantos arredondados** e **sombras sutis**, criando uma sensação de organização.
* **Botões:** Possuem cantos arredondados, com estados visuais claros para `normal`, `pressionado` e `desativado`.


## Fluxo de Dados

O fluxo de dados da aplicação seguirá o padrão **MVC (Model-View-Controller)** no frontend, utilizando requisições assíncronas via **API REST** para a comunicação com o backend.

O ciclo de uma interação típica pode ser descrito da seguinte forma:

1.  **Interação do Usuário:** O usuário interage com um componente na **`View`** (a interface gráfica).
    * *Exemplo: Tocar no botão "Reservar" em uma área comum.*

2.  **Disparo de Evento:** A **`View`** dispara um evento que é capturado pelo **`Controller`** correspondente.

3.  **Processamento e Requisição:** O **`Controller`** processa a lógica de negócio, monta os dados necessários e realiza uma chamada assíncrona para a **API REST** no backend.
    * *Exemplo: `POST /reservas` com os dados do agendamento.*

4.  **Resposta da API:** A **API** processa a requisição e retorna uma resposta com o resultado da operação (sucesso ou erro).

5.  **Atualização do Estado:** O **`Controller`** recebe e trata a resposta da API, atualizando o estado da aplicação.

6.  **Renderização da View:** A **`View`** é atualizada dinamicamente para refletir o novo estado, exibindo uma mensagem de confirmação ou erro para o usuário e atualizando a lista de reservas.

Este fluxo garante que a lógica de negócio, a manipulação de dados e a interface do usuário permaneçam desacopladas, facilitando a manutenção e a escalabilidade do código.

## Tecnologias Utilizadas

[Lista das tecnologias principais que serão utilizadas no projeto.]

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

FONSECA, Kakau. Mobile design: 5 boas práticas para desenhar interfaces. UX Collective 🇧🇷, 25 abr. 2018. Disponível em: https://uxdesign.cc/mobile-design-5-boas-pr%C3%A1ticas-para-desenhar-interfaces-e7a2a6d7a465. Acesso em: 14 mai. 2025.

MIRO. O que é wireframe? Disponível em: https://miro.com/pt/wireframe/o-que-e-wireframe/. Acesso em:  14 mai. 2025.

WONG, Euphemia. User Interface Design Guidelines: 10 Rules of Thumb. The Interaction Design Foundation, 14 mar. 2025. Disponível em: https://www.interaction-design.org/literature/article/user-interface-design-guidelines-10-rules-of-thumb. Acesso em: 15 mai. 2025.
