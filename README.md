# Real-Life Decision Platform 🎯

> Ein systematisches, transparentes Framework für komplexe Entscheidungen im echten Leben – gemeinsam entwickelt mit **Claude** und **ChatGPT**.

[![CI & Validation](https://github.com/Paulus78/Real-Life-Decision-Platform/actions/workflows/validate.yml/badge.svg)](https://github.com/Paulus78/Real-Life-Decision-Platform/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 💡 Über das Projekt
Die **Real-Life Decision Platform** unterstützt Menschen, Teams und Organisationen dabei, schwierige Entscheidungen rational, nachvollziehbar und frei von kognitiven Verzerrungen zu treffen (z. B. Jobangebote, Immobilienkäufe, Tech-Stack-Entscheidungen, Investitionen).

### Kernfunktionen
- **Multi-Criteria Decision Analysis (MCDA):**
  - **Weighted Sum Model (WSM):** Flexible Gewichtung von Kriterien mit automatischer Normalisierung.
  - **Analytic Hierarchy Process (AHP):** Paarweise Vergleiche mit Konsistenzprüfung (Consistency Ratio).
  - **TOPSIS:** Ermittlung der geringsten Distanz zur idealen Lösung.
- **Sensitivitätsanalyse:** Wie stark muss sich ein Kriterium ändern, damit Platz 2 an Platz 1 vorbeizieht?
- **Auditierbares Entscheidungsprotokoll:** Lückenlose Begründung und Dokumentation von Kompromissen.

---

## 🤖 Co-Entwicklung mit Claude & ChatGPT

Dieses Repository dient als **zentraler, geteilter Projektordner** für Claude und ChatGPT. Beide KIs arbeiten synchron und ohne Konflikte im selben Codebase.

| Ressource | Zweck |
| :--- | :--- |
| 📘 [**docs/ai_setup_guide.md**](./docs/ai_setup_guide.md) | **Schritt-für-Schritt-Anleitung** zur Anbindung von Claude & ChatGPT |
| 🟣 [**CLAUDE.md**](./CLAUDE.md) | Kontext & Regeln für Claude Projects & Claude Code |
| 🟢 [**CHATGPT.md**](./CHATGPT.md) | Kontext & Custom Instructions für ChatGPT Projects & Custom GPT |
| 📋 [**DECISION_LOG.md**](./DECISION_LOG.md) | Geteiltes Gedächtnis beider KIs für Architekturentscheidungen |
| 📊 [**PROJECT_STATUS.md**](./PROJECT_STATUS.md) | Aufgabenliste, Meilensteine & wer woran arbeitet |
| 🔄 [**scripts/sync.sh**](./scripts/sync.sh) | 1-Klick-Sync-Skript für Commits & Pushes zu GitHub |

---

## 🚀 Schnellstart

### 1. Repository klonen / öffnen
```bash
cd /Users/Paul/.gemini/antigravity/scratch/Real-Life-Decision-Platform
```

### 2. Projekt in Claude & ChatGPT einbinden
Folge der Kurzanleitung in [`docs/ai_setup_guide.md`](./docs/ai_setup_guide.md):
- **In Claude.ai:** Projekt erstellen -> GitHub verbinden -> `Paulus78/Real-Life-Decision-Platform` wählen.
- **In ChatGPT:** Projekt erstellen -> GitHub unter Connected Apps verbinden -> `CHATGPT.md` als Instruktion hinterlegen.

### 3. Änderungen synchronisieren
Wenn Änderungen vorgenommen wurden:
```bash
./scripts/sync.sh "feat: neues Entscheidungsmodell implementiert"
```

---

## 📁 Repository-Struktur
```text
Real-Life-Decision-Platform/
├── CLAUDE.md                     # Projektwissen für Claude
├── CHATGPT.md                    # Projektwissen für ChatGPT
├── DECISION_LOG.md               # Geteilte Architektur-Entscheidungen (ADRs)
├── PROJECT_STATUS.md             # Aufgaben- und Status-Tracker
├── README.md                     # Hauptdokumentation
├── docs/
│   ├── ai_setup_guide.md         # Anleitung für Claude & ChatGPT Integration
│   ├── architecture.md           # Mathematische Modelle & Systemdesign
│   └── chatgpt_github_openapi.yaml # OpenAPI-Schema für ChatGPT Custom GPT Action
├── scripts/
│   └── sync.sh                   # Git-Sync-Helfer
├── src/
│   ├── index.ts                  # Hauptexport
│   ├── types.ts                  # Datentypen für Kriterien, Optionen, Matrizen
│   └── core/
│       └── wsm.ts                # Weighted Sum Model Berechnungskern
└── tests/
    └── example_decision.ts       # Beispiel-Entscheidung & Testfall
```

---

## 📄 Lizenz
MIT License © 2026 Paulus78
