---
description: 
---

# Workflow: Create Chrono (Day Scheduler)

## Trigger

/create_chrono

---

## Objective

Build a **Day Scheduler app (Chrono)** that integrates with **TaskMaster** and converts tasks into a structured daily schedule.

Chrono MUST follow the same UI/UX design system as the Finance app.

---

## Dependencies

* TaskMaster App (source of tasks)
* Ecosystem UI Rules (Finance app as design reference)

---

## Inputs

* user_tasks (fetched from TaskMaster)
* optional: selected_date

---

## Rules

* Follow ecosystem_rules.md strictly
* Maintain same UI components as Finance app
* Reuse card design, spacing, typography
* Do NOT introduce new UI styles

---

## Steps

### 1. Fetch Tasks from TaskMaster

* Get all tasks
* Filter by:

  * Pending
  * In Progress
* Ignore completed tasks

---

### 2. Normalize Task Data

Convert tasks into schedulable format:

* title
* duration (default if not provided)
* priority
* due date

---

### 3. Generate Day Plan

Create a structured schedule:

* Divide day into time blocks
* Assign tasks based on:

  * Priority
  * Due date
  * Estimated duration

Ensure:

* No overlapping tasks
* Balanced workload

---

### 4. Build Chrono UI

#### A. Day Timeline Screen

* Show schedule as time blocks
* Each block = TaskCard (same as ecosystem card style)

#### B. Schedule Card UI

Each card must include:

* Task title
* Time slot (e.g., 10:00 - 11:00)
* Status

Use same card design as Finance app

---

### 5. Interaction Features

* Tap → View task details
* Long press → Reschedule task
* Drag & drop (optional advanced)

---

### 6. Create “Plan My Day” Action

* Button / FAB:
  → “Generate Today’s Plan”

On click:

* Fetch tasks
* Generate schedule
* Render timeline

---

### 7. Sync Back to TaskMaster

* Update task with:

  * Scheduled time
  * Status changes

---

### 8. Handle Edge Cases

* No tasks → Show empty state (same style as Finance app)
* Too many tasks → Overflow to next day
* Missing duration → Assign default

---

### 9. Architecture

* Clean Architecture
* MVVM
* Riverpod for state management

---

### 10. Validation Step (MANDATORY)

* UI matches Finance app
* Cards match TaskMaster cards
* Spacing consistent (16px)
* No design deviation

Reject output if mismatch found

---

## Output

Generate:

* Chrono app structure
* Timeline UI
* Task scheduling logic
* Integration with TaskMaster
* State management setup

Ensure app is ecosystem-consistent and ready to run
