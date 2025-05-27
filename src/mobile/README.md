## Configuração de Ambiente

- Copiar .env.example para .env alterando valores necessários
- Rodar `npm i`
- Rodar `npm run dev` (atualmente configurado para android mas no package.json tem script para ios)
- Testado em node v20.17.0

Pendencias:

- Ação de sair do sistema
- Icone / Nome / SplashScreen do app

Auxílio na criação de páginas crud:

- src/app/apartment/_ ou src/app/user/_: Estrutura base dos componentes de List/View/Create/Edit
  - Arquivo de Fields.ts define os campos que vão ter no modo view / edit-create
- src/utilities/Messages.ts: Mensagens exibidas no Alert.show
- src/provider/User.ts (ou Apartment.ts): define "resource" para ser utilizado como parte de endpoints (e herda da class AbstractProvider métodos de busca/edição//criação etc
- src/navigation/RootStack.tsx: Declara as navegações (Usuários / Apartamentos etc)
- src/navigation/MainStack.tsx: Declara a página de listagem que fica na navegação de Drawer (menu lateral)
- api/src/services/User.ts / Apartment.ts, inclusão no método listAll tratativa de parâmetro de paginação
