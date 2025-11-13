## README.md
```
# Journeys API (Node + TypeScript)


API that reads an Excel file containing user session events and exposes a processed, grouped view of journeys via `GET /journeys`.


## How to run


1. Install deps


```bash
npm install
```


2. Place the Excel file in `./data/` with the same filename used in the example or set environment variable `DATA_FILE`.


Default expected path: `./data/[Nemu] Base de dados.xlsx`


3. Run in dev mode


```bash
npm run dev
```


4. Open `http://localhost:3000/journeys`
