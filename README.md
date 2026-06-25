# Poções e Soluções

Projeto desenvolvido para a **Atividade Prática 2** da disciplina **SCC0219 - Introdução ao Desenvolvimento Web**.

A aplicação representa a loja fictícia **Poções e Soluções**, da personagem Annabelle Merigold. O sistema possui uma página pública para compradores e uma página administrativa para cadastro, listagem e remoção de poções.

## Funcionalidades

### Página pública

* Apresenta a descrição da loja.
* Mostra o histórico da loja.
* Exibe uma seção de produtos disponíveis.
* Cada poção possui nome, imagem, descrição, preço e botão **Comprar**.
* As poções são carregadas dinamicamente a partir do Web Service usando JavaScript e `fetch`.

### Página administrativa

* Lista todas as poções cadastradas.
* Permite cadastrar uma nova poção.
* Permite remover uma poção existente.
* As operações são feitas por meio da API do backend.

## Tecnologias utilizadas

* HTML
* CSS
* JavaScript
* Node.js
* Express
* Sequelize
* SQLite em memória
* CORS

O projeto utiliza JavaScript puro no frontend, sem React.

## Estrutura do projeto

```text
loja-pocoes-e-solucoes-web/
│
├── package.json
├── package-lock.json
├── README.md
│
├── backend/
│   ├── database.js
│   ├── server.js
│   ├── models/
│   │   └── Potion.js
│   └── routes/
│       └── potions.js
│
└── frontend/
    ├── index.html
    ├── admin.html
    ├── css/
    │   └── style.css
    └── js/
        ├── api.js
        ├── loja.js
        └── admin.js
```

## Pré-requisitos

Para executar o projeto, é necessário ter instalado:

* Node.js
* npm
* Git

O projeto foi desenvolvido e testado com:

```text
Node.js v24.14.0
npm 11.9.0
```

Versões recentes do Node.js também devem funcionar.

## Como executar

Os comandos abaixo funcionam no **PowerShell do Windows**, no **terminal do VS Code** e em terminais **Linux/macOS**.

Clone o repositório:

```bash
git clone https://github.com/Wil-tord/loja-pocoes-e-solucoes-web.git
```

Entre na pasta do projeto:

```bash
cd loja-pocoes-e-solucoes-web
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Depois, acesse no navegador:

```text
http://localhost:3000
```

Página administrativa:

```text
http://localhost:3000/admin.html
```

API de poções:

```text
http://localhost:3000/api/potions
```

Para parar o servidor, use:

```text
Ctrl + C
```

## Rotas da API

### Verificar se o servidor está funcionando

```text
GET /api/health
```

### Listar poções

```text
GET /api/potions
```

### Cadastrar poção

```text
POST /api/potions
```

Exemplo de corpo da requisição:

```json
{
  "name": "Poção da Boa Sorte",
  "description": "Aumenta temporariamente a sorte de quem bebe.",
  "image": "https://exemplo.com/imagem.png",
  "price": 250
}
```

### Remover poção

```text
DELETE /api/potions/:id
```

Exemplo:

```text
DELETE /api/potions/1
```

## Banco de dados

O projeto utiliza **SQLite em memória**, conforme solicitado na atividade.

Isso significa que:

* os dados ficam disponíveis enquanto o servidor estiver rodando;
* ao parar e iniciar novamente o servidor, o banco é recriado;
* as poções iniciais são cadastradas automaticamente a cada execução.

## Poções iniciais

O banco é iniciado com algumas poções de exemplo:

* Poção Blue Sky
* Poção do Perfume Misterioso
* Poção de Pinus
* Poção da Beleza Eterna
* Poção do Arco Íro
* Caldeirão das Verdades Secretas

## Observações

As imagens das poções são carregadas a partir de URLs externas. Por isso, elas podem demorar alguns segundos na primeira vez que a página for aberta, dependendo da conexão com a internet.

Como o banco está em memória, qualquer poção cadastrada pela página administrativa será perdida quando o servidor for encerrado. Ao iniciar o servidor novamente, os dados voltam para o estado inicial.

Nesta entrega, os botões **Comprar** são exibidos conforme solicitado, mas ainda não possuem funcionalidade real de compra.

## Melhorias futuras

Esta versão atende aos requisitos principais da atividade, mas algumas melhorias poderiam ser implementadas em versões futuras do sistema:

* Implementar a funcionalidade real do botão **Comprar**, permitindo que o usuário selecione uma poção e finalize ou simule uma compra.
* Adicionar **autenticação e autorização** na página administrativa, para que apenas a vendedora da loja consiga acessar as funções de cadastro e remoção de poções.
* Substituir o SQLite em memória por um banco de dados persistente, como **PostgreSQL**, para que as poções cadastradas não sejam perdidas quando o servidor for encerrado.
* Melhorar a confirmação de remoção de poções, substituindo o `confirm()` padrão do navegador por uma janela de confirmação personalizada, como um **modal**, mais integrada ao visual da página.
* Adicionar validações mais completas no formulário de cadastro, como validação de preço, URL da imagem e campos obrigatórios.
* Permitir upload local de imagens, em vez de depender apenas de URLs externas.
* Melhorar aspectos de acessibilidade, como textos alternativos mais descritivos nas imagens e mensagens de status mais claras.

## Autor

**Wiltord N Mosingi**

Disciplina: SCC0219 - Introdução ao Desenvolvimento Web

Atividade Prática 2
