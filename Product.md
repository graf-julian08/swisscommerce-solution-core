# Swiss Commerce Core (Self-Hosted Edition)

## Zielsetzung: Bis im Juni 2026 minimum ein Kunde haben.

**Version:** 0.1.0-alpha
**Type:** Full-Stack E-Commerce Framework
**License:** Proprietary / Internal

## Über das Projekt
{Name} ist ein modulares, selbst gehostetes E-Commerce-Ökosystem, spezialisiert auf den Schweizer Markt.
Wir bauen keine Baukästen. Wir bauen unabhängige, hochperformante Infrastruktur für KMU, die volle Datenhoheit und maximale Automatisierung benötigen.

---

## System Architecture (The 10 Pillars)

Das System besteht aus 10 lose gekoppelten Modulen. Wir setzen auf "Best-of-Breed" Open-Source Technologien.

### 1. The Migrator (ETL Pipeline)
Ein CLI-Tool für den reibungslosen Import von Legacy-Daten.
* **Funktion:** Extrahiert Daten aus alten Systemen (Excel, Magento, alter WooCommerce), bereinigt Formate und lädt sie in die Core DB.
* **Tech:** Node.js Streams für grosse Datensätze, Mapping-Tabellen.

### 2. Core Database (Source of Truth)
Das zentrale Nervensystem. Strikte relationale Integrität.
* **Funktion:** Speicherung von Produkten, Varianten, Lagerbeständen und Kundenbeziehungen.
* **Tech:** PostgreSQL (ACID-compliant).

### 3. High-Performance Storefront (Frontend)
Das Gesicht zum Kunden. Headless-Architektur für Speed.
* **Funktion:** Core Web Vitals optimiert, SEO-First, Mobile-First Design.
* **Tech:** Next.js (React) oder Nuxt (Vue) mit Server-Side Rendering (SSR).

### 4. Admin Command Center
Die Steuerzentrale für den Shop-Betreiber.
* **Funktion:** Produkt-Management (CRUD), Bestellverwaltung, Customer Support Interface.
* **UX:** Einfach für Laien, mächtig für Power-User (Bulk-Edit Funktionen).

### 5. Advanced Analytics Dashboard
Datenhoheit statt Google Analytics.
* **Funktion:** Visualisierung von Umsatz, Conversion-Rate, Abbruchquoten und Top-Produkten.
* **Privacy:** Lokal gehostet, keine Third-Party-Cookies (nDSG-konform).

### 6. Swiss Invoice Engine
Automatisierte Rechnungsstellung nach Schweizer Standards.
* **Funktion:** Generiert PDF-Rechnungen im Moment der Bestellung.
* **Key Feature:** Automatische Generierung des **Schweizer QR-Einzahlungsscheins** (QR-Bill) direkt auf dem PDF.

### 7. Payment Hub
Sichere Zahlungsabwicklung.
* **Funktion:** Abstraktionsschicht zu Zahlungsanbietern.
* **Integrationen:** Native Anbindung von TWINT (via Provider) und Stripe (Kreditkarten). Webhook-Handler für Zahlungsstatus.

### 8. Notification Hub
Transaktionale E-Mails, die garantiert ankommen.
* **Funktion:** Event-basiertes Versenden (Bestellbestätigung, Versandstatus, Passwort Reset).
* **Tech:** HTML-Templates mit MJML. Anbindung via API (z.B. Resend/Postmark).

### 9. Legal Compliance Layer
Rechtssicherheit "out of the box".
* **Funktion:** Platzhalter-System für AGB, Impressum und Datenschutzerklärung.
* **Feature:** Dynamisches Einsetzen von Firmenname und Adresse in juristische Texte.

### 10. Secure Identity (User Management)
Authentifizierung und Autorisierung.
* **Funktion:** Sicherer Login für Kunden und Admins.
* **Security:** Hashing (Argon2/Bcrypt), Session-Management, 2FA-Support für Admins.

---

## Folder Structure

```bash
swiss-commerce-core/
├── apps/
│   ├── backend/             # MEDUSA.JS SERVER
│   │                        # Beinhaltet: API, Datenbank-Logik, Admin Panel, Analytics
│   │                        # Deckt ab: Pillar 2, 3, 4, 7, 8, 10
│   │
│   └── web/                 # NEXT.JS STOREFRONT
│                            # Beinhaltet: Design, SEO, Checkout-Frontend
│                            # Deckt ab: Pillar 5, 9
│
├── packages/
│   ├── swiss-plugins/       # Deine "Secret Sauce" für Medusa
|   |                        # Mail-System
│   │                        # Hier kommt der QR-Code Generator & Twint Logik rein
│   │                        # Deckt ab: Pillar 6 (Invoice), 7 (Payment Adapter)
│   │
│   └── legacy-migrator/     # Dein Import-Skript
│                            # Deckt ab: Pillar 1
│
└── package.json             # Root Config (Turborepo)
│
└── docker-compose.yml       # Zum lokalen Starten von allem.


