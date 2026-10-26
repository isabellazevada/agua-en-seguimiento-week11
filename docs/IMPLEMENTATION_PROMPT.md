# Build prompt · Water Follow-up

Implement the attached pre-code PACKET.md as a Spanish-language browser-only academic prototype. Use a buildless HTML/CSS/ES-module frontend for a reproducible free static deployment; this replaces the packet's proposed React/Vite framework, without changing feature scope. Keep all records in memory and reset on reload. Never accept personal free text. No external API, analytics, real sensor or service integration.

## Small features and acceptance criteria
1. Accessible responsive coordinator dashboard: visible fictional-data banner, three synthetic scenarios, household list, consumption chart, case history and eight initial new appointment slots. A role view is a demo view, not auth.
2. Reproducible logistic-regression model: train with NumPy on separated synthetic households, export coefficients and evaluation. Browser inference must use learned coefficients. Insufficient or stale readings bypass inference. Label synthetic inputs and limits beside the result.
3. Human review: a suspected leak is a review signal, not a diagnosis; no unusual pattern is not a safety statement. Closed choices record the review decision. Keep missing-data and funding cases pending.
4. Service assignment: fictional technician, fixed available schedule and remaining capacity are required. Repeated clicks cannot duplicate a booking. A ninth new appointment is rejected. Repeat visits consume capacity.
5. Verification: visit completion requires a technical observation. Closure requires comparable before/after readings and household confirmation; disagreements reopen the case. No automatic closure from ML or a visit.
6. Manual readings: finite, nonnegative, bounded numeric values and non-future timestamps, known household IDs only; reject duplicate intervals. A single reading is not a temporal series. All edits remain in memory.
7. Safety and limits: fictional service-hours demonstration, unverified external route, no emergency-response promise. Clearly separate automatic receipt from human review. Pilot ending reveals pending cases and equipment/follow-up planning.

## Commit and deployment plan
1. Packet and this prompt before app code.
2. Synthetic generator, learned ML and reproducible metrics.
3. Responsive UI and core case workflow.
4. Validation and substantive workflow tests; first deployment.
5+. Fix real observed bugs or gaps, record findings and test again; second deployment.

Every session closes with DECISIONS.md, tomorrow's first move, commit and push. Never manufacture test evidence or claim a persona test happened without a separate fresh-chat screenshot walkthrough. Team Blueprint and exact shadow clause are still unconfirmed. Git commits here are real; Sites source hosting is not an external GitHub repository.
