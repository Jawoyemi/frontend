# Clinix
## The Sovereign Clinical Agent

> *Every supervised patient encounter produces two things: verified competence for the student, and portable health sovereignty for the patient.*

---

## What We Are Building

Clinix is an agentic clinical operating system for Nigerian teaching hospitals. It transforms the most common transaction in healthcare — the supervised patient encounter — into a dual-value event that benefits both the learner and the patient, permanently.

For **medical students**, Clinix replaces paper notebooks with AI-guided documentation, real-time diagnostic support, and a cryptographically-signed portfolio of verified clinical competence.

For **patients**, Clinix replaces lost paper cards with an encrypted, portable health record pushed directly to their personal data wallet — accessible via SMS, QR code, or any hospital system.

For **supervising physicians**, Clinix replaces scattered paper reviews with a unified dashboard for encounter oversight, competency tracking, and one-click approval workflows.

---

## The Problem

### The Invisible Curriculum
Every year, 40,000 Nigerian medical students perform millions of supervised consultations across teaching hospitals. They document symptoms, conduct exams, form diagnoses, and prescribe treatments — all on paper that gets lost, water-damaged, or forgotten. When they graduate, they hold a degree with zero documented proof of their clinical competence. MDCN licensing is exam-based. Residency applications are blind. Their practical growth is invisible.

### The Sovereignty Gap
Medical records in Nigeria belong to hospitals, not people. A patient who visits LAUTECH today and LUTH tomorrow must recount their entire history from memory. They lose their cards, forget their medications, and restart from zero at every new facility. There is no continuity of care across a fragmented health system. The people who need their records most — the poor, the elderly, the rural — are the least likely to have them.

### The Supervision Bottleneck
Supervising physicians review student notes on paper, with no systematic way to track a student's accuracy over time, identify dangerous patterns early, or verify that patient safety standards are maintained. The feedback loop is broken.

---

## The Solution

Clinix captures the value of every supervised encounter and splits it: **competence proof for the student, data sovereignty for the patient.** One transaction. Dual justice.

### How It Works

1. **The student opens Clinix** and selects a patient from the day's queue or searches an existing record.

2. **They document the encounter** — chief complaint, history, associated symptoms. As they type, Clinix's AI agent analyzes the input in real-time via the Model Context Protocol (MCP).

3. **The AI acts, not just chats.** It detects clinical patterns, suggests probable diagnoses with confidence scores, and triggers **Action Skills** — drafted workflows that check medication stock, verify test availability, and schedule follow-ups. Every action is drafted, not executed. Human verification is mandatory.

4. **The student conducts the physical exam**, enters vitals, and confirms or modifies the AI's suggestions. They document their working diagnosis and treatment plan.

5. **The supervisor reviews** the encounter in a unified dashboard — comparing the student's diagnosis, the AI's suggestion, and their own assessment — then approves, requests changes, or rejects with one click.

6. **Upon approval, the encounter is finalized.** The student earns **Verified Clinical Credits** across five competency categories, cryptographically signed and added to their permanent portfolio.

7. **Simultaneously, the patient receives an SMS** with a QR code. Scanning it pushes an encrypted summary of the entire encounter — diagnosis, vitals, treatment, follow-up — to their **Chekk Data Wallet**. They own the decryption key. The record is theirs forever, portable to any hospital.

---

## Core Features

### AI-Assisted Encounter Documentation
Real-time symptom analysis, differential diagnosis suggestions, and structured documentation that auto-saves every 30 seconds. The AI triggers after 10 characters of input, debounced at 500ms. The student remains in full control — every AI suggestion requires explicit confirmation.

**Target:** < 8 minutes per encounter.

### MCP Action Skills
Agentic workflows that trigger based on clinical patterns:

| Skill | Trigger | Actions Drafted |
|-------|---------|-----------------|
| **Malaria Detection** | Fever + headache + chills | RDT stock check, Coartem availability, Day 3 follow-up |
| **Cardiac Alert** | Chest pain + SOB + age > 40 | ECG order, cardiology referral, troponin stock check |
| **Diabetes Management** | RBS > 200 or known diabetic | Insulin stock check, HbA1c suggestion, hypoglycemia risk flag |
| **Prenatal Screening** | Pregnant patient | Gestational age tracking, high-risk marker flags, next visit scheduling |

All actions are logged for audit and accuracy tracking. All require human verification before execution.

### Patient Data Wallet (Chekk Integration)
When an encounter is finalized and supervisor-approved, Clinix generates an encrypted clinical summary (AES-256 at rest, TLS 1.3 in transit) and pushes it to the patient's Chekk Data Wallet via API. The patient receives an SMS with a QR code — no smartphone required. The record includes:

- Encounter date and location
- Chief complaint and history
- Vitals (temperature, BP, pulse, SpO2)
- Working diagnosis
- Investigations ordered
- Treatment plan and medications
- Follow-up instructions
- Student and supervisor names
- Cryptographic signature

### Verified Clinical Credits & Portfolio
Every approved encounter earns credits across five categories:

| Category | Points | Verification Method |
|----------|--------|---------------------|
| History Taking | 2 | Supervisor review of documentation completeness |
| Physical Examination | 2 | Vitals recorded + exam notes present |
| Differential Diagnosis | 2 | AI confidence > 70% OR supervisor override |
| Treatment Planning | 2 | Medications appropriate for diagnosis |
| Patient Communication | 1 | Patient satisfaction (optional feedback) |

The portfolio includes:
- Total encounters, diagnoses, and accuracy rate
- Competency radar chart (6 axes)
- Verified procedures list with cryptographic seals
- Exportable PDF for MDCN and residency applications
- Tamper-evident audit trail

### Supervisor Dashboard
- Queue of encounters pending review
- Side-by-side comparison: student diagnosis vs. AI suggestion vs. supervisor assessment
- One-click approve / request changes / reject
- Student performance trends (accuracy over time)
- Flagged encounters (high-risk, unusual patterns)
- Batch approval for low-risk, routine cases

---

## The Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS, React Query, Zustand |
| **Backend** | FastAPI, PostgreSQL, SQLModel, Redis |
| **AI Engine** | OpenAI GPT-4 via Model Context Protocol (MCP) |
| **Data Wallet** | Chekk.dev API |
| **Security** | JWT (15-min expiry), bcrypt, AES-256 encryption, TLS 1.3 |
| **Deployment** | Chekk.dev, Docker, AWS/GCP |

---

## Design Philosophy

### For the Student
- **Frictionless documentation.** Auto-save, smart templates, and voice-to-text ensure the tool saves time, not adds burden.
- **Learning, not replacing.** The AI suggests; the student decides. The supervisor verifies. The system teaches, not dictates.
- **Proof, not promises.** Every encounter produces a signed credit. Every credit builds a portfolio. Graduation comes with evidence.

### For the Patient
- **Sovereignty, not storage.** The patient owns the decryption key. The record is theirs, not the hospital's.
- **Inclusion, not exclusion.** SMS fallback ensures patients without smartphones are not left behind.
- **Portability, not lock-in.** The record travels with the patient to any hospital, any city, any country.

### For the Supervisor
- **Oversight, not micromanagement.** Batch approval for routine cases. Flags for high-risk patterns. Time saved, safety maintained.
- **Data, not intuition.** Student accuracy trends, encounter volumes, and competency gaps — all visible, all actionable.

---

## Impact

### For Medical Students
- Graduate with a **verified, portable portfolio** of clinical competence
- Receive **real-time feedback** on diagnostic accuracy
- Build **evidence-based applications** for MDCN licensing and international residencies
- Reduce documentation time by **60%** through AI-assisted workflows

### For Patients
- Own a **complete, encrypted health record** after every visit
- Experience **continuity of care** across hospitals and cities
- Access records via **SMS and QR code** — no smartphone required
- Reduce repeated history-taking and redundant tests

### For the Healthcare System
- Produce **documented, competent graduates** with measurable clinical skills
- Reduce **medical errors** through AI-assisted pattern recognition and supervisor oversight
- Enable **data-driven quality improvement** through encounter analytics
- Build toward a **national standard** for clinical education documentation

---

## Why Now

1. **Agentic AI (MCP)** has matured from conversational to operational. AI can now interface with inventory systems, scheduling tools, and referral networks in structured, auditable ways.

2. **Chekk's data portability infrastructure** is production-ready and actively seeking health integrations. Patient-owned data wallets are no longer theoretical.

3. **Post-COVID digitization** has made Nigerian teaching hospitals more receptive to clinical workflow tools. The infrastructure and appetite exist.

4. **MDCN is modernizing** — a verified, digital portfolio system aligns with upcoming credentialing reforms and international accreditation standards.

---

## What Makes It Defensible

| Moat | Mechanism |
|------|-----------|
| **Network Effects** | More students → more encounters → more patient wallets → more hospital demand for wallet-compatible systems |
| **Institutional Lock-in** | Once MDCN recognizes Clinix portfolios, students cannot switch. Once patients own wallets, they resist returning to paper |
| **Data Advantage** | Every encounter improves AI accuracy on local disease patterns (malaria, typhoid, Lassa fever) — a training advantage Western diagnostic tools cannot replicate |
| **Regulatory Alignment** | Positioned as an *education and documentation* tool, not a diagnostic device. Supervisor oversight maintains patient safety and regulatory compliance |

---

## The Vision

**By 2030, every medical student in Nigeria will graduate with a Clinix-verified clinical portfolio, and every Nigerian patient will own their complete health history in a portable, encrypted data wallet.**

---

## The Ask

We are building the clinical layer that Nigerian medical education and patient care have never had. We need deployment partnership and mentorship to pilot at LAUTECH Teaching Hospital and prove that every supervised consultation can produce value for both the student and the patient.

We are not just building software. We are building the **proof of competence** that the next generation of Nigerian doctors will graduate with, and the **data sovereignty** that every patient deserves.

---

*Clinix — The Sovereign Clinical Agent*  
*Built by Nigerian builders, for Nigerian students and patients.*
