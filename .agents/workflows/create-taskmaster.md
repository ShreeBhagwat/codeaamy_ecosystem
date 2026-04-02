---
description: 
---

You are building a new application called **TaskMaster**, which is part of an existing ecosystem that already includes a Finance/Expense Tracker app.

Your goal is to generate a **Task Management application** that strictly follows the **same UI, UX patterns, and design system** as the Finance app.

---

## Core Objective

Build a Task Management app where users can:

* Create tasks
* Assign tasks to users
* Track task status
* View task lists and details

---

## STRICT DESIGN REQUIREMENTS (VERY IMPORTANT)

* The Finance Tracker app is the **source of truth for UI**
* All screens, components, spacing, typography, and layout MUST match the Finance app
* DO NOT introduce new design styles
* Reuse existing patterns:

  * AppBar
  * Cards
  * Buttons
  * Input fields
  * Navigation

---

## FEATURES TO BUILD

### 1. Task List Screen

* Display list of tasks using **card UI (same as transaction cards)**
* Each task card should include:

  * Task title
  * Assigned user
  * Due date
  * Status (Pending / In Progress / Completed)

---

### 2. Create Task Screen

* Form-based UI (same style as Finance input forms)
* Fields:

  * Task title
  * Description
  * Assign user
  * Due date
  * Priority
* Use same button styles and spacing

---

### 3. Task Detail Screen

* Detailed view of selected task
* Show:

  * Full description
  * Assigned user
  * Status
  * Timeline / updates

---

### 4. Task Assignment Logic

* Allow assigning tasks to users
* Show assigned user clearly in UI

---

### 5. Status Management

* Allow updating task status:

  * Pending
  * In Progress
  * Completed

---

## UI STRUCTURE (MANDATORY)

Each screen must follow:

1. Header (Title + Action)
2. Optional summary section (if needed)
3. Main content (list/cards)
4. Floating Action Button for creating tasks

---

## ARCHITECTURE REQUIREMENTS

* Use Clean Architecture
* Follow MVVM pattern
* Use Riverpod for state management
* Feature-based folder structure

---

## COMPONENT REUSE (CRITICAL)

* TaskCard must visually match TransactionCard
* Buttons must match Finance app buttons
* Forms must match Finance input style

---

## VALIDATION STEP (MANDATORY)

Before final output:

* Ensure UI matches Finance app
* Ensure spacing consistency (16px standard)
* Ensure no new design patterns are introduced

Reject and fix if mismatch is found

---

## OUTPUT

Generate:

* Folder structure
* UI screens
* Components
* State management logic
* Models

Ensure the app is ready to run and consistent with the ecosystem.
