# n8n-nodes-random

Conector customizado para o **n8n**, que utiliza a API do [Random.org](https://www.random.org/) para gerar números verdadeiramente aleatórios.

## ✨ Funcionalidade
O conector **Random** possui uma única operação:

- **True Random Number Generator**
  - **Inputs**: `Min` e `Max` (inteiros, inclusivos).
  - **Output**: um número inteiro aleatório no intervalo informado.
  - **Fonte**: [Random.org API](https://www.random.org/integers/)


## 🛠 Pré-requisitos
- [Node.js 22 LTS](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [n8n](https://n8n.io/) self-hosted rodando via Docker (imagem oficial)


## 🚀 Como rodar localmente

### 1. Clone o repositório

- git clone https://github.com/luizinx/n8n-nodes-random.git

- cd "custom\n8n-nodes-random"

### 2. Instale as dependências

- npm installl

### 3. Compile o projeto

- npm run

Esse comando:
- Compila o código TypeScript em dist/
- Copia o ícone random.svg para a pasta final

### 4. Suba a infra do n8n

- docker-compose up -d

O Postgres será iniciado automaticamente
O n8n ficará disponível em: http://localhost:5678

. Teste o Node no n8n

#### TESTE FINAL ####
Acesse o painel do n8n:
👉 http://localhost:5678

Crie um novo workflow.

Adicione o Node Random.

Informe valores para Min e Max.

Execute o workflow → será retornado um número gerado pela API do Random.org.