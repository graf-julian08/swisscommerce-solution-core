# Technische Details & Dokumentation

## Übersicht
Dieses Dokument enthält wichtige technische Details zum "SwissCommerce Solution Core" Projekt. Das Projekt besteht aus einer SaaS-Core-Anwendung (Next.js) zur Generierung und Verwaltung von Shops und einem E-Commerce-Backend (Medusa.js).

## Tech Stack

### 1. SaaS Core (Root)
Die Hauptanwendung für das Dashboard und den Shop-Generator.
*   **Framework**: Next.js 16.0.8 (App Router)
*   **Sprache**: TypeScript / React 19.2.1
*   **Styling**: Tailwind CSS 3.4 (`design-system` Ordner vorhanden)
*   **Datenbank (SaaS)**: Prisma ORM (v6.19.1).
    *   *Hinweis*: `schema.prisma` ist aktuell auf `provider = "mysql"` konfiguriert (mit Kommentar verweisend auf Neon PostgreSQL).
*   **AI Integration**: Google Generative AI (`@google/generative-ai`) für die Generierung von Shop-Konfigurationen.
*   **State Management**: Zustand (impliziert durch `stores` Ordner) oder Context.

### 2. Medusa Shop Backend (`Medusa_Shop/backend`)
Das Backend für die E-Commerce-Funktionalität.
*   **Platform**: MedusaJS v2.12.2
*   **Sprache**: TypeScript / Node.js
*   **Datenbank**: PostgreSQL 15 (via Docker)
*   **Caching/Events**: Redis 7 (via Docker)
*   **Modules**:
    *   `@medusajs/payment-stripe`
    *   `nodemailer`, `resend` (Email)

## Infrastruktur & Setup
*   **Docker Reference**: `docker-compose.yml` im Root startet die Services für Medusa (PostgreSQL & Redis).
*   **Ports (Default)**:
    *   Next.js App: `http://localhost:3000`
    *   Medusa Backend: `http://localhost:9000`
    *   PostgreSQL: `5432`
    *   Redis: `6379`

## API Endpoints

### 1. SaaS Core APIs (Next.js)
Lokalisierung: `/src/app/api`
Diese APIs dienen primär der Generierung von Inhalten durch AI und der Shop-Verwaltung.

*   `/api/generate` - Allgemeine Generierung
*   `/api/generate-blueprint` - Erstellung von Shop-Blueprints
*   `/api/generate-code` - Code-Generierung
*   `/api/generate-master-prompt` - Prompt Engineering Helper
*   `/api/generate-shop` - Shop Erstellung
*   `/api/shops` - CRUD Operationen für Shops

### 2. Medusa Backend APIs
Lokalisierung: `/Medusa_Shop/backend/src/api`
Zusätzlich zu den [Standard Medusa Admin & Store APIs](https://docs.medusajs.com/api/store) wurden folgende Custom-Routes implementiert:

**Admin (`/admin`)**:
*   `/admin/custom` (GET) - Health Check / Custom Admin Endpoint

**Store (`/store`)**:
*   `/store/custom` (GET) - Health Check / Custom Store Endpoint
*   `/store/auth/login` - Benutzer Login
*   `/store/auth/register` - Registrierung
*   `/store/auth/verify` - Verifizierung
*   `/store/auth/resend` - Erneutes Senden von Verifizierungs-Emails

## Wichtige Pfade
*   **Datenbank Schema (SaaS)**: `/prisma/schema.prisma`
*   **Custom API Routes (Medusa)**: `/Medusa_Shop/backend/src/api`
*   **Environment Variables**: `.env` (Root) - Enthält Keys für Datenbanken, AI Provider und App Secrets.

## Links zur Dokumentation
*   [Medusa Documentation](https://docs.medusajs.com/)
*   [Next.js Documentation](https://nextjs.org/docs)
*   [Prisma Documentation](https://www.prisma.io/docs)
*   [Tailwind CSS](https://tailwindcss.com/docs)
