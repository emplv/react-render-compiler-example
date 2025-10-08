# React Re-render Demo (React 18 • shadcn-style UI)

A polished demo showing **incorrect component composition** and **over-memoization** vs an improved approach.
Built with Vite + React 18 + Tailwind, using local **shadcn-style** UI primitives (Button, Card, Input, Select, Badge).

## Run
```bash
npm i
npm run dev
# open http://localhost:5173
```

## What to try
- Type in **Search** (2000 items).
- Change **Sort** (Name / Price / Rating).
- Toggle **Theme**.
- Switch between **Problematic** and **Optimized** modes with the top button and profile both.

## Notes
- This project keeps React at **v18** so you can later upgrade to **React 19 + React Compiler** for your second demo.
- The UI components mimic shadcn/ui ergonomics but are local (no generator needed), ensuring easy install + run.
