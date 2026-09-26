# SAMT implementation handover

## Delivered scope

A static bilingual website and browser-local demonstration. Hash routes allow deployment under any static subdirectory without server rewrites. Proposal, curriculum, competencies and references share `data.js`; Markdown and Word are generated from the same content.

## Interaction model

`core.js` owns the state and rules. `app.js` renders the interface and invokes those rules. Stored schema version is 1. Malformed stored content falls back to a fresh demo. The language preference is stored separately. User-entered notes are escaped before rendering. No third-party services or executable content are accepted.

Candidates have coded sample identifiers, track, career stage, function, eligibility, ratings, stage and notes. A panel selection creates a linked fellow record. Fellows contain weekly evidence, baseline/current ratings, mentor touchpoints and project follow-up. Activity entries record demonstration changes locally.

Selection transitions: nominated → eligible → assessing → panel → selected / reserve / not selected. Reserve records return to panel for reconsideration. A record cannot skip directly to admission; capacity is capped at 20. Terminal selection records are read-only in the selection view. Panel scoring and development scoring are different proposed rubrics and are not conflated.

## Future operational design

| Area | Required decision before real deployment |
|---|---|
| Account ownership | MOD-selected identity provider and account lifecycle |
| Roles | Candidate, fellow, mentor, assessor, programme administrator, decision authority and auditor; explicit separation of duties |
| Records | Server-side data model, migrations, validation and approved access policy |
| Assessor independence | Independent assessments recorded before visibility of other scores; panel moderation and documented conflicts |
| Data | Approved classification, hosting, retention, deletion, export and incident procedures |
| Integrity | Server-generated audit history, backups and recovery testing |
| Integrations | Only MOD-approved HR, learning, travel and reporting interfaces |
| Accessibility | Independent keyboard, assistive-technology and bilingual usability review |
| Operations | Named support owner, service expectations and controlled pilot users |

None of these server or security capabilities are claimed by the current demonstration. They are the transition design for institutional adoption.

## Reproduction

Run `npm test` and `npm run check`. Generate text with `node scripts/export-content.cjs`. Generate Word using `python scripts/build-proposal.py` in an environment with python-docx and suitable Arabic fonts. Render the Word document and inspect all pages before distributing an updated file.

The earlier PDF is retained as historical material. `docs/SAMT_Approval_Proposal.docx` is the new proposal aligned to the 25 September 2026 decisions.
