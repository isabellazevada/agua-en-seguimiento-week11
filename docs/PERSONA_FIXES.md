# Persona-informed changes · October 25, 2026

## Evidence supplied by Isabella
The user shared a fresh-chat synthetic test of Laura, a fictional 54-year-old coordinator. The first three screens were interpreted in character. The remaining screenshots were reviewed as an interface inspection, not evidence that Laura independently completed the task. This is not real-user research.

Two selected priorities:
1. Explain closure evidence and remove contradictory current messages.
2. Put the next action beside the household heading and distinguish current, completed and verified states.

## Implemented
- Next-action block above the chart, a matching button, blue current step, checkmarked completed steps, green reserved for verified closure.
- Closure summary records technical observation and household confirmation plus source, before/after amounts, dates and equal-duration periods.
- Visits now record a closed-choice component (e.g. pipe or joint), shown in case history and the closure summary.
- Verification blocks missing sources/dates, overlapping or reversed periods, future period ends and unconfirmed comparability.
- Save pending preserves partial form values in session memory and never marks a case verified. Numeric values are validated even for partial saves.
- Initial chart is explicitly a separate historical reference after closure. It is not silently updated or presented as the comparison evidence.
- Visit card now states exactly whether verification is pending or completed.
- Detail header explicitly explains loss of changes on reload/tab close.

## Checks performed
- 14 automated domain/presentation tests pass, including existing appointment-capacity and repair-verification regression cases.
- Browser UI: H-03 review, T-01 09:00 booking, fictional pipe intervention, partial-save retention, then manual comparison of 100 L at 09:00 and 20 L at 11:00 on October 25, each for 15 minutes, with fictional family confirmation.
- Observed verified summary includes both period ends, declared manual source, pipe/joint observation and confirmation. Initial chart and current visit status are explicitly separated.

## Required follow-up
Repeat the affected screens with Laura in the original persona-test chat. These implementation and mechanical observations are not a passed persona retest. Preserve unresolved concerns separately; do not claim all nine suggested improvements were implemented.
