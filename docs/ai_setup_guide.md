# Schritt-für-Schritt-Anleitung: Real-Life Decision Platform mit Claude & ChatGPT nutzen

Diese Anleitung zeigt dir exakt, wie du das GitHub-Repository **[Paulus78/Real-Life-Decision-Platform](https://github.com/Paulus78/Real-Life-Decision-Platform)** als zentrales Projekt in **Claude** und **ChatGPT** einbindest und beiden Assistenten ermöglichst, auf den Code zuzugreifen und Änderungen hochzuladen.

---

## Teil 1: Projekt in Claude einrichten

Claude unterstützt GitHub nativ über zwei Wege: **Claude Projects (Web)** für Wissens- und Code-Kontext und **Claude Code (CLI)** für direkte Schreib- und Push-Zugriffe.

### Weg A: Claude.ai (Web-Projekt)
1. Gehe auf [claude.ai](https://claude.ai) und logge dich ein (Pro/Team-Account).
2. Klicke in der linken Seitenleiste auf **Projects** und dann auf **New Project** (oder "Create Project").
3. Name des Projekts: `Real-Life-Decision-Platform`.
4. Klicke im Projekt unter **Project Knowledge** auf das Plus-Symbol (**+ Add Content**) und wähle **GitHub**.
5. Wähle dein Repository `Paulus78/Real-Life-Decision-Platform` aus.
   *(Falls du GitHub noch nicht autorisiert hast, wirst du einmalig durch den GitHub-OAuth-Dialog geführt).*
6. Claude liest nun automatisch alle Dateien (insbesondere [`CLAUDE.md`](../CLAUDE.md)) ein.
7. Kopiere den Inhalt von [`CLAUDE.md`](../CLAUDE.md) optional zusätzlich in das Feld **Set Project Instructions** im Claude-Projekt.

> [!NOTE]
> Der Web-Connector von Claude ist aus Sicherheitsgründen standardmäßig **read-only** (Lesezugriff). Um Änderungen direkt ins Repository zu schreiben, nutze Weg B oder C.

### Weg B: Claude Code (CLI mit Schreib- & Push-Zugriff im Terminal)
Anthropic bietet das offizielle Terminal-Tool **Claude Code**:
1. Öffne das Terminal auf deinem Mac.
2. Wechsle in den Projektordner:
   ```bash
   cd /Users/Paul/.gemini/antigravity/scratch/Real-Life-Decision-Platform
   ```
3. Starte Claude Code (falls installiert):
   ```bash
   claude
   ```
   *(Falls noch nicht installiert: `npm install -g @anthropic-ai/claude-code`).*
4. Claude Code liest sofort `CLAUDE.md`, kann Dateien direkt bearbeiten, Tests ausführen und mit `git commit` & `git push` Änderungen live zu GitHub hochladen.

### Weg C: Claude GitHub Action (`@claude` in GitHub)
Wir haben im Repository die Konfiguration [`.github/workflows/claude.yml`](../.github/workflows/claude.yml) hinterlegt.
* Sobald du dein `ANTHROPIC_API_KEY` in den GitHub-Repository-Secrets hinterlegst, kannst du in einem GitHub-Issue oder Pull Request einfach `@claude Erstelle die Funktion für AHP-Berechnung` schreiben, und Claude pusht automatisch einen Commit oder öffnet einen Pull Request!

---

## Teil 2: Projekt in ChatGPT einrichten

### Weg A: ChatGPT Projects & Connected Apps (Web)
1. Öffne [chatgpt.com](https://chatgpt.com) und gehe links unten auf dein Profil -> **Settings** (Einstellungen).
2. Klicke auf **Connected Apps** (Verbundene Apps) oder **Data Sources**.
3. Suche nach **GitHub** und klicke auf **Connect** (Verbinden). Wähle das Repository `Paulus78/Real-Life-Decision-Platform`.
4. Erstelle ein neues Projekt:
   - Klicke links auf **Projects** -> **New Project** -> `Real-Life-Decision-Platform`.
   - Öffne die **Project Instructions** (Projekt-Anweisungen) und füge den Inhalt der Datei [`CHATGPT.md`](../CHATGPT.md) ein.

### Weg B: ChatGPT Custom GPT mit Schreibzugriff (Commits direkt per Chat pushen!)
Wenn du möchtest, dass ChatGPT direkt aus dem Browser-Chat Änderungen als Commits in dein GitHub-Repository hochlädt, kannst du einen Custom GPT mit GitHub-Action anlegen:
1. Gehe in ChatGPT auf **Explore GPTs** -> **Create** (Neuen GPT erstellen) -> Reiter **Configure**.
2. **Name:** `Decision Platform DevBot`
3. **Instructions:** Kopiere den Inhalt von [`CHATGPT.md`](../CHATGPT.md).
4. Klicke unten auf **Create new action** (Neue Aktion).
5. Klicke auf **Import from URL** oder füge den Inhalt der Datei [`docs/chatgpt_github_openapi.yaml`](./chatgpt_github_openapi.yaml) in das Schema-Feld ein.
6. **Authentication:**
   - Typ: `API Key`
   - Auth Type: `Custom`
   - Custom Header Name: `Authorization`
   - Token: `Bearer ghp_deinGitHubPersonalAccessToken` *(Erstelle ein Fine-grained Personal Access Token auf GitHub mit Schreibrechten für `Paulus78/Real-Life-Decision-Platform`).*
7. Fertig! Jetzt kann dieser Custom GPT Dateien direkt über die GitHub-API anlegen, aktualisieren und Commits pushen!

### Weg C: ChatGPT Desktop / Codex Work Mode
In der ChatGPT Desktop App für Mac kann ChatGPT über die integrierte Entwickler- / Codex-Umgebung direkt auf lokale Ordner zugreifen, Code generieren, Branches erstellen und Pull Requests einreichen.

---

## Teil 3: Lokaler Projektordner auf deinem Mac & Schneller Sync

Dein lokaler Projektordner liegt unter:
```text
/Users/Paul/.gemini/antigravity/scratch/Real-Life-Decision-Platform
```

### Der 1-Klick-Sync-Befehl (`scripts/sync.sh`)
Wenn du oder eine der KIs Dateien im Ordner geändert hat, musst du dir keine komplizierten Git-Befehle merken. Führe im Projektordner einfach aus:

```bash
./scripts/sync.sh "feat: neue Entscheidungsmatrix hinzugefügt"
```

Das Skript:
1. Zieht vorab eventuelle Änderungen von GitHub (`git pull --rebase`).
2. Erkennt alle neuen oder modifizierten Dateien.
3. Committet die Änderungen sauber mit deiner Nachricht.
4. Pusht alles automatisch auf den `main`-Branch bei GitHub.

---

## Zusammenfassung des Workflows

```text
       ┌────────────────────────┐      ┌────────────────────────┐
       │     Claude Projects    │      │    ChatGPT Projects    │
       │   (liest CLAUDE.md)    │      │   (liest CHATGPT.md)   │
       └───────────┬────────────┘      └───────────┬────────────┘
                   │                               │
                   │ (Lesezugriff & Kontext)       │ (Lesezugriff & Kontext)
                   ▼                               ▼
       ┌────────────────────────────────────────────────────────┐
       │   GitHub: Paulus78/Real-Life-Decision-Platform         │
       │   - DECISION_LOG.md (Gemeinsames Protokoll)           │
       │   - PROJECT_STATUS.md (Aufgaben & Meilensteine)        │
       └───────────────────────────▲────────────────────────────┘
                                   │
                ┌──────────────────┴──────────────────┐
                │                                     │
    [Schreib-Möglichkeit 1]               [Schreib-Möglichkeit 2]
    Claude Code CLI                       ChatGPT Custom GPT
    (im Mac Terminal)                     (über OpenAPI REST-Action)
                │                                     │
                └──────────────────┬──────────────────┘
                                   │
                          [Schreib-Möglichkeit 3]
                          Lokaler Projektordner &
                          ./scripts/sync.sh
```
