# سَمْت | SAMT

Arabic-first leadership-development proposal and interactive demonstration for Ministry of Defence review. English provides equivalent programme content and workflows.

**Status:** A personal initiative seeking MOD endorsement and adoption. No MOD approval, host agreement, programme accreditation or actual participant outcome is claimed. All demonstration records are fictional.

## Experience

- **Initiative:** purpose, institutional value, generational knowledge transfer and programme overview.
- **Programme:** the complete 16-week route, proposed hosts, weekly outputs, eight competency domains and 12-month follow-up.
- **Approval case:** decision request, governance, eligibility, selection, assessment, costs, risks, implementation and references.
- **Demonstration:** connected nomination, selection, learning, monitoring and assessment workflows, with an activity record and JSON export.

## Confirmed design commitments

| Decision | Commitment |
|---|---|
| Audience | Military and civilian personnel exclusively from MOD |
| Career stage | Early and mid-career, selected primarily for exceptional potential |
| Duration | 16 consecutive full-time weeks |
| Countries | UAE, UK, France and USA |
| Cohort | Flexible, capped at 20 per cycle; demo starts with capacity 10 |
| Hosts | Existing proposed anchors retained; additions permitted |
| Language | Arabic default, fully equivalent English |
| Release | Interactive demonstration using fictional data |
| Brand | New visual direction retaining SAMT and its meaning |
| Repository | Public |

The previous public `samt6` repository was already present. Its earlier page is preserved at [`archive/previous-index.html`](archive/previous-index.html); its original PDF and git history remain intact. SAMT5 is unchanged.

## Run and test

No build step, runtime libraries, API keys or server application are required.

```sh
python3 -m http.server 8765
npm test
npm run check
```

Open `http://localhost:8765`. The site also works as static hosting under a path such as `/samt6/`. All internal asset paths are relative. GitHub Pages can publish `main` at the repository root.

## Files

| Path | Purpose |
|---|---|
| `index.html` | Accessible entry document and metadata |
| `styles.css` | Responsive design, RTL, print and reduced motion |
| `data.js` | Shared bilingual programme and proposal content |
| `core.js` | State model, selection gates, validation and arithmetic |
| `app.js` | Interface, routes, forms, browser persistence and export |
| `docs/SAMT_Approval_Proposal.docx` | Complete Arabic and English approval proposal |
| `docs/SAMT_Approval_Proposal_AR.md` | Arabic text for review and reuse |
| `docs/SAMT_Approval_Proposal_EN.md` | Equivalent English text |
| `scripts/export-content.cjs` | Regenerate JSON and Markdown from `data.js` |
| `scripts/build-proposal.py` | Regenerate Word document with python-docx |
| `tests/core.test.cjs` | Workflow, capacity, evidence, scoring and cost checks |

Arabic fonts are bundled locally under the SIL Open Font License in `assets/fonts/OFL.txt`. No analytics or third-party assets are loaded by the application.

## Demonstration boundaries

Data is saved only in local browser storage. If storage is unavailable, changes remain in memory for the session. Reset restores fictional records; export downloads a copy. No information is submitted to MOD or a host. There is no authentication, server database, email, document upload or real application processing. The local activity record is editable browser state, not an audit control.

Selection scores support a human panel decision. The demo requires eligibility, a second-assessor confirmation and the correct stage sequence; it prevents admission beyond capacity. It intentionally does not invent automatic pass thresholds, age or rank restrictions, accreditation or command eligibility.

The cost calculator uses labelled illustrative inputs, not quotations. The 91-day overseas assumption follows the proposed 3/6/3/4-week allocation. Actual travel, nights, tuition, tax, insurance, support and release costs must be established during feasibility.

## References and delivery handover

Primary institutional sources, the OECD recommendation and a peer-reviewed leadership-training meta-analysis are documented in the proposal. Their presence establishes neither SAMT accreditation nor host participation.

See [`docs/DECISIONS.md`](docs/DECISIONS.md), [`docs/DEMO_WALKTHROUGH.md`](docs/DEMO_WALKTHROUGH.md) and [`docs/IMPLEMENTATION_HANDOVER.md`](docs/IMPLEMENTATION_HANDOVER.md).
