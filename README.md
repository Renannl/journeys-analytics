# Journeys Analytics

Projeto completo de análise de jornadas de usuários para Teste Técnico, composto por um **backend em Node.js + TypeScript** e um **frontend em React**.

---

## Estrutura do Projeto
journeys-project/
├── journeys-api-node-ts/ → API em Node.js (Express + XLSX)
└── journeys-client/ → Frontend em React (TypeScript)

## Funcionalidades

- Leitura de um arquivo Excel (`[Nemu] Base de dados.xlsx`)
- Agrupamento de sessões e jornadas de usuários
- Filtro por Canal, Campanha, Conjunto de Anúncios e Anúncios
- Interface visual minimalista com cores fixas por canal
- Dashboard interativa com abas (“Jornadas” e “Sessões”)

## Como Rodar o Projeto

### Clonar o repositório

git clone https://github.com/Renannl/journeys-analytics.git
cd journeys-analytics

### Rodar o Backend

cd journeys-api-node-ts
npm install
npm run dev

"O servidor rodará em http://localhost:3000"

### Rodar o Frontend

Em outro terminal:

cd journeys-client
npm install
npm run dev


"O frontend rodará em http://localhost:5173"