# 📘 เอกสารรายละเอียดโครงการ: ระบบบริหารจัดการบริษัทรับทำเว็บ

## Web Agency Management System (WAMS)

**Version:** 1.0  
**Date:** 25 กุมภาพันธ์ 2026  
**Tech Stack:** Next.js 15 + TypeScript + PostgreSQL + NestJS  
**Target Users:** พนักงาน 20 คน (บริษัทรับทำเว็บไซต์)

---

## สารบัญ

1. [ภาพรวมโครงการ (Project Overview)](#1-ภาพรวมโครงการ)
2. [สถาปัตยกรรมระบบ (System Architecture)](#2-สถาปัตยกรรมระบบ)
3. [Tech Stack & Tools](#3-tech-stack--tools)
4. [โครงสร้าง Folder](#4-โครงสร้าง-folder)
5. [ระบบ Authentication & Authorization](#5-ระบบ-authentication--authorization)
6. [Module 1: ระบบบริหารงานบุคคล (HR & People)](#6-module-1-ระบบบริหารงานบุคคล)
7. [Module 2: ระบบบริหารโปรเจกต์ (Project Management)](#7-module-2-ระบบบริหารโปรเจกต์)
8. [Module 3: ระบบการเงินและบัญชี (Finance & Accounting)](#8-module-3-ระบบการเงินและบัญชี)
9. [Module 4: ระบบบริหารลูกค้า (CRM & Sales)](#9-module-4-ระบบบริหารลูกค้า)
10. [Module 5: ระบบสื่อสารภายใน (Communication)](#10-module-5-ระบบสื่อสารภายใน)
11. [Module 6: ระบบ Dashboard & Reporting](#11-module-6-ระบบ-dashboard--reporting)
12. [Database Schema (ERD)](#12-database-schema)
13. [API Endpoints](#13-api-endpoints)
14. [Deployment & DevOps](#14-deployment--devops)
15. [แผนการพัฒนา (Development Roadmap)](#15-แผนการพัฒนา)

---

## 1. ภาพรวมโครงการ

### 1.1 วัตถุประสงค์

พัฒนาระบบ Web Application แบบ All-in-One สำหรับบริหารจัดการบริษัทรับทำเว็บไซต์ขนาด 20 คน ครอบคลุมงาน HR, โปรเจกต์, การเงิน, ลูกค้า, สื่อสาร และ Dashboard รวมในที่เดียว

### 1.2 ปัญหาที่แก้ไข

- ลดการใช้หลายเครื่องมือแยกกัน (Spreadsheet, Line, Email ฯลฯ)
- รวมข้อมูลไว้ที่เดียว ลดการตกหล่น
- ติดตามสถานะโปรเจกต์แบบ Real-time
- ระบบการเงินเชื่อมกับโปรเจกต์ได้
- มี Dashboard สำหรับ Management ตัดสินใจ

### 1.3 User Roles

| Role | คำอธิบาย | จำนวน (ประมาณ) |
|------|----------|----------------|
| **Super Admin** | เจ้าของ/ผู้บริหารสูงสุด จัดการทุกอย่าง | 1 |
| **Admin / HR** | จัดการบุคคล เงินเดือน ภาพรวม | 1-2 |
| **Project Manager (PM)** | บริหารโปรเจกต์ มอบหมายงาน | 2-3 |
| **Developer** | พัฒนาเว็บไซต์ รับ Task | 8-10 |
| **Designer** | ออกแบบ UI/UX อัปโหลด Design | 2-3 |
| **QA / Tester** | ทดสอบ รายงาน Bug | 1-2 |
| **Sales / Account** | ดูแลลูกค้า ทำใบเสนอราคา | 1-2 |
| **Finance** | จัดการการเงิน ออกใบแจ้งหนี้ | 1 |

---

## 2. สถาปัตยกรรมระบบ

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client Layer                       │
│  Next.js 15 (App Router) + TypeScript + Tailwind CSS │
│  + Zustand (State) + React Query (Data Fetching)     │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS / REST + WebSocket
┌──────────────────────▼──────────────────────────────┐
│                    API Layer                          │
│         NestJS (REST API + WebSocket Gateway)        │
│         + JWT Auth + Role-Based Access Control       │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────┼──────────────────┐
        ▼              ▼                  ▼
┌──────────────┐ ┌──────────┐ ┌──────────────────┐
│  PostgreSQL  │ │  Redis   │ │  MinIO / S3      │
│  (Main DB)   │ │ (Cache & │ │  (File Storage)  │
│              │ │  Queue)  │ │  Design, Docs    │
└──────────────┘ └──────────┘ └──────────────────┘
```

### 2.2 Architecture Pattern

- **Frontend:** Next.js 15 App Router (Server Components + Client Components)
- **Backend:** NestJS with modular architecture
- **Database:** PostgreSQL with Prisma ORM
- **Cache:** Redis สำหรับ session, real-time notification queue
- **File Storage:** MinIO (self-hosted S3-compatible) หรือ AWS S3
- **Real-time:** WebSocket (Socket.io) สำหรับ Chat & Notification
- **Authentication:** JWT (Access Token + Refresh Token)

---

## 3. Tech Stack & Tools

### 3.1 Frontend

| เทคโนโลยี | เวอร์ชัน | ใช้งาน |
|-----------|---------|--------|
| Next.js | 15.x | Framework หลัก (App Router) |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling |
| shadcn/ui | latest | UI Component Library |
| Zustand | 5.x | Global State Management |
| TanStack Query | 5.x | Server State / Data Fetching |
| React Hook Form | 7.x | Form Management |
| Zod | 3.x | Validation Schema |
| Socket.io Client | 4.x | Real-time Communication |
| Recharts | 2.x | Dashboard Charts |
| TipTap | 2.x | Rich Text Editor |
| FullCalendar | 6.x | Calendar View |
| react-beautiful-dnd | 13.x | Drag & Drop (Kanban) |

### 3.2 Backend

| เทคโนโลยี | เวอร์ชัน | ใช้งาน |
|-----------|---------|--------|
| NestJS | 11.x | Backend Framework |
| Prisma | 6.x | ORM |
| PostgreSQL | 16 | Main Database |
| Redis | 7.x | Cache & Queue |
| BullMQ | 5.x | Job Queue (Email, Notification) |
| Socket.io | 4.x | WebSocket Server |
| Passport.js | 0.7.x | Authentication Strategy |
| Multer | 1.x | File Upload |
| Sharp | 0.33.x | Image Processing |
| Nodemailer | 6.x | Email Sending |
| PDFKit / Puppeteer | - | PDF Generation (ใบเสนอราคา/Invoice) |

### 3.3 DevOps & Infrastructure

| เทคโนโลยี | ใช้งาน |
|-----------|--------|
| Docker + Docker Compose | Containerization |
| Nginx | Reverse Proxy |
| GitHub Actions | CI/CD |
| MinIO | File Storage (S3-compatible) |
| Prometheus + Grafana | Monitoring |

---

## 4. โครงสร้าง Folder

### 4.1 Frontend (Next.js)

```
frontend/
├── src/
│   ├── app/                          # App Router
│   │   ├── (auth)/                   # Auth Layout Group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/              # Main Dashboard Layout Group
│   │   │   ├── layout.tsx            # Sidebar + Topbar Layout
│   │   │   ├── page.tsx              # Dashboard Home
│   │   │   │
│   │   │   ├── hr/                   # Module 1: HR
│   │   │   │   ├── employees/
│   │   │   │   │   ├── page.tsx      # รายชื่อพนักงาน
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── page.tsx  # รายละเอียดพนักงาน
│   │   │   │   │   └── new/
│   │   │   │   │       └── page.tsx  # เพิ่มพนักงาน
│   │   │   │   ├── attendance/
│   │   │   │   │   └── page.tsx      # ลงเวลา
│   │   │   │   ├── leave/
│   │   │   │   │   └── page.tsx      # ระบบลา
│   │   │   │   ├── payroll/
│   │   │   │   │   └── page.tsx      # เงินเดือน
│   │   │   │   └── performance/
│   │   │   │       └── page.tsx      # ประเมินผลงาน
│   │   │   │
│   │   │   ├── projects/             # Module 2: Project Management
│   │   │   │   ├── page.tsx          # รายการโปรเจกต์
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx      # ภาพรวมโปรเจกต์
│   │   │   │   │   ├── board/
│   │   │   │   │   │   └── page.tsx  # Kanban Board
│   │   │   │   │   ├── tasks/
│   │   │   │   │   │   └── page.tsx  # Task List
│   │   │   │   │   ├── timeline/
│   │   │   │   │   │   └── page.tsx  # Gantt Chart
│   │   │   │   │   ├── documents/
│   │   │   │   │   │   └── page.tsx  # เอกสารโปรเจกต์
│   │   │   │   │   ├── designs/
│   │   │   │   │   │   └── page.tsx  # Design & Asset
│   │   │   │   │   ├── git/
│   │   │   │   │   │   └── page.tsx  # Git Integration
│   │   │   │   │   └── settings/
│   │   │   │   │       └── page.tsx  # ตั้งค่าโปรเจกต์
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── finance/              # Module 3: Finance
│   │   │   │   ├── quotations/
│   │   │   │   │   └── page.tsx      # ใบเสนอราคา
│   │   │   │   ├── invoices/
│   │   │   │   │   └── page.tsx      # ใบแจ้งหนี้
│   │   │   │   ├── receipts/
│   │   │   │   │   └── page.tsx      # ใบเสร็จ
│   │   │   │   ├── expenses/
│   │   │   │   │   └── page.tsx      # ค่าใช้จ่าย
│   │   │   │   └── reports/
│   │   │   │       └── page.tsx      # รายงานการเงิน
│   │   │   │
│   │   │   ├── crm/                  # Module 4: CRM
│   │   │   │   ├── clients/
│   │   │   │   │   └── page.tsx      # ข้อมูลลูกค้า
│   │   │   │   ├── leads/
│   │   │   │   │   └── page.tsx      # Sales Pipeline
│   │   │   │   ├── contracts/
│   │   │   │   │   └── page.tsx      # สัญญา
│   │   │   │   └── support/
│   │   │   │       └── page.tsx      # Support Ticket
│   │   │   │
│   │   │   ├── chat/                 # Module 5: Communication
│   │   │   │   ├── page.tsx          # Chat หลัก
│   │   │   │   └── [channelId]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── announcements/        # ประกาศ
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── wiki/                 # Knowledge Base
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── reports/              # Module 6: Reports
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── settings/             # ตั้งค่าระบบ
│   │   │       ├── page.tsx
│   │   │       ├── company/
│   │   │       ├── roles/
│   │   │       └── integrations/
│   │   │
│   │   ├── api/                      # API Routes (BFF)
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │
│   │   ├── globals.css
│   │   └── layout.tsx                # Root Layout
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── hr/
│   │   ├── projects/
│   │   ├── finance/
│   │   ├── crm/
│   │   ├── chat/
│   │   └── shared/
│   │       ├── DataTable.tsx
│   │       ├── FileUpload.tsx
│   │       ├── RichTextEditor.tsx
│   │       ├── StatusBadge.tsx
│   │       ├── UserAvatar.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSocket.ts
│   │   ├── useDebounce.ts
│   │   └── usePermission.ts
│   │
│   ├── stores/                       # Zustand Stores
│   │   ├── authStore.ts
│   │   ├── notificationStore.ts
│   │   ├── chatStore.ts
│   │   └── sidebarStore.ts
│   │
│   ├── lib/
│   │   ├── api.ts                    # Axios instance
│   │   ├── socket.ts                 # Socket.io client
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── validations/
│   │       ├── hr.schema.ts
│   │       ├── project.schema.ts
│   │       ├── finance.schema.ts
│   │       └── crm.schema.ts
│   │
│   ├── types/
│   │   ├── hr.types.ts
│   │   ├── project.types.ts
│   │   ├── finance.types.ts
│   │   ├── crm.types.ts
│   │   ├── chat.types.ts
│   │   └── common.types.ts
│   │
│   └── middleware.ts                 # Auth Middleware
│
├── public/
│   ├── images/
│   └── icons/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 4.2 Backend (NestJS)

```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── dto/
│   │       └── pagination.dto.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── refresh-token.strategy.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       └── register.dto.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── hr/
│   │   │   ├── hr.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── employee.controller.ts
│   │   │   │   ├── attendance.controller.ts
│   │   │   │   ├── leave.controller.ts
│   │   │   │   ├── payroll.controller.ts
│   │   │   │   └── performance.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── employee.service.ts
│   │   │   │   ├── attendance.service.ts
│   │   │   │   ├── leave.service.ts
│   │   │   │   ├── payroll.service.ts
│   │   │   │   └── performance.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── projects/
│   │   │   ├── projects.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── project.controller.ts
│   │   │   │   ├── task.controller.ts
│   │   │   │   ├── document.controller.ts
│   │   │   │   ├── design.controller.ts
│   │   │   │   └── timesheet.controller.ts
│   │   │   ├── services/
│   │   │   └── dto/
│   │   │
│   │   ├── finance/
│   │   │   ├── finance.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── quotation.controller.ts
│   │   │   │   ├── invoice.controller.ts
│   │   │   │   ├── receipt.controller.ts
│   │   │   │   └── expense.controller.ts
│   │   │   ├── services/
│   │   │   └── dto/
│   │   │
│   │   ├── crm/
│   │   │   ├── crm.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── client.controller.ts
│   │   │   │   ├── lead.controller.ts
│   │   │   │   ├── contract.controller.ts
│   │   │   │   └── support-ticket.controller.ts
│   │   │   ├── services/
│   │   │   └── dto/
│   │   │
│   │   ├── chat/
│   │   │   ├── chat.module.ts
│   │   │   ├── chat.gateway.ts          # WebSocket Gateway
│   │   │   ├── chat.controller.ts
│   │   │   ├── chat.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── notifications/
│   │   │   ├── notifications.module.ts
│   │   │   ├── notifications.gateway.ts
│   │   │   ├── notifications.service.ts
│   │   │   └── notifications.processor.ts  # BullMQ
│   │   │
│   │   ├── files/
│   │   │   ├── files.module.ts
│   │   │   ├── files.controller.ts
│   │   │   └── files.service.ts        # MinIO/S3
│   │   │
│   │   ├── wiki/
│   │   │   ├── wiki.module.ts
│   │   │   ├── wiki.controller.ts
│   │   │   └── wiki.service.ts
│   │   │
│   │   └── reports/
│   │       ├── reports.module.ts
│   │       ├── reports.controller.ts
│   │       └── reports.service.ts
│   │
│   └── prisma/
│       ├── schema.prisma
│       ├── migrations/
│       └── seed.ts
│
├── test/
├── docker-compose.yml
├── Dockerfile
├── nest-cli.json
├── tsconfig.json
└── package.json
```

---

## 5. ระบบ Authentication & Authorization

### 5.1 Authentication Flow

```
┌──────────┐     POST /auth/login      ┌──────────┐
│  Client   │ ──────────────────────►   │  Server  │
│  (Next.js)│     { email, password }   │ (NestJS) │
│           │ ◄──────────────────────   │          │
│           │  { accessToken,           │          │
│           │    refreshToken }          │          │
└──────────┘                            └──────────┘
     │
     │  accessToken → httpOnly cookie (15 นาที)
     │  refreshToken → httpOnly cookie (7 วัน)
     │
     ▼
  ทุก Request แนบ Authorization: Bearer <accessToken>
  หมดอายุ → POST /auth/refresh ด้วย refreshToken
```

### 5.2 Role-Based Access Control (RBAC)

```typescript
// Permission Matrix
enum Permission {
  // HR
  HR_VIEW_EMPLOYEES    = 'hr:employees:view',
  HR_MANAGE_EMPLOYEES  = 'hr:employees:manage',
  HR_VIEW_PAYROLL      = 'hr:payroll:view',
  HR_MANAGE_PAYROLL    = 'hr:payroll:manage',
  HR_APPROVE_LEAVE     = 'hr:leave:approve',

  // Projects
  PROJECT_CREATE       = 'project:create',
  PROJECT_VIEW_ALL     = 'project:view:all',
  PROJECT_VIEW_OWN     = 'project:view:own',
  PROJECT_MANAGE       = 'project:manage',
  TASK_CREATE          = 'task:create',
  TASK_ASSIGN          = 'task:assign',
  TASK_UPDATE_OWN      = 'task:update:own',

  // Finance
  FINANCE_VIEW         = 'finance:view',
  FINANCE_MANAGE       = 'finance:manage',
  QUOTATION_CREATE     = 'finance:quotation:create',
  QUOTATION_APPROVE    = 'finance:quotation:approve',
  INVOICE_CREATE       = 'finance:invoice:create',

  // CRM
  CRM_VIEW_CLIENTS     = 'crm:clients:view',
  CRM_MANAGE_CLIENTS   = 'crm:clients:manage',
  CRM_VIEW_LEADS       = 'crm:leads:view',
  CRM_MANAGE_LEADS     = 'crm:leads:manage',

  // Chat
  CHAT_CREATE_CHANNEL  = 'chat:channel:create',
  CHAT_MANAGE_CHANNEL  = 'chat:channel:manage',

  // Reports
  REPORT_VIEW_ALL      = 'report:view:all',
  REPORT_VIEW_TEAM     = 'report:view:team',

  // Admin
  ADMIN_SETTINGS       = 'admin:settings',
  ADMIN_ROLES          = 'admin:roles',
}
```

### 5.3 Permission per Role

| Permission | Super Admin | Admin/HR | PM | Developer | Designer | QA | Sales | Finance |
|-----------|:-----------:|:--------:|:--:|:---------:|:--------:|:--:|:-----:|:-------:|
| HR Manage | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| HR View | ✅ | ✅ | ✅ (ทีม) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Payroll | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Project Create | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Task Assign | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Task Update | ✅ | ✅ | ✅ | ✅ (ตัวเอง) | ✅ (ตัวเอง) | ✅ (ตัวเอง) | ❌ | ❌ |
| Finance All | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Quotation Create | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| CRM Manage | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Reports All | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Reports Team | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Admin Settings | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 6. Module 1: ระบบบริหารงานบุคคล (HR & People)

### 6.1 ฟีเจอร์หลัก

#### 6.1.1 จัดการข้อมูลพนักงาน (Employee Management)

**หน้าจอ:** `/hr/employees`

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Employee List | ตารางแสดงรายชื่อพนักงาน กรอง/ค้นหาได้ |
| Employee Profile | ข้อมูลส่วนตัว, ตำแหน่ง, แผนก, วันเริ่มงาน |
| Employee Status | Active / Probation / Resigned |
| Profile Photo | อัปโหลดรูปโปรไฟล์ |
| Emergency Contact | ข้อมูลผู้ติดต่อฉุกเฉิน |
| Department & Position | สังกัดแผนก (Dev, Design, QA, PM, Sales, Finance, Admin) |
| Skill Tags | แท็กทักษะ (React, Next.js, Figma, ฯลฯ) |

**Fields:**

```typescript
interface Employee {
  id: string;
  employeeCode: string;         // EMP-001
  firstName: string;
  lastName: string;
  firstNameTh: string;          // ชื่อภาษาไทย
  lastNameTh: string;
  nickname: string;
  email: string;
  phone: string;
  avatar: string;
  department: Department;
  position: string;
  role: UserRole;
  salary: number;               // เงินเดือนฐาน (เข้าถึงได้เฉพาะ HR/Admin)
  startDate: Date;
  probationEndDate: Date;
  status: 'active' | 'probation' | 'resigned';
  bankAccount: string;
  bankName: string;
  taxId: string;                // เลขประจำตัวผู้เสียภาษี
  socialSecurityId: string;     // เลขประกันสังคม
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### 6.1.2 ระบบลงเวลา (Attendance)

**หน้าจอ:** `/hr/attendance`

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Check-in / Check-out | กดลงเวลาเข้า-ออกงาน |
| Location Tracking | บันทึกพิกัด GPS (optional สำหรับ WFH) |
| Work From Home | เลือกโหมด Office / WFH |
| Daily Summary | สรุปเวลาทำงานประจำวัน |
| Monthly Report | รายงานการลงเวลารายเดือน |
| Late Alert | แจ้งเตือนเมื่อเข้าสาย |
| OT Request | ยื่นขอทำ OT |

**Business Rules:**
- เวลาทำงาน: 09:00 - 18:00 (กำหนดได้ในตั้งค่า)
- สาย: เข้าหลัง 09:15
- ขาด: ไม่ลงเวลาทั้งวัน (ไม่มีใบลา)
- OT: ต้องได้รับอนุมัติจาก PM/Admin

#### 6.1.3 ระบบลา (Leave Management)

**หน้าจอ:** `/hr/leave`

| ประเภทลา | จำนวน (วัน/ปี) | ต้องอนุมัติ |
|----------|----------------|-----------|
| ลาป่วย (Sick Leave) | 30 | ≤ 3 วันไม่ต้อง, > 3 วันต้องใบรับรองแพทย์ |
| ลาพักร้อน (Annual Leave) | 6-15 (ตามอายุงาน) | ✅ |
| ลากิจ (Personal Leave) | 3 | ✅ |
| ลาคลอด (Maternity) | 98 | ✅ |
| ลาบวช (Ordination) | 15 | ✅ |
| WFH | ไม่จำกัด | ✅ (PM) |

**Approval Flow:**

```
พนักงานยื่นลา → PM/หัวหน้าทีมอนุมัติ → HR รับทราบ → บันทึกในระบบ
                    ↓ (ถ้าปฏิเสธ)
              แจ้งเหตุผลกลับ
```

#### 6.1.4 ระบบเงินเดือน (Payroll)

**หน้าจอ:** `/hr/payroll`

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Salary Calculation | คำนวณเงินเดือนจาก attendance + leave + OT |
| Tax Calculation | คำนวณภาษีเงินได้บุคคลธรรมดา (ม.40(1)) |
| Social Security | หักประกันสังคม 5% (cap 750 บาท) |
| Payslip | สร้างสลิปเงินเดือน (PDF) |
| Payslip History | ประวัติสลิปเงินเดือน |
| Bonus / Deduction | บันทึกโบนัส / หักเงิน |

**สูตรคำนวณ:**

```
รายได้สุทธิ = เงินเดือนฐาน
            + OT (ชม. × อัตรา OT)
            + โบนัส/ค่าตอบแทนพิเศษ
            - หักขาด/สาย
            - ประกันสังคม (5% max 750)
            - ภาษีเงินได้หัก ณ ที่จ่าย
            - หักอื่น ๆ
```

#### 6.1.5 ประเมินผลงาน (Performance Review)

**หน้าจอ:** `/hr/performance`

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| KPI Setting | ตั้ง KPI รายไตรมาส |
| Self Assessment | พนักงานประเมินตนเอง |
| Manager Review | หัวหน้าประเมิน |
| Peer Review | เพื่อนร่วมงานประเมิน (optional) |
| Score & Rating | คะแนน 1-5 ดาว |
| Review History | ประวัติการประเมิน |
| Development Plan | แผนพัฒนาตัวเอง |

---

## 7. Module 2: ระบบบริหารโปรเจกต์ (Project Management)

### 7.1 ฟีเจอร์หลัก

#### 7.1.1 จัดการโปรเจกต์ (Project CRUD)

**หน้าจอ:** `/projects`

```typescript
interface Project {
  id: string;
  code: string;                  // PRJ-2026-001
  name: string;
  description: string;
  clientId: string;              // เชื่อมกับ CRM
  type: 'website' | 'web_app' | 'mobile_app' | 'maintenance' | 'other';
  status: 'draft' | 'proposal' | 'in_progress' | 'on_hold'
        | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: Date;
  deadline: Date;
  budget: number;                // งบประมาณ
  actualCost: number;            // ค่าใช้จ่ายจริง
  progress: number;              // 0-100%
  managerId: string;             // PM
  members: ProjectMember[];
  techStack: string[];           // Next.js, React, Node.js ...
  repository: string;            // Git URL
  stagingUrl: string;
  productionUrl: string;
  phases: ProjectPhase[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectPhase {
  id: string;
  name: string;                  // Discovery, Design, Development, Testing, Launch
  order: number;
  status: 'pending' | 'in_progress' | 'completed';
  startDate: Date;
  endDate: Date;
  deliverables: string[];
}

interface ProjectMember {
  userId: string;
  role: 'pm' | 'lead_dev' | 'developer' | 'designer' | 'qa' | 'account';
  assignedAt: Date;
  allocatedHours: number;        // ชั่วโมงที่จัดสรร
}
```

**Project Phases (ขั้นตอนมาตรฐาน):**

```
1. Discovery & Planning  → ประชุมลูกค้า, Requirement Gathering
2. UI/UX Design          → Wireframe, Mockup, Prototype
3. Design Review         → ลูกค้า Approve Design
4. Frontend Development  → HTML/CSS/React
5. Backend Development   → API, Database, Business Logic
6. Integration           → เชื่อมต่อ Frontend + Backend
7. QA Testing            → ทดสอบ, Bug Fix
8. UAT                   → ลูกค้าทดสอบ
9. Launch / Go Live      → Deploy Production
10. Warranty             → แก้ไขหลัง Launch (ตามสัญญา)
```

#### 7.1.2 Task Management

**หน้าจอ:** `/projects/[id]/board` (Kanban) หรือ `/projects/[id]/tasks` (List)

```typescript
interface Task {
  id: string;
  projectId: string;
  parentTaskId?: string;         // Sub-task
  title: string;
  description: string;           // Rich Text (TipTap)
  type: 'feature' | 'bug' | 'improvement' | 'design' | 'devops' | 'meeting';
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'testing' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId: string;
  reporterId: string;
  phase: string;
  estimatedHours: number;
  actualHours: number;
  startDate?: Date;
  dueDate?: Date;
  completedAt?: Date;
  tags: string[];
  attachments: Attachment[];
  comments: Comment[];
  order: number;                 // สำหรับ Drag & Drop
  createdAt: Date;
  updatedAt: Date;
}
```

**Kanban Board Columns:**

```
┌──────────┬──────────┬─────────────┬──────────┬──────────┬────────┐
│ Backlog  │   Todo   │ In Progress │  Review  │ Testing  │  Done  │
├──────────┼──────────┼─────────────┼──────────┼──────────┼────────┤
│ [Card]   │ [Card]   │ [Card]      │ [Card]   │ [Card]   │ [Card] │
│ [Card]   │ [Card]   │ [Card]      │          │          │ [Card] │
│          │          │             │          │          │        │
└──────────┴──────────┴─────────────┴──────────┴──────────┴────────┘
```

**Task Card แสดง:** ชื่อ Task, Assignee Avatar, Priority, Due Date, Tags, Sub-task Count

#### 7.1.3 Timesheet

**หน้าจอ:** `/projects/[id]/timesheet`

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Log Time | บันทึกเวลาทำงานต่อ Task |
| Timer | จับเวลาแบบ Start/Stop |
| Manual Entry | กรอกเวลาย้อนหลัง |
| Weekly View | ดูรายสัปดาห์ |
| Report by Project | รายงานเวลาตามโปรเจกต์ |
| Report by Person | รายงานเวลาตามคน |
| Billable Hours | ชั่วโมงที่คิดเงินลูกค้าได้ |

#### 7.1.4 ระบบจัดการเอกสาร (Document Management)

**หน้าจอ:** `/projects/[id]/documents`

```typescript
interface Document {
  id: string;
  projectId: string;
  title: string;
  category: 'proposal' | 'requirement' | 'specification' | 'meeting_note'
           | 'manual' | 'contract' | 'design_brief' | 'test_plan' | 'other';
  fileUrl: string;
  fileType: string;              // pdf, docx, xlsx, ...
  fileSize: number;
  version: number;               // Version Control
  uploadedBy: string;
  tags: string[];
  status: 'draft' | 'review' | 'approved' | 'archived';
  approvedBy?: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
```

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Upload Files | อัปโหลดไฟล์ทุกประเภท |
| Folder Structure | จัดโฟลเดอร์ตามหมวดหมู่ |
| Version History | ดูประวัติเวอร์ชัน |
| Preview | ดูตัวอย่างไฟล์ (PDF, Image) |
| Download | ดาวน์โหลดไฟล์ |
| Search | ค้นหาเอกสาร |
| Access Control | กำหนดสิทธิ์เข้าถึงต่อโปรเจกต์ |
| Template Library | เก็บ Template เอกสาร (Proposal, NDA, Contract ฯลฯ) |

#### 7.1.5 ระบบ Design & Asset

**หน้าจอ:** `/projects/[id]/designs`

```typescript
interface DesignAsset {
  id: string;
  projectId: string;
  title: string;
  type: 'wireframe' | 'mockup' | 'prototype' | 'icon' | 'illustration'
      | 'logo' | 'banner' | 'ui_kit' | 'style_guide';
  fileUrl: string;
  thumbnailUrl: string;          // Auto-generated thumbnail
  figmaUrl?: string;             // Figma link
  version: number;
  status: 'draft' | 'internal_review' | 'client_review'
        | 'revision' | 'approved' | 'final';
  designerId: string;
  feedbacks: DesignFeedback[];
  createdAt: Date;
  updatedAt: Date;
}

interface DesignFeedback {
  id: string;
  designAssetId: string;
  userId: string;
  comment: string;
  positionX?: number;            // พิกัดบน Design สำหรับ Pin Comment
  positionY?: number;
  status: 'open' | 'resolved';
  createdAt: Date;
}
```

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Upload Design | อัปโหลดไฟล์ Design (PNG, PSD, Figma link) |
| Image Gallery | แกลลอรี่แสดง Design ทั้งหมด |
| Version Compare | เทียบเวอร์ชัน Design |
| Pin Comment | คอมเมนต์บนจุดเฉพาะของ Design |
| Approval Flow | Designer → PM Review → Client Approve |
| Brand Assets | เก็บ Logo, Font, Color Palette ของลูกค้า |
| Auto Thumbnail | สร้าง Thumbnail อัตโนมัติ |
| Download Original | ดาวน์โหลดไฟล์ต้นฉบับ |

#### 7.1.6 Dev & Technical

**หน้าจอ:** `/projects/[id]/git`

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Git Repository Link | เชื่อมกับ GitHub/GitLab |
| Recent Commits | แสดง Commit ล่าสุด (ผ่าน GitHub API) |
| Branch Info | แสดง Branch ที่ active |
| Deployment Status | สถานะ Staging / Production |
| Server Info | ข้อมูล Server, Domain, SSL ของโปรเจกต์นั้น |
| Environment Variables | เก็บ Env (encrypted) |
| Uptime Monitor | เช็คสถานะเว็บลูกค้า |
| Changelog | บันทึกการเปลี่ยนแปลง |

---

## 8. Module 3: ระบบการเงินและบัญชี (Finance & Accounting)

### 8.1 ใบเสนอราคา (Quotation)

**หน้าจอ:** `/finance/quotations`

```typescript
interface Quotation {
  id: string;
  quotationNumber: string;       // QT-2026-0001
  clientId: string;
  projectId?: string;
  title: string;
  description: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  discountType: 'fixed' | 'percentage';
  vatRate: number;               // 7%
  vat: number;
  withholdingTax: number;        // หัก ณ ที่จ่าย
  total: number;
  status: 'draft' | 'sent' | 'viewed' | 'accepted'
        | 'rejected' | 'expired' | 'revised';
  validUntil: Date;              // ใช้ได้ถึงวันที่
  notes: string;
  terms: string;                 // เงื่อนไข
  paymentTerms: string;          // เช่น 50/50, 30/40/30
  createdBy: string;
  approvedBy?: string;
  sentAt?: Date;
  pdfUrl?: string;               // Auto-generated PDF
  createdAt: Date;
  updatedAt: Date;
}

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;                  // หน้า, ระบบ, ชั่วโมง
  unitPrice: number;
  total: number;
}
```

**Quotation Workflow:**

```
สร้าง Draft → PM/Admin Review → อนุมัติ → ส่งลูกค้า (PDF/Email)
                                              ↓
                                    ลูกค้า Accept → สร้างโปรเจกต์ + Contract
                                    ลูกค้า Reject → แก้ไข / Revise
```

### 8.2 ใบแจ้งหนี้ (Invoice)

**หน้าจอ:** `/finance/invoices`

```typescript
interface Invoice {
  id: string;
  invoiceNumber: string;          // INV-2026-0001
  quotationId?: string;
  projectId: string;
  clientId: string;
  items: InvoiceItem[];
  subtotal: number;
  vat: number;
  withholdingTax: number;
  total: number;
  status: 'draft' | 'sent' | 'viewed' | 'paid'
        | 'partially_paid' | 'overdue' | 'cancelled';
  issueDate: Date;
  dueDate: Date;
  paidAmount: number;
  paidAt?: Date;
  paymentMethod?: 'bank_transfer' | 'credit_card' | 'cash' | 'cheque';
  paymentProofUrl?: string;       // หลักฐานการโอน
  phase: string;                  // งวดที่ 1, 2, 3
  notes: string;
  pdfUrl?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Payment Schedule (ตัวอย่าง):**

```
โปรเจกต์ 300,000 บาท → แบ่ง 3 งวด:
  งวด 1: 30% = 90,000 (หลัง Sign Contract)
  งวด 2: 40% = 120,000 (หลัง Design Approve)
  งวด 3: 30% = 90,000 (หลัง Go Live)
```

### 8.3 ใบเสร็จรับเงิน (Receipt)

**หน้าจอ:** `/finance/receipts`

- สร้างอัตโนมัติเมื่อยืนยันรับเงินจาก Invoice
- รองรับใบกำกับภาษี
- Export PDF พร้อมลายเซ็นดิจิทัล

### 8.4 ค่าใช้จ่าย (Expense)

**หน้าจอ:** `/finance/expenses`

```typescript
interface Expense {
  id: string;
  projectId?: string;            // ผูกโปรเจกต์ (ถ้ามี)
  category: 'software' | 'hardware' | 'hosting' | 'domain'
          | 'freelancer' | 'travel' | 'office' | 'marketing' | 'other';
  title: string;
  amount: number;
  receiptUrl?: string;           // รูปใบเสร็จ
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  requestedBy: string;
  approvedBy?: string;
  date: Date;
  notes: string;
  isRecurring: boolean;          // ค่าใช้จ่ายรายเดือน (hosting, SaaS)
  createdAt: Date;
}
```

### 8.5 รายงานการเงิน

| รายงาน | รายละเอียด |
|--------|-----------|
| Revenue Report | รายรับรายเดือน/ไตรมาส/ปี |
| Expense Report | รายจ่ายแยกตามหมวด |
| Profit/Loss by Project | กำไร-ขาดทุนต่อโปรเจกต์ |
| Outstanding Invoices | ใบแจ้งหนี้ค้างชำระ |
| Cash Flow | กระแสเงินสดรายเดือน |
| Tax Summary | สรุปภาษี (VAT, WHT) |

---

## 9. Module 4: ระบบบริหารลูกค้า (CRM & Sales)

### 9.1 ข้อมูลลูกค้า (Client Management)

**หน้าจอ:** `/crm/clients`

```typescript
interface Client {
  id: string;
  clientCode: string;             // CLT-001
  companyName: string;
  companyNameTh: string;
  industry: string;
  website: string;
  taxId: string;                  // เลขประจำตัวผู้เสียภาษี
  address: string;
  contacts: ClientContact[];      // ผู้ติดต่อหลายคน
  status: 'prospect' | 'active' | 'inactive' | 'churned';
  source: 'referral' | 'website' | 'social_media' | 'event' | 'cold_call' | 'other';
  totalRevenue: number;           // รายได้รวมจากลูกค้าคนนี้
  projectCount: number;
  notes: string;
  tags: string[];
  assignedTo: string;             // Sales/Account ที่ดูแล
  createdAt: Date;
  updatedAt: Date;
}

interface ClientContact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  lineId?: string;
  isPrimary: boolean;
}
```

### 9.2 Sales Pipeline (Lead Management)

**หน้าจอ:** `/crm/leads`

```
Pipeline Stages (Kanban):
┌───────────┬────────────┬───────────┬──────────────┬────────────┬─────────┐
│  New Lead │ Contacted  │ Proposal  │ Negotiation  │  Closed    │  Lost   │
│           │            │  Sent     │              │  Won ✅    │   ❌    │
├───────────┼────────────┼───────────┼──────────────┼────────────┼─────────┤
│ [Lead]    │ [Lead]     │ [Lead]    │ [Lead]       │ [Lead]     │ [Lead]  │
└───────────┴────────────┴───────────┴──────────────┴────────────┴─────────┘
```

```typescript
interface Lead {
  id: string;
  title: string;                  // ชื่องาน/โปรเจกต์ที่เสนอ
  clientId?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  stage: 'new' | 'contacted' | 'proposal_sent' | 'negotiation'
       | 'closed_won' | 'closed_lost';
  estimatedValue: number;         // มูลค่าประมาณ
  probability: number;            // % โอกาสปิดดีล
  source: string;
  assignedTo: string;
  expectedCloseDate: Date;
  lostReason?: string;
  activities: LeadActivity[];     // ประวัติการติดต่อ
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

interface LeadActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'line_message' | 'note';
  description: string;
  date: Date;
  createdBy: string;
}
```

### 9.3 สัญญา (Contract Management)

**หน้าจอ:** `/crm/contracts`

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Contract Template | เทมเพลตสัญญามาตรฐาน |
| Contract Details | เลขสัญญา, มูลค่า, ระยะเวลา, เงื่อนไข |
| Digital Sign | ลงนามออนไลน์ (หรือ Upload สัญญาที่เซ็นแล้ว) |
| Expiry Alert | แจ้งเตือนก่อนสัญญาหมดอายุ |
| Renewal Tracking | ติดตามการต่อสัญญา |
| Warranty/SLA | ระยะ Warranty หลัง Go Live |

### 9.4 Support Ticket

**หน้าจอ:** `/crm/support`

```typescript
interface SupportTicket {
  id: string;
  ticketNumber: string;           // TK-2026-0001
  projectId: string;
  clientId: string;
  title: string;
  description: string;
  category: 'bug' | 'feature_request' | 'change_request'
          | 'question' | 'maintenance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'waiting_client'
        | 'resolved' | 'closed';
  assigneeId: string;
  isWarranty: boolean;            // อยู่ในช่วง Warranty หรือไม่
  isBillable: boolean;            // คิดเงินหรือไม่
  estimatedHours: number;
  actualHours: number;
  resolvedAt?: Date;
  slaDeadline?: Date;
  comments: Comment[];
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 10. Module 5: ระบบสื่อสารภายใน (Communication)

### 10.1 Team Chat

**หน้าจอ:** `/chat`

```typescript
interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'direct' | 'project';
  projectId?: string;             // Auto-create channel เมื่อสร้างโปรเจกต์
  members: string[];
  description: string;
  createdBy: string;
  lastMessageAt: Date;
  createdAt: Date;
}

interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;                // Rich text
  type: 'text' | 'file' | 'image' | 'system';
  attachments: Attachment[];
  replyToId?: string;             // Reply to message
  reactions: MessageReaction[];
  isEdited: boolean;
  isPinned: boolean;
  readBy: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Public Channels | ห้องสาธารณะ (#general, #random, #dev-talk) |
| Project Channels | สร้างอัตโนมัติต่อโปรเจกต์ |
| Direct Messages | แชทส่วนตัว 1:1 |
| Group DM | แชทกลุ่มย่อย |
| File Sharing | ส่งไฟล์/รูป |
| Emoji Reactions | React ข้อความ |
| Reply Thread | ตอบเป็น Thread |
| Pin Messages | ปักหมุดข้อความสำคัญ |
| Mention (@) | แท็กคน / @channel |
| Search | ค้นหาข้อความ |
| Unread Counter | แจ้งจำนวนข้อความที่ยังไม่อ่าน |
| Online Status | แสดงสถานะออนไลน์ |

**Real-time Architecture:**

```
Client (Socket.io) ←→ NestJS WebSocket Gateway ←→ Redis Pub/Sub
                                                       ↓
                                                   PostgreSQL
                                                 (Message Store)
```

### 10.2 ระบบประกาศ (Announcements)

**หน้าจอ:** `/announcements`

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Create Announcement | สร้างประกาศ (Admin/HR/PM) |
| Rich Content | รองรับ Rich Text + รูปภาพ |
| Pin/Unpin | ปักหมุดประกาศสำคัญ |
| Acknowledge | พนักงานกดรับทราบ |
| Category | แท็กหมวดหมู่ (บริษัท, HR, โปรเจกต์, สังสรรค์) |

### 10.3 Notification System

```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'task_assigned' | 'task_updated' | 'task_comment'
      | 'leave_approved' | 'leave_rejected'
      | 'invoice_paid' | 'invoice_overdue'
      | 'mention' | 'chat_message'
      | 'announcement' | 'deadline_reminder'
      | 'design_feedback' | 'support_ticket';
  title: string;
  message: string;
  link: string;                   // URL ไปยังหน้าที่เกี่ยวข้อง
  isRead: boolean;
  createdAt: Date;
}
```

**Notification Channels:**
- In-App (Real-time via WebSocket)
- Email (ผ่าน BullMQ → Nodemailer)
- LINE Notify (optional, phase 2)

### 10.4 Wiki / Knowledge Base

**หน้าจอ:** `/wiki`

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Create Article | เขียนบทความด้วย Rich Text Editor |
| Categories | หมวดหมู่ (Onboarding, Tech Guide, Process, FAQ) |
| Search | ค้นหาบทความ |
| Version History | ประวัติการแก้ไข |
| Bookmark | บุ๊คมาร์คบทความ |
| Permission | กำหนดสิทธิ์การเข้าถึง |

---

## 11. Module 6: ระบบ Dashboard & Reporting

### 11.1 Main Dashboard

**หน้าจอ:** `/` (หน้าแรกหลัง Login)

#### สำหรับ Management / Admin:

```
┌─────────────────────────────────────────────────────────────┐
│                   Company Dashboard                          │
├────────────────┬────────────────┬────────────────┬──────────┤
│ 💰 Revenue     │ 📋 Active      │ 👥 Employees   │ 📈 New   │
│ This Month     │ Projects       │ Present Today  │ Leads    │
│ ฿ 850,000     │ 8              │ 18/20          │ 5        │
├────────────────┴────────────────┴────────────────┴──────────┤
│                                                              │
│  📊 Revenue Chart (Monthly)          🥧 Revenue by Client   │
│  ┌─────────────────────────┐        ┌───────────────────┐   │
│  │     Bar / Line Chart    │        │    Pie Chart       │   │
│  │                         │        │                    │   │
│  └─────────────────────────┘        └───────────────────┘   │
│                                                              │
│  📋 Project Status Overview          ⏰ Upcoming Deadlines  │
│  ┌─────────────────────────┐        ┌───────────────────┐   │
│  │ In Progress: 5          │        │ PRJ-001  Mar 15   │   │
│  │ On Hold: 1              │        │ PRJ-003  Mar 20   │   │
│  │ Review/UAT: 2           │        │ PRJ-007  Apr 01   │   │
│  └─────────────────────────┘        └───────────────────┘   │
│                                                              │
│  💳 Outstanding Invoices             👥 Team Utilization     │
│  ┌─────────────────────────┐        ┌───────────────────┐   │
│  │ Total: ฿ 450,000       │        │ Dev Team: 85%     │   │
│  │ Overdue: ฿ 120,000     │        │ Design: 70%       │   │
│  │ Due This Week: ฿ 80,000│        │ QA: 60%           │   │
│  └─────────────────────────┘        └───────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### สำหรับ PM:

| Widget | แสดง |
|--------|------|
| My Projects | โปรเจกต์ที่รับผิดชอบ + สถานะ |
| Team Tasks | Task ของทีมทั้งหมด (สรุป status) |
| Overdue Tasks | Task ที่เลยกำหนด |
| Upcoming Deadlines | Milestone ที่ใกล้ถึง |
| Team Workload | ภาระงานของสมาชิก |
| Recent Activity | Activity Feed |

#### สำหรับ Developer / Designer / QA:

| Widget | แสดง |
|--------|------|
| My Tasks | Task ที่ได้รับมอบหมาย |
| Today's Schedule | ตารางวันนี้ |
| Check-in Status | สถานะลงเวลา |
| Recent Notifications | แจ้งเตือนล่าสุด |
| My Timesheet | ชั่วโมงทำงานสัปดาห์นี้ |

### 11.2 รายงานหลัก (Reports)

**หน้าจอ:** `/reports`

| รายงาน | รายละเอียด | ใครดูได้ |
|--------|-----------|---------|
| **Project Summary** | สรุปโปรเจกต์ทั้งหมด (สถานะ, งบ, timeline) | Admin, PM |
| **Revenue Report** | รายรับรายเดือน/ไตรมาส เทียบกับเป้า | Admin, Finance |
| **Profit per Project** | กำไรต่อโปรเจกต์ (รายรับ - ต้นทุน man-hours) | Admin, Finance |
| **Employee Utilization** | % ชั่วโมงทำงานจริง vs capacity | Admin, PM |
| **Task Completion Rate** | อัตราทำ Task เสร็จตาม deadline | Admin, PM |
| **Client Report** | รายงานลูกค้า (Revenue, จำนวนโปรเจกต์) | Admin, Sales |
| **Leave Summary** | สรุปวันลาพนักงานทั้งหมด | Admin, HR |
| **Attendance Report** | รายงานการลงเวลา | Admin, HR |
| **Overdue Invoices** | ใบแจ้งหนี้เลยกำหนด | Admin, Finance |
| **Sales Pipeline** | สรุป Lead + Conversion Rate | Admin, Sales |

**Export Options:** PDF, Excel (.xlsx), CSV

---

## 12. Database Schema

### 12.1 ERD Overview (ตารางหลัก)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    users      │────▶│  employees   │     │   clients     │
└──────┬───────┘     └──────────────┘     └──────┬───────┘
       │                                          │
       │  ┌──────────────┐     ┌──────────────┐  │
       ├─▶│  attendance  │     │    leads      │◀─┤
       │  └──────────────┘     └──────────────┘  │
       │                                          │
       │  ┌──────────────┐     ┌──────────────┐  │
       ├─▶│    leaves     │     │  contracts    │◀─┤
       │  └──────────────┘     └──────────────┘  │
       │                                          │
       │  ┌──────────────┐     ┌──────────────┐  │
       ├─▶│   projects   │────▶│  quotations   │◀─┘
       │  └──────┬───────┘     └──────────────┘
       │         │
       │         ├─▶ tasks
       │         ├─▶ project_members
       │         ├─▶ documents
       │         ├─▶ design_assets
       │         ├─▶ timesheets
       │         ├─▶ invoices
       │         └─▶ support_tickets
       │
       ├─▶ channels ──▶ messages
       ├─▶ notifications
       └─▶ wiki_articles
```

### 12.2 Prisma Schema (หลัก)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── AUTH & USER ───

enum UserRole {
  SUPER_ADMIN
  ADMIN
  HR
  PM
  DEVELOPER
  DESIGNER
  QA
  SALES
  FINANCE
}

enum EmployeeStatus {
  ACTIVE
  PROBATION
  RESIGNED
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String
  refreshToken  String?
  isActive      Boolean   @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  employee      Employee?
  notifications Notification[]
  messages      Message[]
  activities    ActivityLog[]
}

model Employee {
  id                String          @id @default(uuid())
  userId            String          @unique
  employeeCode      String          @unique   // EMP-001
  firstName         String
  lastName          String
  firstNameTh       String?
  lastNameTh        String?
  nickname          String?
  phone             String?
  avatar            String?
  department        String
  position          String
  role              UserRole
  salary            Decimal         @db.Decimal(12, 2)
  startDate         DateTime
  probationEndDate  DateTime?
  status            EmployeeStatus  @default(ACTIVE)
  bankAccount       String?
  bankName          String?
  taxId             String?
  socialSecurityId  String?
  address           String?
  emergencyName     String?
  emergencyPhone    String?
  emergencyRelation String?
  skills            String[]
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  user              User            @relation(fields: [userId], references: [id])
  attendances       Attendance[]
  leaveRequests     LeaveRequest[]
  payrolls          Payroll[]
  projectMembers    ProjectMember[]
  tasksAssigned     Task[]          @relation("TaskAssignee")
  tasksReported     Task[]          @relation("TaskReporter")
  timesheets        Timesheet[]
  designAssets      DesignAsset[]
  performanceReviews PerformanceReview[]
}

// ─── HR MODULE ───

model Attendance {
  id          String    @id @default(uuid())
  employeeId  String
  date        DateTime  @db.Date
  checkIn     DateTime?
  checkOut    DateTime?
  workMode    String    @default("office") // office, wfh
  location    String?   // GPS coordinates
  totalHours  Decimal?  @db.Decimal(4, 2)
  otHours     Decimal?  @db.Decimal(4, 2)
  status      String    @default("present") // present, late, absent, leave, holiday
  notes       String?
  createdAt   DateTime  @default(now())

  employee    Employee  @relation(fields: [employeeId], references: [id])

  @@unique([employeeId, date])
}

model LeaveRequest {
  id          String   @id @default(uuid())
  employeeId  String
  type        String   // sick, annual, personal, maternity, ordination, wfh
  startDate   DateTime @db.Date
  endDate     DateTime @db.Date
  totalDays   Decimal  @db.Decimal(3, 1)
  reason      String
  status      String   @default("pending") // pending, approved, rejected, cancelled
  approvedBy  String?
  approvedAt  DateTime?
  rejectReason String?
  attachment  String?  // ใบรับรองแพทย์
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  employee    Employee @relation(fields: [employeeId], references: [id])
}

model Payroll {
  id              String   @id @default(uuid())
  employeeId      String
  month           Int
  year            Int
  baseSalary      Decimal  @db.Decimal(12, 2)
  otAmount        Decimal  @default(0) @db.Decimal(12, 2)
  bonus           Decimal  @default(0) @db.Decimal(12, 2)
  deduction       Decimal  @default(0) @db.Decimal(12, 2)
  socialSecurity  Decimal  @default(0) @db.Decimal(12, 2)
  tax             Decimal  @default(0) @db.Decimal(12, 2)
  netSalary       Decimal  @db.Decimal(12, 2)
  status          String   @default("draft") // draft, calculated, approved, paid
  paidAt          DateTime?
  payslipUrl      String?
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  employee        Employee @relation(fields: [employeeId], references: [id])

  @@unique([employeeId, month, year])
}

model PerformanceReview {
  id            String   @id @default(uuid())
  employeeId    String
  reviewerId    String
  period        String   // Q1-2026, Q2-2026
  selfScore     Decimal? @db.Decimal(3, 2)
  managerScore  Decimal? @db.Decimal(3, 2)
  finalScore    Decimal? @db.Decimal(3, 2)
  strengths     String?
  improvements  String?
  goals         String?
  status        String   @default("pending") // pending, self_review, manager_review, completed
  completedAt   DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  employee      Employee @relation(fields: [employeeId], references: [id])
}

// ─── PROJECT MODULE ───

enum ProjectStatus {
  DRAFT
  PROPOSAL
  IN_PROGRESS
  ON_HOLD
  REVIEW
  COMPLETED
  CANCELLED
}

model Project {
  id              String        @id @default(uuid())
  code            String        @unique // PRJ-2026-001
  name            String
  description     String?
  clientId        String
  type            String        // website, web_app, mobile_app, maintenance
  status          ProjectStatus @default(DRAFT)
  priority        String        @default("medium")
  startDate       DateTime?
  deadline        DateTime?
  budget          Decimal?      @db.Decimal(14, 2)
  actualCost      Decimal?      @db.Decimal(14, 2)
  progress        Int           @default(0) // 0-100
  managerId       String
  repository      String?
  stagingUrl      String?
  productionUrl   String?
  techStack       String[]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  client          Client        @relation(fields: [clientId], references: [id])
  members         ProjectMember[]
  phases          ProjectPhase[]
  tasks           Task[]
  documents       Document[]
  designAssets    DesignAsset[]
  timesheets      Timesheet[]
  quotations      Quotation[]
  invoices        Invoice[]
  expenses        Expense[]
  supportTickets  SupportTicket[]
  channel         Channel?
}

model ProjectMember {
  id              String   @id @default(uuid())
  projectId       String
  employeeId      String
  role            String   // pm, lead_dev, developer, designer, qa, account
  allocatedHours  Int?
  assignedAt      DateTime @default(now())

  project         Project  @relation(fields: [projectId], references: [id])
  employee        Employee @relation(fields: [employeeId], references: [id])

  @@unique([projectId, employeeId])
}

model ProjectPhase {
  id            String   @id @default(uuid())
  projectId     String
  name          String
  orderIndex    Int
  status        String   @default("pending")
  startDate     DateTime?
  endDate       DateTime?
  deliverables  String[]
  createdAt     DateTime @default(now())

  project       Project  @relation(fields: [projectId], references: [id])
}

model Task {
  id              String    @id @default(uuid())
  projectId       String
  parentTaskId    String?
  title           String
  description     String?
  type            String    @default("feature")
  status          String    @default("backlog")
  priority        String    @default("medium")
  assigneeId      String?
  reporterId      String
  phase           String?
  estimatedHours  Decimal?  @db.Decimal(6, 2)
  actualHours     Decimal?  @db.Decimal(6, 2)
  startDate       DateTime?
  dueDate         DateTime?
  completedAt     DateTime?
  tags            String[]
  orderIndex      Int       @default(0)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  project         Project   @relation(fields: [projectId], references: [id])
  assignee        Employee? @relation("TaskAssignee", fields: [assigneeId], references: [id])
  reporter        Employee  @relation("TaskReporter", fields: [reporterId], references: [id])
  parentTask      Task?     @relation("SubTasks", fields: [parentTaskId], references: [id])
  subTasks        Task[]    @relation("SubTasks")
  comments        Comment[]
  attachments     Attachment[]
  timesheets      Timesheet[]
}

model Timesheet {
  id          String   @id @default(uuid())
  employeeId  String
  projectId   String
  taskId      String?
  date        DateTime @db.Date
  hours       Decimal  @db.Decimal(4, 2)
  description String?
  isBillable  Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  employee    Employee @relation(fields: [employeeId], references: [id])
  project     Project  @relation(fields: [projectId], references: [id])
  task        Task?    @relation(fields: [taskId], references: [id])
}

model Document {
  id          String   @id @default(uuid())
  projectId   String
  title       String
  category    String
  fileUrl     String
  fileType    String
  fileSize    Int
  version     Int      @default(1)
  uploadedBy  String
  tags        String[]
  status      String   @default("draft")
  approvedBy  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  project     Project  @relation(fields: [projectId], references: [id])
  comments    Comment[]
}

model DesignAsset {
  id            String           @id @default(uuid())
  projectId     String
  title         String
  type          String           // wireframe, mockup, prototype, etc.
  fileUrl       String
  thumbnailUrl  String?
  figmaUrl      String?
  version       Int              @default(1)
  status        String           @default("draft")
  designerId    String
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt

  project       Project          @relation(fields: [projectId], references: [id])
  designer      Employee         @relation(fields: [designerId], references: [id])
  feedbacks     DesignFeedback[]
}

model DesignFeedback {
  id              String      @id @default(uuid())
  designAssetId   String
  userId          String
  comment         String
  positionX       Float?
  positionY       Float?
  status          String      @default("open") // open, resolved
  createdAt       DateTime    @default(now())

  designAsset     DesignAsset @relation(fields: [designAssetId], references: [id])
}

// ─── FINANCE MODULE ───

model Quotation {
  id               String          @id @default(uuid())
  quotationNumber  String          @unique // QT-2026-0001
  clientId         String
  projectId        String?
  title            String
  description      String?
  items            Json            // QuotationItem[]
  subtotal         Decimal         @db.Decimal(14, 2)
  discount         Decimal         @default(0) @db.Decimal(14, 2)
  discountType     String          @default("fixed")
  vatRate          Decimal         @default(7) @db.Decimal(4, 2)
  vat              Decimal         @db.Decimal(14, 2)
  withholdingTax   Decimal         @default(0) @db.Decimal(14, 2)
  total            Decimal         @db.Decimal(14, 2)
  status           String          @default("draft")
  validUntil       DateTime
  notes            String?
  terms            String?
  paymentTerms     String?
  createdBy        String
  approvedBy       String?
  sentAt           DateTime?
  pdfUrl           String?
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt

  client           Client          @relation(fields: [clientId], references: [id])
  project          Project?        @relation(fields: [projectId], references: [id])
  invoices         Invoice[]
}

model Invoice {
  id               String    @id @default(uuid())
  invoiceNumber    String    @unique // INV-2026-0001
  quotationId      String?
  projectId        String
  clientId         String
  items            Json
  subtotal         Decimal   @db.Decimal(14, 2)
  vat              Decimal   @db.Decimal(14, 2)
  withholdingTax   Decimal   @default(0) @db.Decimal(14, 2)
  total            Decimal   @db.Decimal(14, 2)
  status           String    @default("draft")
  issueDate        DateTime
  dueDate          DateTime
  paidAmount       Decimal   @default(0) @db.Decimal(14, 2)
  paidAt           DateTime?
  paymentMethod    String?
  paymentProofUrl  String?
  phase            String?   // งวดที่
  notes            String?
  pdfUrl           String?
  createdBy        String
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  quotation        Quotation? @relation(fields: [quotationId], references: [id])
  project          Project    @relation(fields: [projectId], references: [id])
  client           Client     @relation(fields: [clientId], references: [id])
  receipt          Receipt?
}

model Receipt {
  id              String   @id @default(uuid())
  receiptNumber   String   @unique // RC-2026-0001
  invoiceId       String   @unique
  amount          Decimal  @db.Decimal(14, 2)
  vat             Decimal  @db.Decimal(14, 2)
  total           Decimal  @db.Decimal(14, 2)
  issueDate       DateTime
  pdfUrl          String?
  createdAt       DateTime @default(now())

  invoice         Invoice  @relation(fields: [invoiceId], references: [id])
}

model Expense {
  id            String   @id @default(uuid())
  projectId     String?
  category      String
  title         String
  amount        Decimal  @db.Decimal(14, 2)
  receiptUrl    String?
  status        String   @default("pending")
  requestedBy   String
  approvedBy    String?
  date          DateTime
  notes         String?
  isRecurring   Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  project       Project? @relation(fields: [projectId], references: [id])
}

// ─── CRM MODULE ───

model Client {
  id              String          @id @default(uuid())
  clientCode      String          @unique // CLT-001
  companyName     String
  companyNameTh   String?
  industry        String?
  website         String?
  taxId           String?
  address         String?
  status          String          @default("active")
  source          String?
  totalRevenue    Decimal         @default(0) @db.Decimal(14, 2)
  notes           String?
  tags            String[]
  assignedTo      String?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  contacts        ClientContact[]
  projects        Project[]
  quotations      Quotation[]
  invoices        Invoice[]
  leads           Lead[]
  contracts       Contract[]
  supportTickets  SupportTicket[]
}

model ClientContact {
  id        String  @id @default(uuid())
  clientId  String
  name      String
  position  String?
  email     String?
  phone     String?
  lineId    String?
  isPrimary Boolean @default(false)

  client    Client  @relation(fields: [clientId], references: [id])
}

model Lead {
  id                String         @id @default(uuid())
  title             String
  clientId          String?
  contactName       String
  contactEmail      String?
  contactPhone      String?
  stage             String         @default("new")
  estimatedValue    Decimal?       @db.Decimal(14, 2)
  probability       Int?
  source            String?
  assignedTo        String?
  expectedCloseDate DateTime?
  lostReason        String?
  notes             String?
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt

  client            Client?        @relation(fields: [clientId], references: [id])
  activities        LeadActivity[]
}

model LeadActivity {
  id          String   @id @default(uuid())
  leadId      String
  type        String   // call, email, meeting, line_message, note
  description String
  date        DateTime
  createdBy   String
  createdAt   DateTime @default(now())

  lead        Lead     @relation(fields: [leadId], references: [id])
}

model Contract {
  id              String    @id @default(uuid())
  contractNumber  String    @unique // CTR-2026-0001
  clientId        String
  projectId       String?
  title           String
  value           Decimal   @db.Decimal(14, 2)
  startDate       DateTime
  endDate         DateTime
  warrantyEndDate DateTime?
  status          String    @default("draft") // draft, active, expired, terminated
  fileUrl         String?
  signedAt        DateTime?
  notes           String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  client          Client    @relation(fields: [clientId], references: [id])
}

model SupportTicket {
  id              String    @id @default(uuid())
  ticketNumber    String    @unique // TK-2026-0001
  projectId       String
  clientId        String
  title           String
  description     String
  category        String
  priority        String    @default("medium")
  status          String    @default("open")
  assigneeId      String?
  isWarranty      Boolean   @default(false)
  isBillable      Boolean   @default(false)
  estimatedHours  Decimal?  @db.Decimal(6, 2)
  actualHours     Decimal?  @db.Decimal(6, 2)
  resolvedAt      DateTime?
  slaDeadline     DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  project         Project   @relation(fields: [projectId], references: [id])
  client          Client    @relation(fields: [clientId], references: [id])
  comments        Comment[]
  attachments     Attachment[]
}

// ─── COMMUNICATION MODULE ───

model Channel {
  id          String    @id @default(uuid())
  name        String
  type        String    // public, private, direct, project
  projectId   String?   @unique
  description String?
  createdBy   String
  lastMessageAt DateTime?
  createdAt   DateTime  @default(now())

  project     Project?  @relation(fields: [projectId], references: [id])
  members     ChannelMember[]
  messages    Message[]
}

model ChannelMember {
  id        String   @id @default(uuid())
  channelId String
  userId    String
  joinedAt  DateTime @default(now())

  channel   Channel  @relation(fields: [channelId], references: [id])

  @@unique([channelId, userId])
}

model Message {
  id          String    @id @default(uuid())
  channelId   String
  senderId    String
  content     String
  type        String    @default("text") // text, file, image, system
  replyToId   String?
  isEdited    Boolean   @default(false)
  isPinned    Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  channel     Channel   @relation(fields: [channelId], references: [id])
  sender      User      @relation(fields: [senderId], references: [id])
  replyTo     Message?  @relation("MessageReplies", fields: [replyToId], references: [id])
  replies     Message[] @relation("MessageReplies")
  attachments Attachment[]
  reactions   MessageReaction[]
}

model MessageReaction {
  id        String  @id @default(uuid())
  messageId String
  userId    String
  emoji     String

  message   Message @relation(fields: [messageId], references: [id])

  @@unique([messageId, userId, emoji])
}

// ─── NOTIFICATION ───

model Notification {
  id        String   @id @default(uuid())
  userId    String
  type      String
  title     String
  message   String
  link      String?
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
}

// ─── WIKI ───

model WikiArticle {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  content     String
  category    String
  authorId    String
  isPublished Boolean  @default(true)
  viewCount   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// ─── SHARED ───

model Comment {
  id              String         @id @default(uuid())
  content         String
  authorId        String
  taskId          String?
  documentId      String?
  supportTicketId String?
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  task            Task?          @relation(fields: [taskId], references: [id])
  document        Document?      @relation(fields: [documentId], references: [id])
  supportTicket   SupportTicket? @relation(fields: [supportTicketId], references: [id])
}

model Attachment {
  id              String         @id @default(uuid())
  fileName        String
  fileUrl         String
  fileType        String
  fileSize        Int
  taskId          String?
  messageId       String?
  supportTicketId String?
  uploadedBy      String
  createdAt       DateTime       @default(now())

  task            Task?          @relation(fields: [taskId], references: [id])
  message         Message?       @relation(fields: [messageId], references: [id])
  supportTicket   SupportTicket? @relation(fields: [supportTicketId], references: [id])
}

model ActivityLog {
  id          String   @id @default(uuid())
  userId      String
  action      String   // create, update, delete, login, logout
  entity      String   // project, task, invoice, ...
  entityId    String?
  metadata    Json?
  ipAddress   String?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
}

model AppSetting {
  id        String   @id @default(uuid())
  key       String   @unique
  value     Json
  updatedAt DateTime @updatedAt
}
```

---

## 13. API Endpoints

### 13.1 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh Token |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/forgot-password` | ลืมรหัสผ่าน |
| POST | `/api/auth/reset-password` | รีเซ็ตรหัสผ่าน |
| GET | `/api/auth/me` | ข้อมูล User ปัจจุบัน |

### 13.2 HR Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hr/employees` | รายชื่อพนักงานทั้งหมด |
| GET | `/api/hr/employees/:id` | รายละเอียดพนักงาน |
| POST | `/api/hr/employees` | เพิ่มพนักงาน |
| PATCH | `/api/hr/employees/:id` | แก้ไขพนักงาน |
| DELETE | `/api/hr/employees/:id` | ลบพนักงาน (soft delete) |
| POST | `/api/hr/attendance/check-in` | Check-in |
| POST | `/api/hr/attendance/check-out` | Check-out |
| GET | `/api/hr/attendance` | รายงาน Attendance |
| GET | `/api/hr/attendance/my` | Attendance ของตัวเอง |
| GET | `/api/hr/leaves` | รายการขอลาทั้งหมด |
| POST | `/api/hr/leaves` | ยื่นขอลา |
| PATCH | `/api/hr/leaves/:id/approve` | อนุมัติลา |
| PATCH | `/api/hr/leaves/:id/reject` | ปฏิเสธลา |
| GET | `/api/hr/leaves/balance` | วันลาคงเหลือ |
| GET | `/api/hr/payroll` | รายการเงินเดือน |
| POST | `/api/hr/payroll/calculate` | คำนวณเงินเดือนประจำเดือน |
| PATCH | `/api/hr/payroll/:id/approve` | อนุมัติจ่ายเงินเดือน |
| GET | `/api/hr/payroll/:id/payslip` | ดาวน์โหลด Payslip (PDF) |
| GET | `/api/hr/performance` | รายการประเมินผลงาน |
| POST | `/api/hr/performance` | สร้างรอบประเมิน |
| PATCH | `/api/hr/performance/:id` | อัปเดตคะแนน |

### 13.3 Project Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | รายการโปรเจกต์ |
| GET | `/api/projects/:id` | รายละเอียดโปรเจกต์ |
| POST | `/api/projects` | สร้างโปรเจกต์ |
| PATCH | `/api/projects/:id` | แก้ไขโปรเจกต์ |
| DELETE | `/api/projects/:id` | ลบโปรเจกต์ |
| POST | `/api/projects/:id/members` | เพิ่มสมาชิก |
| DELETE | `/api/projects/:id/members/:memberId` | ลบสมาชิก |
| GET | `/api/projects/:id/tasks` | Task ในโปรเจกต์ |
| POST | `/api/projects/:id/tasks` | สร้าง Task |
| PATCH | `/api/tasks/:id` | อัปเดต Task |
| PATCH | `/api/tasks/:id/status` | เปลี่ยนสถานะ Task |
| PATCH | `/api/tasks/reorder` | จัดลำดับ Task (Drag & Drop) |
| DELETE | `/api/tasks/:id` | ลบ Task |
| POST | `/api/tasks/:id/comments` | คอมเมนต์ใน Task |
| GET | `/api/projects/:id/documents` | เอกสารในโปรเจกต์ |
| POST | `/api/projects/:id/documents` | อัปโหลดเอกสาร |
| DELETE | `/api/documents/:id` | ลบเอกสาร |
| GET | `/api/projects/:id/designs` | Design Assets |
| POST | `/api/projects/:id/designs` | อัปโหลด Design |
| POST | `/api/designs/:id/feedback` | ให้ Feedback บน Design |
| PATCH | `/api/designs/:id/status` | เปลี่ยนสถานะ Design |
| GET | `/api/timesheets` | Timesheet ทั้งหมด |
| POST | `/api/timesheets` | บันทึกเวลาทำงาน |
| GET | `/api/timesheets/my` | Timesheet ของตัวเอง |

### 13.4 Finance Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/finance/quotations` | รายการใบเสนอราคา |
| POST | `/api/finance/quotations` | สร้างใบเสนอราคา |
| PATCH | `/api/finance/quotations/:id` | แก้ไข |
| PATCH | `/api/finance/quotations/:id/approve` | อนุมัติ |
| POST | `/api/finance/quotations/:id/send` | ส่งให้ลูกค้า |
| GET | `/api/finance/quotations/:id/pdf` | ดาวน์โหลด PDF |
| GET | `/api/finance/invoices` | รายการ Invoice |
| POST | `/api/finance/invoices` | สร้าง Invoice |
| PATCH | `/api/finance/invoices/:id` | แก้ไข |
| PATCH | `/api/finance/invoices/:id/payment` | บันทึกการชำระเงิน |
| GET | `/api/finance/invoices/:id/pdf` | ดาวน์โหลด PDF |
| GET | `/api/finance/receipts` | รายการใบเสร็จ |
| GET | `/api/finance/expenses` | รายการค่าใช้จ่าย |
| POST | `/api/finance/expenses` | เพิ่มค่าใช้จ่าย |
| PATCH | `/api/finance/expenses/:id/approve` | อนุมัติ |
| GET | `/api/finance/reports/revenue` | รายงานรายรับ |
| GET | `/api/finance/reports/profit` | รายงานกำไร |

### 13.5 CRM Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/crm/clients` | รายการลูกค้า |
| GET | `/api/crm/clients/:id` | รายละเอียดลูกค้า |
| POST | `/api/crm/clients` | เพิ่มลูกค้า |
| PATCH | `/api/crm/clients/:id` | แก้ไข |
| GET | `/api/crm/leads` | รายการ Lead |
| POST | `/api/crm/leads` | สร้าง Lead |
| PATCH | `/api/crm/leads/:id` | อัปเดต Lead |
| PATCH | `/api/crm/leads/:id/stage` | เปลี่ยน Stage |
| POST | `/api/crm/leads/:id/activities` | บันทึกกิจกรรม |
| GET | `/api/crm/contracts` | รายการสัญญา |
| POST | `/api/crm/contracts` | สร้างสัญญา |
| GET | `/api/crm/support-tickets` | รายการ Support Ticket |
| POST | `/api/crm/support-tickets` | สร้าง Ticket |
| PATCH | `/api/crm/support-tickets/:id` | อัปเดต Ticket |

### 13.6 Communication Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chat/channels` | รายการ Channel |
| POST | `/api/chat/channels` | สร้าง Channel |
| GET | `/api/chat/channels/:id/messages` | ข้อความใน Channel |
| POST | `/api/chat/channels/:id/messages` | ส่งข้อความ (REST fallback) |
| GET | `/api/announcements` | รายการประกาศ |
| POST | `/api/announcements` | สร้างประกาศ |
| GET | `/api/wiki` | รายการบทความ Wiki |
| POST | `/api/wiki` | สร้างบทความ |
| GET | `/api/wiki/:slug` | อ่านบทความ |
| GET | `/api/notifications` | Notification ของตัวเอง |
| PATCH | `/api/notifications/:id/read` | อ่านแล้ว |
| PATCH | `/api/notifications/read-all` | อ่านทั้งหมด |

### 13.7 Dashboard & Reports

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/overview` | ภาพรวม (Admin) |
| GET | `/api/dashboard/pm` | Dashboard สำหรับ PM |
| GET | `/api/dashboard/my` | Dashboard สำหรับพนักงาน |
| GET | `/api/reports/projects` | รายงานโปรเจกต์ |
| GET | `/api/reports/revenue` | รายงานรายรับ |
| GET | `/api/reports/utilization` | รายงาน Utilization |
| GET | `/api/reports/attendance` | รายงาน Attendance |
| GET | `/api/reports/export/:type` | Export (PDF/Excel) |

### 13.8 File & Utility

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/files/upload` | อัปโหลดไฟล์ |
| GET | `/api/files/:id` | ดาวน์โหลดไฟล์ |
| DELETE | `/api/files/:id` | ลบไฟล์ |
| GET | `/api/activity-logs` | Activity Log |

---

## 14. Deployment & DevOps

### 14.1 Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://api:4000
      - NEXT_PUBLIC_WS_URL=ws://api:4000
    depends_on:
      - api

  # Backend API
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://wams:password@postgres:5432/wams_db
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
      - MINIO_ENDPOINT=minio
      - MINIO_PORT=9000
      - MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}
      - MINIO_SECRET_KEY=${MINIO_SECRET_KEY}
    depends_on:
      - postgres
      - redis
      - minio

  # PostgreSQL
  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=wams
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=wams_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Redis
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # MinIO (File Storage)
  minio:
    image: minio/minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      - MINIO_ROOT_USER=${MINIO_ACCESS_KEY}
      - MINIO_ROOT_PASSWORD=${MINIO_SECRET_KEY}
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data

  # Nginx (Reverse Proxy)
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - api

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

### 14.2 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy WAMS

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: cd backend && npm ci && npm test
      - run: cd frontend && npm ci && npm test

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build & Push Docker Images
        run: |
          docker compose build
          docker compose push
      - name: Deploy to Server
        run: |
          ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} << 'EOF'
            cd /opt/wams
            docker compose pull
            docker compose up -d --remove-orphans
            docker compose exec api npx prisma migrate deploy
          EOF
```

### 14.3 Environment Variables

```env
# .env.example

# Database
DATABASE_URL=postgresql://wams:password@localhost:5432/wams_db

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# MinIO / S3
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=wams-files

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# App
APP_URL=http://localhost:3000
API_URL=http://localhost:4000
APP_NAME="WAMS - Web Agency Management"
```

---

## 15. แผนการพัฒนา (Development Roadmap)

### Phase 1: Foundation (สัปดาห์ 1-4)

| สัปดาห์ | งาน |
|---------|-----|
| 1 | Setup Project (Next.js + NestJS + Docker + Prisma) |
| 1 | Database Schema + Migration |
| 1 | Auth Module (Login, JWT, RBAC) |
| 2 | Layout (Sidebar, Topbar, Responsive) |
| 2 | User Management (CRUD) |
| 3-4 | **HR Module** (Employee, Attendance, Leave) |

### Phase 2: Core Modules (สัปดาห์ 5-10)

| สัปดาห์ | งาน |
|---------|-----|
| 5-6 | **Project Management** (CRUD, Kanban Board, Task) |
| 7 | **Document Management** + **Design Assets** |
| 8-9 | **Finance** (Quotation, Invoice, Expense) |
| 9-10 | **CRM** (Client, Lead Pipeline, Contract) |

### Phase 3: Communication & Dashboard (สัปดาห์ 11-14)

| สัปดาห์ | งาน |
|---------|-----|
| 11-12 | **Chat** (WebSocket, Channels, Messages) |
| 12 | **Notification System** |
| 13 | **Announcement + Wiki** |
| 14 | **Dashboard + Reports + Charts** |

### Phase 4: Polish & Deploy (สัปดาห์ 15-16)

| สัปดาห์ | งาน |
|---------|-----|
| 15 | Payroll, Performance Review, PDF Generation |
| 15 | Timesheet, Git Integration, Uptime Monitor |
| 16 | Testing (Unit + Integration + E2E) |
| 16 | Production Deployment + Documentation |

### ระยะเวลารวม: ~4 เดือน (16 สัปดาห์)

### Future Enhancements (Phase 5+)

- LINE Notify Integration
- Client Portal (ลูกค้าดูสถานะโปรเจกต์ได้)
- Mobile App (React Native)
- AI Features (Smart Task Suggestion, Auto-estimation)
- GitHub/GitLab Webhook Integration
- Automated Reporting (ส่ง Email รายงานอัตโนมัติ)
- Multi-language Support (TH/EN)
- White-label สำหรับขายให้บริษัทอื่น

---

## สรุป

ระบบ WAMS ออกแบบมาเพื่อรวมทุกอย่างที่บริษัทรับทำเว็บขนาด 20 คนต้องการไว้ในที่เดียว ตั้งแต่การบริหารคน, โปรเจกต์, การเงิน, ลูกค้า, สื่อสาร จนถึง Dashboard สำหรับตัดสินใจ โดยใช้ Tech Stack ที่ทันสมัยและ Scalable รองรับการเติบโตในอนาคต

---

*เอกสารนี้เป็น Living Document จะอัปเดตตามการพัฒนาจริง*
