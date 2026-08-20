# Swisscommerce Solution Core Platform

## Übersicht
Das Projekt **swisscommerce-solution-core** ist eine Fullstack-Plattform zur Abwicklung von E-Commerce-Lösungen auf Basis von Next.js, Prisma, Medusa und Docker Compose.

## Projektstruktur & Architektur
- `src/`: Next.js Anwendungslogik, Komponenten und API-Routen.
- `Medusa_Shop/`: Integration des Medusa E-Commerce Headless-Backends.
- `prisma/`: Datenbank-Schema und Migrationen für Prisma ORM.
- `docker-compose.yml`: Bereitstellungskonfiguration für Datenbank und Dienste.
- `UI-Miner/`: Werkzeuge zur automatisierten Benutzeroberflächen-Analyse.
- `Documentation/`: Technische Architekturdokumentation.

## Hauptfunktionalitäten
- **Headless Commerce Integration**: Kombination von Next.js Frontend mit Medusa Backend.
- **Prisma ORM**: Typensichere Datenbankabfragen und Schema-Verwaltung.
- **Container-Bereitstellung**: Reproduzierbare Laufzeitumgebung mittels Docker Compose.

## Ausführung & Nutzung
Die Container-Dienste werden mit `docker-compose up -d` gestartet. Der Anwendungsserver wird über `npm run dev` ausgeführt.

## Lizenz
Dieses Projekt steht unter der MIT-Lizenz.
