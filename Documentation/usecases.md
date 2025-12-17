# Use Case Spezifikation: Admin-First Approach

**Fokus:** Steuerung aller Prozesse zentral über das Admin-Panel (GUI)
**Zielgruppe:** Nicht-technische Händler (Bäcker, Handwerker)
**MVP-Ziel:** Juni 2026

---

## 1. Setup & Migration (Data Management)

### UC-01: Visueller Import-Assistent (Wizard)
**Ziel:** Datenübernahme per Drag & Drop statt Kommandozeile.

* **Akteur:** Admin (Bäcker Müller)
* **UI-Ort:** Admin Panel > Einstellungen > Daten & Import
* **Ablauf:**
    1.  Admin klickt auf "Import starten".
    2.  Admin zieht seine Excel-Liste (`produkte_alt.xlsx`) in das Upload-Feld.
    3.  Das Admin-Panel zeigt eine Vorschau der Daten an.
    4.  Admin weist per Dropdown die Spalten zu (z.B. Excel-Spalte "Kosten" -> System-Feld "Preis").
    5.  Admin klickt "Import ausführen" und sieht einen Ladebalken.
* **Ergebnis:** Meldung "500 Produkte erfolgreich importiert". Produkte erscheinen sofort in der Produktübersicht.

---

## 2. Order Management (Bestellungs-Cockpit)

### UC-02: Bestellübersicht & Zahlungsstatus prüfen
**Ziel:** Sofortige Übersicht über neue Bestellungen und deren Zahlungsstatus (TWINT/Kreditkarte).

* **Akteur:** Admin
* **UI-Ort:** Admin Panel > Bestellungen (Order Stream)
* **Ablauf:**
    1.  Admin öffnet die Übersicht und sieht eine neue Bestellung (markiert als "Neu").
    2.  Admin sieht den Status-Badge: `Bezahlt mit TWINT` (grün).
    3.  Admin öffnet die Detailansicht, um zu sehen, was bestellt wurde.
    4.  Mit einem Klick auf "Versand vorbereiten" ändert der Admin den Status auf `In Bearbeitung`.
* **Ergebnis:** Der Kunde erhält automatisch eine E-Mail über die Statusänderung, ohne dass der Admin eine Mail schreiben muss.

---

## 3. Finanzen & Dokumente (Invoice Hub)

### UC-03: Rechnungs-Konfiguration & Download
**Ziel:** Kontrolle über das Rechnungs-Layout und manueller Zugriff auf Belege.

* **Akteur:** Admin
* **UI-Ort:** Admin Panel > Finanzen > Rechnungen
* **Ablauf:**
    1.  **Konfiguration (Einmalig):** Admin aktiviert den Schalter "QR-Rechnung automatisch generieren". Admin hinterlegt seine IBAN im Feld "Bankverbindung".
    2.  **Operativ:** Admin öffnet eine spezifische Bestellung.
    3.  Admin klickt auf den Button "Rechnung herunterladen".
    4.  Das System generiert das PDF mit dem QR-Code live zur Ansicht.
* **Ergebnis:** Der Händler hat jederzeit Zugriff auf alle steuerrelevanten Belege direkt im Browser.

---

## 4. Produkt-Management (Inventory Control)

### UC-04: Massenbearbeitung (Bulk Edit GUI)
**Ziel:** Preise anpassen wie in einer Excel-Tabelle, aber direkt im Browser.

* **Akteur:** Admin
* **UI-Ort:** Admin Panel > Produkte > Alle Produkte
* **Ablauf:**
    1.  Admin wählt in der Liste über die Checkboxen mehrere Produkte aus (z.B. alle "Torten").
    2.  Ein Aktions-Balken erscheint am unteren Bildschirmrand.
    3.  Admin klickt auf "Preise bearbeiten".
    4.  Ein Popup öffnet sich: "Preis ändern um..." -> Admin tippt `+ 5%` oder `+ 2.00 CHF` ein.
    5.  Admin klickt "Anwenden".
* **Ergebnis:** Die Datenbank aktualisiert die Preise und das Frontend zeigt sofort die neuen Werte an.

---

## 5. Marketing Automation (Campaign Manager)

### UC-05: Aktivierung des "Warenkorb-Retters"
**Ziel:** Umsatzsteigerung per "Knopfdruck" aktivieren, ohne Code zu schreiben.

* **Akteur:** Admin
* **UI-Ort:** Admin Panel > Marketing > Automatisierungen
* **Ablauf:**
    1.  Admin sieht eine Karte "Warenkorb-Abbrecher zurückholen".
    2.  Admin sieht einen grossen Schalter (Toggle): "Aktivieren".
    3.  Admin klickt auf "Bearbeiten", um den Text der E-Mail anzupassen (z.B. "Hoi, dein Brot wartet noch!").
    4.  Admin speichert und schaltet auf "Aktiv".
* **Ergebnis:** Das System überwacht ab jetzt im Hintergrund alle Warenkörbe und sendet die Mails automatisch gemäss der Konfiguration.

---

## 6. Recht & Compliance (Settings Center)

### UC-06: Stammdaten & Rechtstexte pflegen
**Ziel:** Zentrale Verwaltung der Firmenidentität für alle rechtlichen Dokumente.

* **Akteur:** Admin
* **UI-Ort:** Admin Panel > Einstellungen > Firma & Recht
* **Ablauf:**
    1.  Admin füllt das Formular "Firmendaten" aus (Name, Adresse, UID, MwSt-Nr.).
    2.  Admin sieht eine Vorschau der AGBs: "Diese Daten werden automatisch in deine AGB und das Impressum eingefügt."
    3.  Admin setzt den Haken bei "Rechtstexte auf der Website anzeigen".
    4.  Admin speichert.
* **Ergebnis:** Fusszeile im Shop, Rechnungen und E-Mail-Signaturen werden systemweit mit den korrekten Daten aktualisiert.