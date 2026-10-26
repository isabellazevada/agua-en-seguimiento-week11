# Mechanical test and deployment evidence

## Baseline publication
- Deployment 1 succeeded: `appgdep_6ad6a4a1ddc8819192978b115f352e05`.
- Source: `daa4039242bcfa4d0b5f3759c88899170d9ec1a2`.
- URL: https://agua-en-seguimiento-isabella.isazevada.chatgpt.site
- Audience remains owner-private. This does not yet establish instructor access.

## Actual bug discovered after deployment 1
Node's test runner reported 7 passed / 1 failed. The failing test supplied `leak-fixed`, before=100 L, after=100 L and household confirmation=yes. The previous rule incorrectly allowed verified closure even though comparable consumption did not decline.

Correction: for claimed leak repairs, unchanged or increased consumption keeps the case open for second review. The eight original tests then all passed. Follow-up coverage also checks that a repeat visit consumes another capacity slot and preserves the old technician reservation.

## Browser observations (internal supervised preview)
Performed through the UI on fictional H-03:
1. Opened the case; recorded human review requiring a visit.
2. Assigned fictional T-01 at 09:00; observed scheduled status.
3. Recorded a fictional intervention; observed “Falta verificar”, not closure.
4. After correction, submitted 100 L before and 100 L after with equivalent-window confirmation and household=yes.
5. Observed “El caso sigue abierto: requiere segunda revisión” and the case returned to human review.

Visual desktop review showed the dashboard, simulated-feed banner, capacity, chart and case actions. Mobile layouts are implemented with responsive CSS but have not been verified in a mobile browser viewport.

## Evaluation scope
Synthetic model metrics: 95 true positives, 105 true negatives, 0 false positives, 0 false negatives on 200 synthetic held-out households. These are not real-household accuracy claims. Training split by unique synthetic household, fixed seed 1119.

## Still separate
The persona test has NOT been completed. It requires a fresh chat and screenshots of this actual product, then a logged fix and retest. No synthetic interview or real-user feedback is fabricated here. Git history is in the Sites source repository; an external GitHub repository and link have not yet been created.
