---
description: 
---

# Workflow: Create Team Management Web App (People + Attendance)

## Trigger

/create_team_app

---

## Objective

Build a **web-based Team Management SaaS module** that manages:

* Team members (users)
* Roles & permissions
* Attendance tracking
* Availability for scheduling

This module will act as the **central identity system** for all apps:

* TaskMaster
* Chrono
* Expense Tracker

---

## Platform Requirements

* Web-first responsive design
* Optimized for desktop dashboards
* Sidebar navigation layout (MANDATORY)

---

## UI Layout (VERY IMPORTANT)

Use SaaS dashboard structure:

### Layout:

* Left Sidebar (Navigation)
* Top Bar (User info + actions)
* Main Content Area

---

## Navigation Structure

Sidebar must include:

* Team
* Attendance
* Reports (optional)

---

## Rules

* Follow ecosystem UI rules (Finance app as base)
* Maintain consistent design system
* Reuse components (cards, buttons, tables)

---

## Steps

---

### 1. Define Data Models

#### User

* id
* name
* email
* role (Admin / Manager / Employee)
* avatar

#### Attendance

* id
* user_id
* date
* check_in_time
* check_out_time
* status

#### Availability

* user_id
* working_hours (start, end)

---

### 2. Build Team Management UI

#### A. Team List Page

Use **Table + Card hybrid UI**

Columns:

* Name
* Role
* Status
* Actions

Actions:

* Edit
* Delete

---

#### B. Add/Edit User Modal

* Form in modal (web standard)
* Fields:

  * Name
  * Email
  * Role

---

### 3. Attendance Dashboard

#### A. Daily View (Table)

Columns:

* User
* Check-in
* Check-out
* Status
* Working hours

---

#### B. Actions

* Mark check-in
* Mark check-out

---

### 4. Attendance Logic

* Late detection based on threshold
* Auto-calculate working hours
* Store daily records

---

### 5. Availability Configuration

* Set working hours per user
* Used by Chrono for scheduling

---

### 6. Integration Rules

#### TaskMaster:

* Assign tasks using Team users only

#### Chrono:

* Schedule based on:

  * Attendance
  * Availability

---

### 7. UI Components (MANDATORY REUSE)

* Tables (for lists)
* Cards (for summary)
* Modals (for forms)
* Buttons (same style as Finance app)

---

### 8. Dashboard Elements

Add summary cards on top:

* Total employees
* Present today
* Absent today

---

### 9. Architecture

* Clean Architecture
* MVVM
* Riverpod (if Flutter Web)
* Feature modules

---

### 10. Validation Step (MANDATORY)

* UI matches ecosystem design
* Sidebar + dashboard layout consistent
* Users shared across apps
* Attendance logic correctly implemented

Reject if mismatch found

---

## Output

Generate:

* Web dashboard layout
* Sidebar navigation
* Team management pages
* Attendance dashboard
* Integration hooks

Ensure it is production-ready SaaS UI
