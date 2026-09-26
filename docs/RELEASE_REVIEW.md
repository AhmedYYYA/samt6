# SAMT6 release review

Reviewed on 26 September 2026 against the published GitHub Pages site.

## Verified behaviour

- Six automated domain tests pass, covering programme commitments, bilingual content, eligibility and independent review, the 20-person cap, evidence requirements, cost calculations and malformed saved state.
- JavaScript syntax checks pass for the application, domain logic and content files.
- A fictional civilian nomination progressed through eligibility, assessment, panel review and selection. Selection created the corresponding learning record.
- Panel referral was blocked until the second-assessor review was confirmed. The domain guard also protects selection and reserve decisions if that confirmation is removed.
- Weekly evidence, mentoring progress and a competency assessment were saved. Learning evidence persisted after a browser reload.
- Capacity 21 was rejected; capacity 20 was accepted.
- The illustrative cost calculator produced AED 2,239,625 for 10 participants and AED 4,272,250 for 20 using its default inputs. These are test scenarios, not quotations.
- Switching language preserved the edited calculator inputs and result.
- The downloaded JSON export contained the complete fictional journey, including its learning, mentoring and assessment changes. Reset restored the starting data.
- Arabic home and dashboard layouts were visually reviewed. Dashboard and assessment layouts fit a 375 CSS-pixel content viewport; Arabic and English assessment layouts were checked. The tablet assessment fit a 753 CSS-pixel content viewport. These narrow views were exercised through the responsive iframe fixture, not physical devices.
- The 21-page bilingual Word proposal was rendered and visually reviewed. Paragraph and reference pagination was corrected.
- No application-origin console warnings or errors were captured during the final live checks; browser-extension diagnostics were excluded.

## Corrections made during review

- Restricted weekly-card click handling to its buttons, so controls inside the evidence form no longer reopen the dialog.
- Extended the second-assessor condition to selection and reserve decisions.
- Removed the mobile dashboard grid's intrinsic minimum width and constrained its sidebar.
- Versioned the release assets so an updated page requests the current application and styles.

## Scope

This review verifies a public, fictional-data demonstration. It does not establish production security, institutional acceptance, host availability, formal accessibility conformance, or real programme effectiveness. Browser checks used Chrome; physical-device and assistive-technology testing remain outside this review.

The original page and PDF remain preserved. Programme and hosting assumptions are recorded in DECISIONS.md; institutional deployment requirements are in IMPLEMENTATION_HANDOVER.md.
