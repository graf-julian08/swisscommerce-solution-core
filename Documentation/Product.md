# Swiss Commerce Core (Self-Hosted Edition)

## Zielsetzung: Bis im Juni 2026 minimum ein Kunde haben.

## Grundidee: Das ganze Prinzip von E-Commerce im schweizerischen Markt soll so einfach dargestellt werden, dass alle Bäcker, Handwerker und kleine Geschäfte sich mit einem Klick auf "Shop erstellen" einen eigenen Shop erstellen können.

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


# Security & Verification Plan

Da wir selbst hosten, tragen wir die Verantwortung. Unser Sicherheits-Protokoll:

* **Dependency Audit:** Wöchentlicher automatischer Scan aller NPM-Pakete (via Snyk oder npm audit).
* **No Custom Crypto:** Wir nutzen ausschliesslich etablierte Auth-Bibliotheken (z.B. Lucia Auth). Keine eigenen Verschlüsselungs-Experimente.
* **4-Augen-Prinzip:** Kein Code geht live ohne Review.
* **Penetration Testing:** Vor Live-Gang grosser Projekte wird ein externer White-Hat-Hacker/Security-Experte beauftragt, das System zu testen (SQLi, XSS).
* **Backups:** Tägliche, verschlüsselte Off-Site Backups der Datenbank.

---

# Pricing Strategie

Wir setzen auf ein transparentes Stufenmodell, das mit dem Kunden wächst.

### 1. Free / Test (Developer Edition)
Ideal für Entwicklung, Tests und erste Gehversuche.

* **Preis:** $0 / Monat (Free)
* **Features:** Voller Zugriff auf den Core, Self-Hosted, Community Support.
* **Limitierung:** Keine automatisierten Updates, kein dedizierter Support.

### 2. Pro
Für kleine Shops und Startups.

* **Preis:** $20 / Monat
* **Features:** Inklusive Security-Updates, Standard-Plugins (QR-Bill), Email-Support.
* **Zielgruppe:** Solopreneure & kleine KMU.

### 3. Plus
Für wachsende Businesses mit höheren Anforderungen.

* **Preis:** $50 / Monat
* **Features:** Priorisierter Support, erweiterte Analytics, Multi-User Zugriff, Advanced Marketing Tools.
* **Zielgruppe:** Etablierte Händler.

### 4. Enterprise
Für Grosskunden mit speziellen Anforderungen.

* **Preis:** Auf Anfrage (Custom Quote)
* **Features:** White-Glove Onboarding, Custom Development, SLA (Service Level Agreements), dedizierter Account Manager.
* **Prozess:** Persönliches Kundengespräch zur Bedarfsanalyse notwendig.

---

# Projekt-Backlog: Features & Anforderungen

Das sind die Features, die wir noch einbauen müssen, um den Schweizer Markt vollständig abzudecken.

### Finanzen, Steuern & Buchhaltung
Strukturierte Abwicklung aller monetären Prozesse.

- [ ] **Steuerlogik:** Mehrwertsteuer (MwSt) korrekt hinterlegen
- [ ] **Rechnungsstellung:** Fortlaufende Rechnungsnummern gewährleisten
- [ ] **Compliance:** Korrekter MwSt-Ausweis auf allen Belegen
- [ ] **Buchhaltung:** Export-Schnittstelle einrichten
- [ ] **Mahnwesen:** Automatische Erinnerungen bei Zahlungsverzug

### Logistik & Versand
Optimierung der Lieferprozesse.

- [ ] **Versandkonfiguration:** Versandzonen definieren & Preislogik hinterlegen

### Marketing & Umsatzsteigerung
Massnahmen zur Erhöhung des Warenkorbwerts und der Conversion.

- [ ] **E-Mail Marketing:** Abandoned-Cart-Flows (Warenkorb-Abbrecher) aufsetzen
- [ ] **Promotionen:** Gutscheine & komplexe Rabattregeln erstellen
- [ ] **Warenkorb-Optimierung:** Upselling & Cross-Selling Strategien
- [ ] **Angebote:** Produkt-Bundles & Mengenrabatte einpflegen

### Technologie & Support
Automatisierung und Kundenkommunikation.

- [ ] **KI-Integration:** Telefon-KI für Support/Anfragen implementieren