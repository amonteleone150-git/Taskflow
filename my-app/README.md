# Taskflow

Taskflow è una piccola app di gestione attività personali costruita con Next.js 16, React 19 e Tailwind CSS v4. Supporta autenticazione con Better Auth, salvataggio locale isolato per utente e protezione delle route riservate.

## Stack tecnologico

- **Next.js 16** (App Router, Turbopack, `cacheComponents: true`)
- **React 19**
- **Prisma 7** + `@prisma/adapter-pg` con **Neon** (PostgreSQL)
- **Better Auth 1.7** con `@better-auth/prisma-adapter`
- **Tailwind CSS v4** (design system coerente in `DESIGN.md`)
- **FullCalendar** per il calendario
- **localStorage** per attività ed eventi (isolati per utente, senza persistenza DB)

## Struttura dei componenti

```
src/components/
├── ui/                 # Primitive riutilizzabili (senza logica di dominio)
│   ├── button.tsx      # Bottone con varianti: primary, secondary, outline, ghost, danger
│   ├── icon-button.tsx # Piccolo bottone per icone
│   ├── card.tsx        # Superficie card di base
│   ├── badge.tsx       # Badge
│   ├── text-field.tsx  # Input/textarea con label, errore e helper
│   └── icons.tsx       # Icone SVG condivise
├── layout/             # Componenti di layout condivisi
│   ├── site-header.tsx
│   ├── site-logo.tsx
│   ├── header-nav-link.tsx
│   ├── theme-toggle.tsx
│   └── calendar-toolbar-icons.tsx
├── home/               # Pagine home (hero, features, CTA)
├── auth/               # Login, registrazione, validazione auth
├── tasks/              # Gestione attività
├── calendar/           # Calendario e modale eventi
└── dashboard/          # Dashboard personale protetta
```

## Route

| Route | Tipo | Descrizione |
|---|---|---|
| `/` | Statico | Home pubblica |
| `/about` | Statico | Info sul progetto |
| `/login` | Dinamico | Login (Better Auth) |
| `/register` | Dinamico | Registrazione (Better Auth) |
| `/dashboard` | Dinamico | Dashboard personale protetta |
| `/tasks` | Dinamico | Attività (richiede autenticazione) |
| `/calendar` | Dinamico | Calendario (richiede autenticazione) |
| `/api/auth/[...all]` | API | Endpoint Better Auth |

Le route `/dashboard`, `/tasks` e `/calendar` rispondono con un `307` verso `/login` quando l'utente non è autenticato.

## Autenticazione

L'autenticazione è gestita da **Better Auth** con adapter Prisma su Neon. La sessione viene verificata lato server con `requireUser()` nelle pagine protette. Dopo login/logout si usa `window.location.assign(...)` per evitare stato stale del router client.

## Isolamento dati

Attività ed eventi restano nel `localStorage` del browser, isolati per utente tramite chiavi namespace-ate:

- `taskflow.tasks.v1.<userId>`
- `taskflow.calendar.v1.<userId>`

Non c'è persistenza DB di task ed eventi, né migrazioni o modifiche allo schema Prisma per l'isolamento dati.

## Script disponibili

```bash
npm run dev     # Avvia il server di sviluppo (Turbopack)
npm run build   # Build di produzione
npm run start   # Avvia il server di produzione
```

## Prisma

Il client Prisma generato si trova in `src/generated/prisma` (in `.gitignore`). In deploy/CI serve rigenerarlo:

```bash
npx prisma generate --config prisma7.config.ts
```

## Design

L'interfaccia segue le specifiche di `DESIGN.md` (colori, font, spaziature, componenti e stili). Le primitive riutilizzabili vivono in `src/components/ui/` per evitare duplicazioni di stile tra le varie sezioni dell'app.

## Deploy

Il deploy più semplice è su [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), che supporta nativamente Next.js.

## Note

- `.env` contiene `DATABASE_URL` e `BETTER_AUTH_SECRET`; non committarlo né condividerlo.
- Il file `AGENTS.md` viene gestito automaticamente da `next dev`; includerlo nei commit mantiene il repository pulito.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Better Auth Documentation](https://www.better-auth.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
