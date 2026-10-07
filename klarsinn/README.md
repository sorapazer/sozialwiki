# Klarsinn – Programm für mentale Gesundheit (12 Wochen, 6 Monate, 12 Monate)

Ein wissenschaftlich fundiertes, interaktives Selbsthilfeprogramm als Web-App. Reines HTML/CSS/JavaScript, ohne Server, Konto oder Tracking. Öffne `index.html` im Browser oder veröffentliche den Ordner über GitHub Pages.

## Programmvarianten

| Variante | Dauer | Rhythmus |
|---|---|---|
| Kompakt | 12 Wochen | 1 Woche pro Thema (Lernen) |
| Vertiefung | 6 Monate (26 Wochen) | 2 Wochen pro Thema (Lernen, Üben mit Vertiefungs-Lektion) + Rückblick- und Abschlusswoche |
| Begleitung | 12 Monate (52 Wochen) | 1 Monat pro Thema (Lernen, Üben, Vertiefen, Verankern) + 4 Integrationswochen |

Die Variante wird beim Start gewählt und kann unter „Programm“ jederzeit gewechselt werden.

## Preise und Freischaltung

| Variante | Preis | ≈ pro Woche |
|---|---|---|
| 12 Wochen (Kompakt) | 1.000 € einmalig | 83 € |
| 6 Monate (Vertiefung) | 6 × 150 € = 900 € | 35 € |
| 12 Monate (Begleitung) | 12 × 70 € = 840 € | 16 € |

Preise, Bezahl-Links und Gutscheine stehen oben in `js/shop.js` (`KS.SHOP`). Solange kein Bezahl-Link eingetragen ist, zeigt die Kaufseite einen Hinweis statt einer Zahlung. Gutscheine werden nur als Prüfsumme gespeichert; der Gutschein `JESUS` schaltet das Programm kostenlos frei.

Kostenlos ohne Zugang: Startseite mit interaktiven Beispielen, Programmübersicht, Lektionsbibliothek (Vorschau), Modul 1 inklusive Probelektion, Quellen, Hilfe.

**Wichtig:** Die Freischaltung läuft vollständig im Browser. Wer sich mit Entwicklerwerkzeugen auskennt, kann sie umgehen. Für einen echten Bezahlschutz braucht es einen Server mit Konten (z. B. ein Kursplattform-Anbieter oder Stripe + eigenes Backend). Vor dem Verkauf außerdem nötig: Impressum, AGB, Widerrufsbelehrung für digitale Inhalte, Datenschutzerklärung und eine Prüfung der Werbeaussagen (Heilmittelwerbegesetz).

## Inhalt

| Phase | Wochen |
|---|---|
| 1 Fundament | 1 Ankommen · 2 Stress verstehen · 3 Den Körper beruhigen |
| 2 Lebensstil | 4 Erholsamer Schlaf · 5 In Bewegung kommen · 6 Achtsamkeit & Aufmerksamkeit |
| 3 Gedanken & Gefühle | 7 Gedanken erkennen · 8 Grübeln & Sorgen lösen · 9 Gefühle verstehen |
| 4 Verbindung & Richtung | 10 Selbstmitgefühl · 11 Verbundenheit · 12 Werte & dein Weg |

Jede Woche enthält:

- **Interaktive Lektion** Karte für Karte (ca. 30 Karten) mit Fortschrittsbalken, Wissensfragen mit sofortigem Feedback, „Mythos oder Fakt?“ und Abschluss mit XP
- **Interaktive Grafik** (z. B. Yerkes-Dodson-Kurve, Zwei-Prozess-Modell des Schlafs, Atemfrequenz & HRV, Gefühlslandkarte, ABC-Modell, Sorgenbaum)
- 6 Wissenskapitel mit Evidenz-Boxen und Zitaten (APA 7), Kernaussagen, angeleitete Übung
- 7 Wochenaufgaben zum Abhaken, 4 Reflexionsfragen, 4 Quizfragen, Quellenliste

Dazu 22 Werkzeuge: täglicher Check-in mit Verlaufskurve, WHO-5-Wohlbefindens-Index (Start, Halbzeit, Ende), Wenn-dann-Planer, Stress-Landkarte, Atem-Taktgeber (Resonanzatmung, 4-6, zyklisches Seufzen, Box), 5-4-3-2-1-Erdung, PMR, Schlaftagebuch mit Schlafeffizienz, Aktivitätenplaner, Meditations-Timer, Gedankenprotokoll, Sorgen-Parkplatz, Defusion, Problemlöse-Assistent, Gefühls-Finder, expressives Schreiben, mitfühlender Brief, Beziehungskreise, Ich-Botschaften, Drei gute Dinge, Werte-Kompass, Kompass-Plan (Rückfallprophylaxe).

Zusätzlich 12 weitere Grafiken und Lernspiele (Gewohnheitskurve, Stress-Fass, Toleranzfenster, Nachtbalken, Dosis-Wirkung Bewegung, Atemzählen, Denkfallen-Detektiv, Grübeln oder Lösen, Gefühlswelle, Kritiker oder Freund, unterschätzte Gespräche, Lebensrad), Aktivitätskalender, Stimmung nach Wochentag und Nutzungsstatistik.

Motivation: XP, Level, Serie (aktive Tage in Folge), Wegkarte mit 12 Stationen, Konfetti bei Abschlüssen.

## Dateien

```
index.html            Seitengerüst
css/app.css           Gestaltung (hell/dunkel)
js/core.js            Speicher (localStorage), Zitate, Diagramme
js/refs.js            Quellenverzeichnis (123 Einträge, APA 7)
js/weeks-*.js         Inhalte der 12 Lernmodule (Schema: CONTENT_SCHEMA.md)
js/deep-*.js          Vertiefungspakete für 6/12 Monate (Schema: DEEP_SCHEMA.md)
js/program.js         Varianten, Praxiswochen, Zeitachse, Aktivitätskalender
js/explorables2.js    12 weitere interaktive Grafiken und Lernspiele
js/master-*.js        36 Masterclass-Lektionen (Schema: MASTER_SCHEMA.md)
js/models.js          interaktive Modell-Diagramme, Lektionsbibliothek
js/shop.js            Preise, Kauf, Gutscheine, Freischaltung
js/tools.js           22 interaktive Werkzeuge
js/explorables.js     12 interaktive Grafiken + Wochensymbole
js/lessons.js         Lektions-Player, XP, Serie, Konfetti
js/app.js             Seiten und Navigation
```

## Datenschutz

Alle Eingaben bleiben im `localStorage` des Browsers. Unter „Meine Daten“ lassen sich Sicherungen exportieren und wiederherstellen.

## Hinweis

Klarsinn ist ein Selbsthilfeprogramm und ersetzt keine Diagnostik oder Psychotherapie. Die Inhalte wurden sorgfältig auf Basis der angegebenen Literatur erstellt; einzelne Zahlenangaben sollten vor einer öffentlichen Nutzung fachlich gegengelesen werden.
