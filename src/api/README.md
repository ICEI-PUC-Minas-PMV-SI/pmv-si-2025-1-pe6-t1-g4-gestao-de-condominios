### Padronizações

- Pastas sempre no plural (controllers, helpers, services, etc)
- Arquivos com nome simples (Auth, User, etc) e com exportações com o NomeArquivo+O que ele representa
  e.g: Arquivo User com as rotas do usuario, deve exportar a instancia como `UserRoute` se for um controller `UserController`
- Todos os arquivos devem fazer exportação com `export {}` para poderem ser importados via os paths do tsconfig.json

### Configuração de Ambiente

Requisitos mínimos

- Node >= 18

#### Passo a passo

1º) Copiar .env.example > .env

2º) Executar `npm i`

2º) Executar `npm run dev`

### SCRIPTS

- `index`: Gera arquivos index.ts nas pastas dos projeto e atualiza tsconfig.json para facilitar importação.

```sh
npm run index
```

E.g:

```json
Path:  api/src/controllers

// tsconfig.json
...
paths: {
  "@controllers": [
    "controllers\\index.ts"
  ]
}
...
```

```js
// File: api/src/example.js (exemplo de importação)

import { UserController } from '@controllers';

class Example {}
```

### Checklist API

- [x] Criação de estrutura inicial de pastas
- [x] Criação de scripts para geração de index / atualização de tsconfig.json
- [x] Inclusão de Middlewares para utilização de json no payload e validação de token
- [x] Definição de rotas públicas
- [x] Inclusão de Middleware para autenticação jwt
- [x] Inclusão de rota para assinatura jwt (POST /auth)
- [ ] Incluir dependencia para gerar documentação no padrão OpenAPI (Swagger)
- [ ] Criar estrutura de conexão com o banco de dados mysql
- [ ] Criação de rotas para as funcionalidades especificadas nos requisitos
- [ ] Incluir integração com e-mail (SMTP)
- [ ] Criação de templates (e.g Email de primeiro acesso / recuperação de senha)
