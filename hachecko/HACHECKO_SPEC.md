# 🏛️ Hachecko: AI-Legalization OS & Agent Skill Specification

> **Version:** 1.0.0-draft  
> **Status:** Production Blueprint & Roadmap  
> **Target Audience:** IT Expats, B2B/JDG Entrepreneurs, Immigration Attorneys, AI Agent Builders

---

## 🎯 1. Product Vision & Core Value Proposition

**Hachecko** is a local-first, privacy-guaranteed Agentic Operating System designed to automate, audit, and organize document dossiers for Polish Residence Permits (**Karta Pobytu / Pobyt Czasowy**) for entrepreneurs (JDG) and their families.

### 🔑 Core Pillars:
1. **Zero Privacy Leak (Local-First):** All sensitive personal data (PESEL, NIP, passport scans, financial turnover) remain strictly on the user's machine. The UI communicates with the file system via the modern W3C File System Access API.
2. **Forensic Reconciliation:** Cross-matching financial and tax records down to 0.00 PLN/EUR ($\text{Invoices} \leftrightarrow \text{Bank Statements} \leftrightarrow \text{Revenue Ledgers} \leftrightarrow \text{PIT-28} \leftrightarrow \text{ZUS Declarations}$).
3. **Turnkey Folder Canvas:** A battle-tested file tree architecture that mirrors Polish Voivodeship Office (Urząd Wojewódzki) dossier inspection protocols.
4. **Intelligent Lifecycle Management:** Automated tracking of 30-day clearance certificates (ZAS-W, ZUS RWN), multi-channel split payments (CA, ZEN, Payoneer, PayPal), and print queue dispatching.

---

## 🗂️ 2. Canonical Workspace Architecture ("The Golden Tree")

```
<workspace_root>/
├── index.html                           # Zero-dependency local web dashboard
├── hachecko.md                          # Standard English example template
├── HACHECKO_SPEC.md                     # Product & Skill Specification
│
├── <applicant_primary>/                 # Primary applicant dossier (e.g. Mikhail - JDG)
│   ├── hachecko.md                      # Primary applicant live checklist
│   ├── Faktury/                         # Individual per-invoice packages
│   │   ├── faktura-vat-01-MM-YYYY/      # Dedicated invoice folder
│   │   │   ├── faktura-vat-01-MM-YYYY.pdf
│   │   │   └── transaction-DD-MM-YYYY-statement.pdf
│   │   └── ... (27+ packages)
│   ├── ZUS_DRA/                         # 24 files: 12 monthly declarations + 12 UPO receipts
│   ├── CEIDG_dane_niejawne_YYYY-MM-DD.pdf
│   ├── Zaswiadczenie_niezaleganie_ZAS-W_YYYY-MM-DD.pdf
│   ├── Zaswiadczenie_niezaleganie_ZUS_RWN_YYYY-MM-DD.pdf
│   ├── ZUS_zaswiadczenie_ubezpieczenie_YYYY-MM-DD.pdf
│   ├── ZUS_ZUA_YYYY-MM-DD.pdf + UPO
│   ├── PIT-28_rok_YYYY.pdf + PIT_O_rok_YYYY.pdf + UPO
│   ├── Ewidencja_przychodow_YYYY_m01-12.pdf
│   ├── Ewidencja_przychodow_YYYY_m01-XX.pdf
│   ├── Contract_B2B_Client_EN.pdf + tlumaczenie_przysiegle.pdf
│   └── Umowa_najmu_lokalu_YYYY-MM-DD.pdf
│
├── <family_member_spouse>/              # Spouse dossier (e.g. Marharyta)
│   ├── hachecko.md                      # Spouse live checklist
│   └── (Sponsor copies: CEIDG, ZAS-W, RWN, PIT+UPO, Umowa najmu, ZUS ubezpieczenie)
│
├── <family_member_child_school>/        # Minor child dossier - School (e.g. Ekaterina)
│   ├── hachecko.md                      # School student checklist
│   ├── zaswiadczenie_szkola_YYYY-MM-DD.pdf
│   └── (Father copies: CEIDG, ZAS-W, RWN, PIT+UPO, Umowa najmu, ZUS ubezpieczenie)
│
├── <family_member_child_kindergarten>/  # Minor child dossier - Kindergarten (e.g. Maryna)
│   ├── hachecko.md                      # Preschool child checklist
│   ├── zaswiadczenie_przedszkole_YYYY-MM-DD.pdf
│   └── (Father copies: CEIDG, ZAS-W, RWN, PIT+UPO, Umowa najmu, ZUS ubezpieczenie)
│
├── todo/                                # External items queue (waiting on authorities/accountants)
│   └── hachecko.md                      # Single source of truth for pending downloads
│
├── print/                               # Physical collation & print matrix
│   └── hachecko.md                      # Page counts, multipliers, and folder layout rules
│
└── archive/                             # Historical / superseded documents
    ├── Faktury_YYYY-YYYY/               # Previous submission cycles
    └── (Old tax returns, expired 30-day certificates, prior lease agreements)
```

---

## 🤖 3. Agent Operating Pipeline & Rules

### Phase 1: Ingestion & Auto-Classification
1. User drops raw downloaded files or scans into `<workspace_root>/`.
2. Agent inspects file contents, OCR headers, dates, and identifiers (NIP, PESEL, invoice numbers).
3. Files are renamed to canonical formats:
   * `ZAS-W` $\rightarrow$ `Zaswiadczenie_niezaleganie_ZAS-W_YYYY-MM-DD.pdf`
   * `ZUS RWN` (`ZUS-S-72a`) $\rightarrow$ `Zaswiadczenie_niezaleganie_ZUS_RWN_YYYY-MM-DD.pdf`
   * `PIT-28 + UPO` $\rightarrow$ `PIT-28_rok_YYYY.pdf` / `PIT-28_rok_YYYY_UPO.pdf`
   * `Ewidencja` $\rightarrow$ `Ewidencja_przychodow_YYYY_m01-12.pdf`
   * `ZUS Zaświadczenie` $\rightarrow$ `ZUS_zaswiadczenie_ubezpieczenie_YYYY-MM-DD.pdf`
   * `Lease` $\rightarrow$ `Umowa_najmu_lokalu_YYYY-MM-DD.pdf`

### Phase 2: Forensic Reconciliation Engine
* **Invoice Packaging (1-to-1):**
  * Every issued invoice is matched to its corresponding payment statement (Credit Agricole, ZEN.COM, Payoneer, PayPal, or Kompensata).
  * Invoices and their matching statements are grouped into individual subdirectories under `Faktury/`.
  * Multi-channel split payments (e.g. partial CA + ZEN + Payoneer) are reconciled to the exact cent.
* **Tax & Revenue Consistency:**
  * $\sum \text{Invoices} == \text{Ewidencja przychodów (Current Year)}$
  * $\text{PIT-28 (Przychód)} == \text{Ewidencja przychodów (Annual Summary)}$
  * $\text{Document ID in PIT} == \text{UPO confirmation receipt}$
* **30-Day Clearance Expiry Guard:**
  * Certificates `ZAS-W` and `ZUS RWN` are monitored against the 30-day statutory validity window.

### Phase 3: Family Package Cross-Distribution
* The primary sponsor's financial foundation documents (`CEIDG`, `ZAS-W`, `ZUS RWN`, `PIT-28+UPO`, `Umowa najmu`, `ZUS Zaświadczenie`) are automatically replicated into all dependent family member folders.
* **Exclusion of Redundant Spam:**
  * Separate loose-sheet declarations (*Oświadczenie o liczbie osób na utrzymaniu*, *Oświadczenie o pokrywaniu kosztów na dzieci*) are excluded, as these are statutory legal obligations (*art. 133 KRO*) and built into the official application form (*Wniosek Część B/C/D/E*).

### Phase 4: Queue Management & Collation
* **`todo/hachecko.md`:** Tracks only truly missing external items. Cleared dynamically as files are placed into the workspace.
* **`print/hachecko.md`:** Generates physical printing instructions (e.g. 4 copies of shared certificates, 1 copy of personal declarations, total page counts).

---

## 💰 4. Commercialization & Monetization Architecture

| Tier | Target Audience | Key Features | Price |
| :--- | :--- | :--- | :--- |
| 🟢 **Solo** | Single Applicant (JDG / Work) | 1 Profile, Invoice/ZUS parser, single audit report | **$49 – $59** (one-time) |
| 🔵 **Family Bundle** | Family Dossier (Up to 5) | Multi-profile canvas, cross-distribution, school/kindergarten sync, print dispatcher | **$99 – $129** (one-time) |
| 🟣 **Pro / Agency** | Immigration Lawyers / Relocation Agencies | Unlimited clients, batch sorting, white-label branded client readiness audit reports | **$99/mo** or **$799/yr** |

### 🛡️ Anti-Piracy / Moats:
1. **Hybrid Architecture:** Local data processing + Cloud-based Rule Engine (live tax thresholds, minimum wage updates, voivodeship-specific requirements queried via authenticated API key).
2. **"Living Law" Model:** Polish immigration and tax rules change every 3–6 months. Static leaked templates lose compliance value rapidly.
3. **Tauri Native Wrapper:** Compact ~8MB desktop binary with device-locked licensing.

---

## 🗺️ 5. Areas for Future Development & Improvement (Backlog)

1. **Automated Bank Statement Transaction Parser:** Direct parsing of multi-page MT940 / PDF bank statements to auto-extract and separate individual invoice payment confirmation pages.
2. **One-Click Print Collation PDF Merge:** Script to automatically concatenate all verified documents into a single `ready_to_print_<applicant>.pdf` with separator cover sheets.
3. **Multi-Region Expansion:** Pre-configured legal rule sets for Spain (Digital Nomad Visa), Portugal (D8/D7), and Cyprus.
4. **Wniosek PDF Form Auto-Filler:** Populating the official Polish 4-page *Wniosek o udzielenie zezwolenia na pobyt czasowy* directly from verified workspace metadata.
