# School Management System (Next.js)

A simple school management app built with Next.js 14 (App Router).

## Features
- Dashboard with totals, today's attendance and fee collection
- Students, Teachers and Classes: add, edit, delete, search
- Attendance: pick a class and date, mark present / absent / leave
- Fees: add records, mark as paid (amounts in PKR)

Data is saved in your browser (localStorage), so no database is needed.
Use "Reset sample data" in the sidebar to start over.

## Run it
1. Install Node.js 18.17 or newer from https://nodejs.org
2. Open this folder in a terminal and run:

```bash
npm install
npm run dev
```

3. Open http://localhost:3000

## Build for production
```bash
npm run build
npm start
```

## Customise
- School name and currency: `lib/config.js`
- Sample data: `lib/seed.js`
- Colours: the variables at the top of `app/globals.css`

## Next steps
Because data lives in the browser, it is not shared between computers.
To use it across a whole school, replace `lib/store.js` with calls to a
database (for example Prisma + PostgreSQL) through Next.js API routes.
