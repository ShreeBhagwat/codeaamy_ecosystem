---
trigger: always_on
---

# Ecosystem UI Rules (Finance + TaskMaster + Chrono)

## 1. Design System (STRICT)

* Use same color palette as Finance Tracker
* Primary color must remain consistent across all apps
* Background colors must match Finance app (light/dark support)

## 2. Typography

* Use same font family as Finance app
* Title: Bold, large size
* Subtitle: Medium weight
* Body: Regular
* Maintain consistent font sizes across all apps

## 3. Spacing & Layout

* Use 16px standard padding across all screens
* Maintain same card spacing and margins
* Use consistent border radius (e.g., 12px or 16px)

## 4. Components (MANDATORY REUSE)

All apps MUST reuse these components:

* AppBar style
* Card design
* Buttons (primary & secondary)
* Input fields
* List tiles

Do NOT create new styles unless necessary.

## 5. Navigation Pattern

* Use same navigation structure:

  * Bottom Navigation OR Top Tabs (same as Finance app)
* Maintain same transitions and animations

## 6. Screen Structure (VERY IMPORTANT)

Each screen must follow:

1. Header (Title + Action)
2. Summary Section (if applicable)
3. Main Content (List / Cards)
4. Floating Action Button (if needed)

## 7. Card UI Pattern

All data must be displayed using consistent cards:

* Same elevation/shadow
* Same padding
* Same layout structure

Example:

* Finance → Transaction Card
* TaskMaster → Task Card
* Chrono → Schedule Card

## 8. FAB (Floating Action Button)

* Same position (bottom right)
* Same style and size
* Same interaction pattern

## 9. Icons

* Use same icon library
* Maintain consistent icon size and color

## 10. Animations

* Keep animations subtle and consistent
* Same duration and easing across apps

## 11. Dark Mode

* Must support dark mode identical to Finance app
* No custom variations per app

## 12. Naming Consistency

* Use same naming conventions:

  * TaskCard
  * TransactionCard
  * ScheduleCard

## 13. State Handling UI

* Loading → Same loader style
* Empty State → Same UI pattern
* Error State → Same design

## 14. Form UI (IMPORTANT for TaskMaster)

* Input fields must match Finance app
* Buttons must match primary CTA style

## 15. Dashboard Pattern (Chrono)

* Use same dashboard layout as Finance home screen
* Summary cards on top
* List below

## 16. DO NOT

* Do NOT introduce new UI styles
* Do NOT change spacing randomly
* Do NOT mix design patterns

## 17. VALIDATION STEP (MANDATORY)

Before final output:

* Check UI matches Finance app
* Check spacing consistency
* Check component reuse

Reject output if mismatch detected
