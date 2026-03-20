# Jira Implement Story
> Implement a feature based on a Jira Story/Task, track status transitions, and validate all Acceptance Criteria.

## Input
- **Jira Issue Key:** (e.g. ECS-7)

## Workflow

### Step 1 — Fetch & Display Jira Issue
1. Fetch the Jira issue details using the MCP Jira tool
2. Display a summary to the user:
   - Key, Summary, Status, Priority
   - Full description / user story
   - All Acceptance Criteria (ACs) extracted and listed clearly

### Step 2 — Confirm Before Proceeding
Ask the user to confirm with **"ยืนยัน"** before making any changes.  
Do NOT proceed until confirmation is received.

### Step 3 — Transition to In Progress
1. Fetch available transitions for the issue
2. Find the transition named **"In Progress"** (or closest equivalent if not available)
3. Apply the transition to move the issue to **In Progress**
4. Confirm the status change to the user

### Step 4 — Generate AC Checklist
Before writing any code, display a checklist of all Acceptance Criteria extracted from the Jira issue:

```
## Acceptance Criteria Checklist
- [ ] AC1: <description>
- [ ] AC2: <description>
- [ ] AC3: <description>
...
```

Each AC must be directly derived from the Jira issue description. Do not invent criteria.

### Step 5 — Implement the Feature
1. Implement the feature following the Acceptance Criteria
2. Reference the existing codebase structure and follow project conventions
3. After completing each AC, mark it as done in the checklist:
   ```
   - [x] AC1: <description> ✅
   ```
4. Ensure ALL ACs are addressed before moving to the next step

### Step 6 — Validate All ACs
Run through each AC and verify:
- Code covers the given/when/then scenario
- Edge cases and unhappy paths are handled
- No AC is left unimplemented

Show the final checklist with all items marked:
```
## Acceptance Criteria Checklist — Final
- [x] AC1: ... ✅
- [x] AC2: ... ✅
...
```

### Step 7 — Transition to TO REVIEW
1. Fetch available transitions for the issue
2. Find the transition named **"review the feature"** (transition id: `2`) → status **TO REVIEW**
3. Apply the transition
4. Confirm the final status change to the user (status should now be **TO REVIEW**)

---

## Rules
- ตอบเป็นภาษาไทย
- ห้ามคิดข้อมูลขึ้นมาเอง — ใช้เฉพาะข้อมูลจาก Jira issue
- ยืนยันงานกับผู้ใช้ก่อนดำเนินการเสมอ
- ระบุคำยืนยันให้ชัดเจน: **"ยืนยัน"**
- ถ้าไม่แน่ใจให้ถามก่อน
- อย่าเปลี่ยน status โดยไม่ได้รับการยืนยัน
- ต้อง implement ให้ครบทุก AC ก่อนเปลี่ยน status เป็น In Review
