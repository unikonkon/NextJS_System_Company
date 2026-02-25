# 📘 เอกสารรายละเอียดโครงการ: ระบบบริหารจัดการบริษัทรับทำเว็บ

## Web Agency Management System (WAMS)

**Version:** 3.0  
**Date:** 25 กุมภาพันธ์ 2026  
**Tech Stack:** Next.js 15 (App Router) + TypeScript + Supabase (PostgreSQL + Auth + Storage + Realtime)  
**Target Users:** พนักงาน 20 คน (บริษัทรับทำเว็บไซต์)  
**Architecture:** Next.js Full-Stack + Supabase BaaS

---

## สารบัญ

1. [ภาพรวมโครงการ (Project Overview)](#1-ภาพรวมโครงการ)
2. [สถาปัตยกรรมระบบ (System Architecture)](#2-สถาปัตยกรรมระบบ)
3. [Tech Stack & Tools](#3-tech-stack--tools)
4. [โครงสร้าง Folder](#4-โครงสร้าง-folder)
5. [ระบบ Authentication & Fixed Users](#5-ระบบ-authentication--fixed-users)
6. [Supabase Database Schema](#6-supabase-database-schema)
7. [Row Level Security (RLS)](#7-row-level-security)
8. [Module 1: ระบบบริหารงานบุคคล (HR & People)](#8-module-1-ระบบบริหารงานบุคคล)
9. [Module 2: ระบบบริหารโปรเจกต์ (Project Management)](#9-module-2-ระบบบริหารโปรเจกต์)
10. [Module 3: ระบบการเงินและบัญชี (Finance & Accounting)](#10-module-3-ระบบการเงินและบัญชี)
11. [Module 4: ระบบบริหารลูกค้า (CRM & Sales)](#11-module-4-ระบบบริหารลูกค้า)
12. [Module 5: ระบบสื่อสารภายใน (Communication)](#12-module-5-ระบบสื่อสารภายใน)
13. [Module 6: ระบบ Dashboard & Reporting](#13-module-6-ระบบ-dashboard--reporting)
14. [Supabase Storage (Files)](#14-supabase-storage)
15. [Supabase Realtime](#15-supabase-realtime)
16. [API & Data Access Patterns](#16-api--data-access-patterns)
17. [Deployment](#17-deployment)
18. [แผนการพัฒนา (Development Roadmap)](#18-แผนการพัฒนา)

---

## 1. ภาพรวมโครงการ

### 1.1 วัตถุประสงค์

พัฒนาระบบ Web Application แบบ All-in-One สำหรับบริหารจัดการบริษัทรับทำเว็บไซต์ขนาด 20 คน โดยใช้ **Next.js 15** เป็น Frontend/Server Framework และ **Supabase** เป็น Backend-as-a-Service ครบทั้ง Database, Auth, File Storage และ Realtime

### 1.2 ทำไมถึงเลือก Supabase

| เหตุผล | คำอธิบาย |
|--------|----------|
| **PostgreSQL เต็มรูปแบบ** | Relational DB จริง รองรับ Query ซับซ้อน, JOIN, Index, View |
| **ข้อมูล Sync ทุกเครื่อง** | ทุกคนเข้าถึงข้อมูลเดียวกัน ไม่ต้อง Export/Import |
| **Realtime** | Built-in Realtime Subscriptions สำหรับ Chat & Notification |
| **Storage** | File Storage สำหรับเอกสาร, Design, รูปภาพ พร้อม CDN |
| **Auth** | ระบบ Authentication สำเร็จรูป (ใช้ร่วมกับ Fixed Users) |
| **Row Level Security** | ควบคุมสิทธิ์ระดับ Row ใน Database |
| **Free Tier เพียงพอ** | 500MB DB + 1GB Storage + 50K MAU — เพียงพอสำหรับ 20 คน |
| **ไม่ต้อง Backend แยก** | Supabase Client SDK เรียกตรงจาก Next.js ได้ |
| **Dashboard** | มี Web Dashboard จัดการ DB, ดู Logs, SQL Editor |

### 1.3 เปรียบเทียบ Architecture

| หัวข้อ | v2 (IndexedDB) | v3 (Supabase) ✅ |
|--------|---------------|-----------------|
| Database | IndexedDB (Browser) | **Supabase PostgreSQL (Cloud)** |
| Data Sync | ❌ เก็บแต่ละเครื่อง | **✅ ทุกเครื่องเห็นเหมือนกัน** |
| Realtime | ❌ | **✅ Supabase Realtime** |
| File Storage | Base64 ใน Browser | **✅ Supabase Storage (S3)** |
| Auth | JWT + Fixed Users ในโค้ด | **Supabase Auth + Fixed Users Seed** |
| Offline | ✅ | ❌ ต้องออนไลน์ |
| Backup | Export JSON manual | **✅ Auto backup (Supabase Pro)** |
| Query | IndexedDB index-based | **✅ SQL เต็มรูปแบบ** |
| Scale | ไม่ได้ | **✅ รองรับ growth** |

---

## 2. สถาปัตยกรรมระบบ

### 2.1 High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Client (Browser)                         │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                Next.js 15 (App Router)                │    │
│  │                                                       │    │
│  │  ┌──────────────────┐    ┌──────────────────────┐    │    │
│  │  │  Client Components│    │  Server Components   │    │    │
│  │  │  (React 19)      │    │  + Server Actions     │    │    │
│  │  │                   │    │                       │    │    │
│  │  │  ┌─────────────┐ │    │  ┌─────────────────┐  │    │    │
│  │  │  │ Zustand     │ │    │  │ Supabase Server │  │    │    │
│  │  │  │ (UI State)  │ │    │  │ Client (SSR)    │  │    │    │
│  │  │  └─────────────┘ │    │  └─────────────────┘  │    │    │
│  │  │                   │    │                       │    │    │
│  │  │  ┌─────────────┐ │    │  ┌─────────────────┐  │    │    │
│  │  │  │ Supabase    │ │    │  │ Fixed Users     │  │    │    │
│  │  │  │ Browser     │ │    │  │ Config (Seed)   │  │    │    │
│  │  │  │ Client      │ │    │  └─────────────────┘  │    │    │
│  │  │  └──────┬──────┘ │    │                       │    │    │
│  │  └─────────┼────────┘    └───────────┬───────────┘    │    │
│  └────────────┼─────────────────────────┼────────────────┘    │
│               │                         │                      │
└───────────────┼─────────────────────────┼──────────────────────┘
                │          HTTPS          │
                ▼                         ▼
┌──────────────────────────────────────────────────────────────┐
│                     Supabase Cloud                            │
│                                                               │
│  ┌──────────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │  PostgreSQL   │  │  Auth    │  │  Storage (S3)         │  │
│  │  Database     │  │  Service │  │  - documents/         │  │
│  │               │  │          │  │  - designs/           │  │
│  │  30+ Tables   │  │  JWT     │  │  - avatars/           │  │
│  │  RLS Policies │  │  Session │  │  - receipts/          │  │
│  │  Functions    │  │          │  │                       │  │
│  │  Triggers     │  │          │  │  CDN + Transform      │  │
│  └──────────────┘  └──────────┘  └───────────────────────┘  │
│                                                               │
│  ┌──────────────┐  ┌─────────────────────────────────────┐  │
│  │  Realtime     │  │  Edge Functions (optional)          │  │
│  │  - Chat msgs  │  │  - PDF generation                   │  │
│  │  - Notifs     │  │  - Email notifications              │  │
│  │  - Task update│  │  - Scheduled jobs                   │  │
│  └──────────────┘  └─────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

```
── Authentication ──
User Login → Supabase Auth (email/password)
           → Session + JWT ← Supabase manages
           → Redirect to Dashboard

── Data Operations ──
Server Component → createServerClient(supabase) → SELECT (SSR)
Client Component → createBrowserClient(supabase) → INSERT/UPDATE/DELETE
Server Action    → createServerClient(supabase) → Complex operations

── Realtime ──
Client Component → supabase.channel('chat')
                 → .on('postgres_changes', ...) → Re-render
                 → .subscribe()

── Files ──
Upload → supabase.storage.from('documents').upload(path, file)
View   → supabase.storage.from('documents').getPublicUrl(path)
```

---

## 3. Tech Stack & Tools

### 3.1 Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.6.0",

    "@supabase/supabase-js": "^2.47.0",
    "@supabase/ssr": "^0.5.0",

    "zustand": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "zod": "^3.23.0",
    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "recharts": "^2.13.0",
    "date-fns": "^4.0.0",
    "lucide-react": "^0.460.0",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "supabase": "^2.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.4.0"
  }
}
```

### 3.2 เครื่องมือและหน้าที่

| เทคโนโลยี | หน้าที่ |
|-----------|--------|
| **Next.js 15** | Full-Stack Framework (App Router + Server Actions + Server Components) |
| **TypeScript** | Type Safety ทั้งโปรเจกต์ |
| **@supabase/supabase-js** | Supabase Client SDK (DB, Auth, Storage, Realtime) |
| **@supabase/ssr** | Supabase helpers สำหรับ SSR (Cookie-based Auth) |
| **Zustand** | Client UI State |
| **Tailwind CSS 4** | Styling |
| **shadcn/ui** | UI Components |
| **React Hook Form + Zod** | Form + Validation |
| **Recharts** | Dashboard Charts |
| **date-fns** | วันที่/เวลา |
| **@dnd-kit** | Drag & Drop (Kanban) |
| **lucide-react** | Icons |
| **supabase CLI** | Local dev, migration, type generation |

---

## 4. โครงสร้าง Folder

```
wams/
├── src/
│   ├── app/
│   │   ├── (auth)/                       # Auth Layout
│   │   │   ├── login/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/                  # Dashboard Layout
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                  # Dashboard Home
│   │   │   │
│   │   │   ├── hr/
│   │   │   │   ├── employees/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [id]/page.tsx
│   │   │   │   │   └── new/page.tsx
│   │   │   │   ├── attendance/page.tsx
│   │   │   │   ├── leave/page.tsx
│   │   │   │   ├── payroll/page.tsx
│   │   │   │   └── performance/page.tsx
│   │   │   │
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── board/page.tsx
│   │   │   │       ├── tasks/page.tsx
│   │   │   │       ├── timeline/page.tsx
│   │   │   │       ├── documents/page.tsx
│   │   │   │       ├── designs/page.tsx
│   │   │   │       ├── git/page.tsx
│   │   │   │       └── settings/page.tsx
│   │   │   │
│   │   │   ├── finance/
│   │   │   │   ├── quotations/page.tsx
│   │   │   │   ├── invoices/page.tsx
│   │   │   │   ├── receipts/page.tsx
│   │   │   │   ├── expenses/page.tsx
│   │   │   │   └── reports/page.tsx
│   │   │   │
│   │   │   ├── crm/
│   │   │   │   ├── clients/page.tsx
│   │   │   │   ├── leads/page.tsx
│   │   │   │   ├── contracts/page.tsx
│   │   │   │   └── support/page.tsx
│   │   │   │
│   │   │   ├── chat/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [channelId]/page.tsx
│   │   │   │
│   │   │   ├── announcements/page.tsx
│   │   │   ├── wiki/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   │
│   │   │   ├── reports/page.tsx
│   │   │   └── settings/page.tsx
│   │   │
│   │   ├── auth/
│   │   │   └── callback/route.ts         # Supabase Auth callback
│   │   │
│   │   ├── globals.css
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── ui/                           # shadcn/ui
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SidebarNav.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── NotificationBell.tsx
│   │   ├── hr/
│   │   ├── projects/
│   │   ├── finance/
│   │   ├── crm/
│   │   ├── chat/
│   │   ├── dashboard/
│   │   └── shared/
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                 # ⭐ Browser Client
│   │   │   ├── server.ts                 # ⭐ Server Client (SSR)
│   │   │   ├── admin.ts                  # ⭐ Service Role Client (seed/admin)
│   │   │   └── middleware.ts             # ⭐ Middleware Client
│   │   │
│   │   ├── auth/
│   │   │   ├── users.ts                  # ⭐ Fixed Users config (seed data)
│   │   │   └── permissions.ts            # ⭐ RBAC permissions
│   │   │
│   │   ├── actions/                      # ⭐ Server Actions
│   │   │   ├── auth.actions.ts
│   │   │   ├── hr.actions.ts
│   │   │   ├── project.actions.ts
│   │   │   ├── finance.actions.ts
│   │   │   ├── crm.actions.ts
│   │   │   └── chat.actions.ts
│   │   │
│   │   ├── queries/                      # ⭐ Data Fetching (Server)
│   │   │   ├── hr.queries.ts
│   │   │   ├── project.queries.ts
│   │   │   ├── finance.queries.ts
│   │   │   ├── crm.queries.ts
│   │   │   └── dashboard.queries.ts
│   │   │
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── validations/
│   │       ├── hr.schema.ts
│   │       ├── project.schema.ts
│   │       ├── finance.schema.ts
│   │       └── crm.schema.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── usePermission.ts
│   │   ├── useRealtime.ts               # ⭐ Supabase Realtime hook
│   │   └── useDebounce.ts
│   │
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── sidebarStore.ts
│   │   └── notificationStore.ts
│   │
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── database.types.ts             # ⭐ Auto-generated จาก Supabase CLI
│   │   ├── hr.types.ts
│   │   ├── project.types.ts
│   │   ├── finance.types.ts
│   │   ├── crm.types.ts
│   │   ├── chat.types.ts
│   │   └── common.types.ts
│   │
│   └── middleware.ts                     # Auth middleware (Supabase session)
│
├── supabase/                             # ⭐ Supabase Local Dev
│   ├── config.toml
│   ├── migrations/                       # ⭐ SQL Migrations
│   │   ├── 20260225000001_create_enums.sql
│   │   ├── 20260225000002_create_hr_tables.sql
│   │   ├── 20260225000003_create_project_tables.sql
│   │   ├── 20260225000004_create_finance_tables.sql
│   │   ├── 20260225000005_create_crm_tables.sql
│   │   ├── 20260225000006_create_chat_tables.sql
│   │   ├── 20260225000007_create_shared_tables.sql
│   │   ├── 20260225000008_create_rls_policies.sql
│   │   ├── 20260225000009_create_functions.sql
│   │   └── 20260225000010_seed_users.sql
│   │
│   └── seed.sql                          # ⭐ Seed fixed users + initial data
│
├── public/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 5. ระบบ Authentication & Fixed Users

### 5.1 Supabase Client Setup

```typescript
// src/lib/supabase/client.ts
// ─── Browser Client (Client Components) ───
'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```typescript
// src/lib/supabase/server.ts
// ─── Server Client (Server Components / Server Actions / Route Handlers) ───
import 'server-only';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database.types';

export async function createServer() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component — ignore
          }
        },
      },
    }
  );
}
```

```typescript
// src/lib/supabase/admin.ts
// ─── Service Role Client (Seed / Admin Operations) ───
import 'server-only';

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // ⚠️ ห้ามใช้ฝั่ง Client
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
```

```typescript
// src/lib/supabase/middleware.ts
// ─── Middleware Client ───
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

```typescript
// src/middleware.ts
import { updateSession } from '@/lib/supabase/middleware';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|icons).*)'],
};
```

### 5.2 Fixed Users (Seed เข้า Supabase Auth + employees table)

> User ทั้ง 20 คนถูก Seed เข้า **Supabase Auth** (email/password)  
> และเพิ่มข้อมูลพนักงานลงใน **employees** table  
> เมื่อต้องการแก้ไขให้แก้ที่ Seed SQL แล้วรัน migration ใหม่

```typescript
// src/lib/auth/users.ts
// ─── Fixed Users Config (ใช้สำหรับ Seed Script) ───

import type { UserRole } from '@/types/auth.types';

export interface FixedUserConfig {
  email: string;
  password: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  firstNameTh: string;
  lastNameTh: string;
  nickname: string;
  role: UserRole;
  department: string;
  position: string;
}

export const FIXED_USERS: FixedUserConfig[] = [
  // ═══════════════════════════════════════
  //  SUPER ADMIN / ผู้บริหาร
  // ═══════════════════════════════════════
  {
    email: 'admin@webagency.co.th',
    password: 'Admin@2026!',
    employeeCode: 'EMP-001',
    firstName: 'Somchai',
    lastName: 'Wongsakul',
    firstNameTh: 'สมชาย',
    lastNameTh: 'วงศ์สกุล',
    nickname: 'ชาย',
    role: 'SUPER_ADMIN',
    department: 'Management',
    position: 'CEO / ผู้บริหาร',
  },

  // ═══════════════════════════════════════
  //  ADMIN / HR
  // ═══════════════════════════════════════
  {
    email: 'nida@webagency.co.th',
    password: 'HrNida@2026!',
    employeeCode: 'EMP-002',
    firstName: 'Nida',
    lastName: 'Kaewmanee',
    firstNameTh: 'นิดา',
    lastNameTh: 'แก้วมณี',
    nickname: 'นิด',
    role: 'HR',
    department: 'Human Resources',
    position: 'HR Manager',
  },
  {
    email: 'ploy@webagency.co.th',
    password: 'HrPloy@2026!',
    employeeCode: 'EMP-003',
    firstName: 'Ploynapas',
    lastName: 'Srisuk',
    firstNameTh: 'พลอยนภัส',
    lastNameTh: 'ศรีสุข',
    nickname: 'พลอย',
    role: 'ADMIN',
    department: 'Human Resources',
    position: 'HR Officer',
  },

  // ═══════════════════════════════════════
  //  PROJECT MANAGER (2 คน)
  // ═══════════════════════════════════════
  {
    email: 'tanakorn@webagency.co.th',
    password: 'PmTana@2026!',
    employeeCode: 'EMP-004',
    firstName: 'Tanakorn',
    lastName: 'Phansuwan',
    firstNameTh: 'ธนากร',
    lastNameTh: 'พันธ์สุวรรณ',
    nickname: 'ต้น',
    role: 'PM',
    department: 'Project Management',
    position: 'Senior Project Manager',
  },
  {
    email: 'fern@webagency.co.th',
    password: 'PmFern@2026!',
    employeeCode: 'EMP-005',
    firstName: 'Fernlada',
    lastName: 'Thongkham',
    firstNameTh: 'เฟิร์นลดา',
    lastNameTh: 'ทองคำ',
    nickname: 'เฟิร์น',
    role: 'PM',
    department: 'Project Management',
    position: 'Project Manager',
  },

  // ═══════════════════════════════════════
  //  DEVELOPERS (8 คน)
  // ═══════════════════════════════════════
  {
    email: 'peem@webagency.co.th',
    password: 'DevPeem@2026!',
    employeeCode: 'EMP-006',
    firstName: 'Peemwit',
    lastName: 'Chaiyo',
    firstNameTh: 'ปิ่มวิชญ์',
    lastNameTh: 'ไชโย',
    nickname: 'ปิ่ม',
    role: 'DEVELOPER',
    department: 'Development',
    position: 'Lead Frontend Developer',
  },
  {
    email: 'bank@webagency.co.th',
    password: 'DevBank@2026!',
    employeeCode: 'EMP-007',
    firstName: 'Bankitti',
    lastName: 'Rodprasert',
    firstNameTh: 'บัณฑิตติ์',
    lastNameTh: 'รอดประเสริฐ',
    nickname: 'แบงค์',
    role: 'DEVELOPER',
    department: 'Development',
    position: 'Lead Backend Developer',
  },
  {
    email: 'mint@webagency.co.th',
    password: 'DevMint@2026!',
    employeeCode: 'EMP-008',
    firstName: 'Mintita',
    lastName: 'Wongsiri',
    firstNameTh: 'มินทิตา',
    lastNameTh: 'วงศ์ศิริ',
    nickname: 'มิ้นท์',
    role: 'DEVELOPER',
    department: 'Development',
    position: 'Frontend Developer',
  },
  {
    email: 'top@webagency.co.th',
    password: 'DevTop@2026!',
    employeeCode: 'EMP-009',
    firstName: 'Topkiat',
    lastName: 'Sangkla',
    firstNameTh: 'ทพเกียรติ',
    lastNameTh: 'แสงกล้า',
    nickname: 'ท็อป',
    role: 'DEVELOPER',
    department: 'Development',
    position: 'Frontend Developer',
  },
  {
    email: 'new@webagency.co.th',
    password: 'DevNew@2026!',
    employeeCode: 'EMP-010',
    firstName: 'Newrawit',
    lastName: 'Jaidee',
    firstNameTh: 'นิวรวิชญ์',
    lastNameTh: 'ใจดี',
    nickname: 'นิว',
    role: 'DEVELOPER',
    department: 'Development',
    position: 'Backend Developer',
  },
  {
    email: 'game@webagency.co.th',
    password: 'DevGame@2026!',
    employeeCode: 'EMP-011',
    firstName: 'Gamepol',
    lastName: 'Kaewprathum',
    firstNameTh: 'เกมพล',
    lastNameTh: 'แก้วประทุม',
    nickname: 'เกม',
    role: 'DEVELOPER',
    department: 'Development',
    position: 'Backend Developer',
  },
  {
    email: 'earth@webagency.co.th',
    password: 'DevEarth@2026!',
    employeeCode: 'EMP-012',
    firstName: 'Earthakorn',
    lastName: 'Suktham',
    firstNameTh: 'เอิร์ธกร',
    lastNameTh: 'สุขธรรม',
    nickname: 'เอิร์ธ',
    role: 'DEVELOPER',
    department: 'Development',
    position: 'Fullstack Developer',
  },
  {
    email: 'palm@webagency.co.th',
    password: 'DevPalm@2026!',
    employeeCode: 'EMP-013',
    firstName: 'Palmarin',
    lastName: 'Narongrit',
    firstNameTh: 'ปาล์มรินทร์',
    lastNameTh: 'ณรงค์ฤทธิ์',
    nickname: 'ปาล์ม',
    role: 'DEVELOPER',
    department: 'Development',
    position: 'Junior Developer',
  },

  // ═══════════════════════════════════════
  //  DESIGNERS (3 คน)
  // ═══════════════════════════════════════
  {
    email: 'ice@webagency.co.th',
    password: 'DesIce@2026!',
    employeeCode: 'EMP-014',
    firstName: 'Icenipa',
    lastName: 'Artcharoen',
    firstNameTh: 'ไอซ์นิภา',
    lastNameTh: 'อาจเจริญ',
    nickname: 'ไอซ์',
    role: 'DESIGNER',
    department: 'Design',
    position: 'Senior UI/UX Designer',
  },
  {
    email: 'bam@webagency.co.th',
    password: 'DesBam@2026!',
    employeeCode: 'EMP-015',
    firstName: 'Bambimol',
    lastName: 'Paisarn',
    firstNameTh: 'แบมบิมล',
    lastNameTh: 'ไพศาล',
    nickname: 'แบม',
    role: 'DESIGNER',
    department: 'Design',
    position: 'UI/UX Designer',
  },
  {
    email: 'gun@webagency.co.th',
    password: 'DesGun@2026!',
    employeeCode: 'EMP-016',
    firstName: 'Gunticha',
    lastName: 'Lamsam',
    firstNameTh: 'กัณฐิชา',
    lastNameTh: 'ล่ำซำ',
    nickname: 'กัน',
    role: 'DESIGNER',
    department: 'Design',
    position: 'Graphic Designer',
  },

  // ═══════════════════════════════════════
  //  QA (2 คน)
  // ═══════════════════════════════════════
  {
    email: 'beam@webagency.co.th',
    password: 'QaBeam@2026!',
    employeeCode: 'EMP-017',
    firstName: 'Beamsin',
    lastName: 'Pattanawong',
    firstNameTh: 'บีมสิน',
    lastNameTh: 'พัฒนวงศ์',
    nickname: 'บีม',
    role: 'QA',
    department: 'Quality Assurance',
    position: 'QA Lead',
  },
  {
    email: 'oat@webagency.co.th',
    password: 'QaOat@2026!',
    employeeCode: 'EMP-018',
    firstName: 'Oatpiya',
    lastName: 'Rungroj',
    firstNameTh: 'โอ๊ตปิยะ',
    lastNameTh: 'รุ่งโรจน์',
    nickname: 'โอ๊ต',
    role: 'QA',
    department: 'Quality Assurance',
    position: 'QA Tester',
  },

  // ═══════════════════════════════════════
  //  SALES (1 คน)
  // ═══════════════════════════════════════
  {
    email: 'joy@webagency.co.th',
    password: 'SalesJoy@2026!',
    employeeCode: 'EMP-019',
    firstName: 'Joyrada',
    lastName: 'Somboon',
    firstNameTh: 'จอยรดา',
    lastNameTh: 'สมบูรณ์',
    nickname: 'จอย',
    role: 'SALES',
    department: 'Sales',
    position: 'Sales & Account Manager',
  },

  // ═══════════════════════════════════════
  //  FINANCE (1 คน)
  // ═══════════════════════════════════════
  {
    email: 'nam@webagency.co.th',
    password: 'FinNam@2026!',
    employeeCode: 'EMP-020',
    firstName: 'Namfon',
    lastName: 'Thaweesuk',
    firstNameTh: 'น้ำฝน',
    lastNameTh: 'ทวีสุข',
    nickname: 'น้ำ',
    role: 'FINANCE',
    department: 'Finance & Accounting',
    position: 'Finance Manager',
  },
];
```

### 5.3 ตาราง User ทั้ง 20 คน

| # | Email (Username) | Password | Role | Position |
|---|-----------------|----------|------|----------|
| 1 | `admin@webagency.co.th` | `Admin@2026!` | SUPER_ADMIN | CEO / ผู้บริหาร |
| 2 | `nida@webagency.co.th` | `HrNida@2026!` | HR | HR Manager |
| 3 | `ploy@webagency.co.th` | `HrPloy@2026!` | ADMIN | HR Officer |
| 4 | `tanakorn@webagency.co.th` | `PmTana@2026!` | PM | Senior PM |
| 5 | `fern@webagency.co.th` | `PmFern@2026!` | PM | Project Manager |
| 6 | `peem@webagency.co.th` | `DevPeem@2026!` | DEVELOPER | Lead Frontend Dev |
| 7 | `bank@webagency.co.th` | `DevBank@2026!` | DEVELOPER | Lead Backend Dev |
| 8 | `mint@webagency.co.th` | `DevMint@2026!` | DEVELOPER | Frontend Dev |
| 9 | `top@webagency.co.th` | `DevTop@2026!` | DEVELOPER | Frontend Dev |
| 10 | `new@webagency.co.th` | `DevNew@2026!` | DEVELOPER | Backend Dev |
| 11 | `game@webagency.co.th` | `DevGame@2026!` | DEVELOPER | Backend Dev |
| 12 | `earth@webagency.co.th` | `DevEarth@2026!` | DEVELOPER | Fullstack Dev |
| 13 | `palm@webagency.co.th` | `DevPalm@2026!` | DEVELOPER | Junior Dev |
| 14 | `ice@webagency.co.th` | `DesIce@2026!` | DESIGNER | Senior UI/UX |
| 15 | `bam@webagency.co.th` | `DesBam@2026!` | DESIGNER | UI/UX Designer |
| 16 | `gun@webagency.co.th` | `DesGun@2026!` | DESIGNER | Graphic Designer |
| 17 | `beam@webagency.co.th` | `QaBeam@2026!` | QA | QA Lead |
| 18 | `oat@webagency.co.th` | `QaOat@2026!` | QA | QA Tester |
| 19 | `joy@webagency.co.th` | `SalesJoy@2026!` | SALES | Sales & Account |
| 20 | `nam@webagency.co.th` | `FinNam@2026!` | FINANCE | Finance Manager |

### 5.4 Seed SQL (สร้าง User ใน Supabase Auth + employees table)

```sql
-- supabase/migrations/20260225000010_seed_users.sql
-- ═══════════════════════════════════════════════════════
--  Seed Fixed Users → Supabase Auth + employees table
--  ⚠️  ใช้ Service Role Key เท่านั้น
-- ═══════════════════════════════════════════════════════

-- ฟังก์ชัน seed_user: สร้าง auth.users → เพิ่ม employees
CREATE OR REPLACE FUNCTION seed_user(
  p_email       TEXT,
  p_password    TEXT,
  p_emp_code    TEXT,
  p_first_name  TEXT,
  p_last_name   TEXT,
  p_first_th    TEXT,
  p_last_th     TEXT,
  p_nickname    TEXT,
  p_role        user_role,
  p_department  TEXT,
  p_position    TEXT
) RETURNS UUID AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- สร้าง Auth user (ถ้ายังไม่มี)
  SELECT id INTO v_user_id FROM auth.users WHERE email = p_email;

  IF v_user_id IS NULL THEN
    v_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, role, aud, confirmation_token
    ) VALUES (
      v_user_id,
      '00000000-0000-0000-0000-000000000000',
      p_email,
      crypt(p_password, gen_salt('bf')),
      NOW(),
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
      jsonb_build_object(
        'role', p_role::TEXT,
        'employee_code', p_emp_code,
        'first_name', p_first_name,
        'last_name', p_last_name
      ),
      NOW(), NOW(), 'authenticated', 'authenticated', ''
    );

    -- เพิ่ม identity
    INSERT INTO auth.identities (
      id, user_id, provider_id, provider, identity_data, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), v_user_id, v_user_id::TEXT, 'email',
      jsonb_build_object('sub', v_user_id::TEXT, 'email', p_email),
      NOW(), NOW(), NOW()
    );
  END IF;

  -- สร้าง employee record
  INSERT INTO employees (
    id, user_id, employee_code,
    first_name, last_name, first_name_th, last_name_th, nickname,
    email, role, department, position, status,
    start_date, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), v_user_id, p_emp_code,
    p_first_name, p_last_name, p_first_th, p_last_th, p_nickname,
    p_email, p_role, p_department, p_position, 'ACTIVE',
    '2026-01-01', NOW(), NOW()
  ) ON CONFLICT (employee_code) DO NOTHING;

  RETURN v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══ เรียก seed_user สำหรับทุกคน ═══
SELECT seed_user('admin@webagency.co.th','Admin@2026!','EMP-001','Somchai','Wongsakul','สมชาย','วงศ์สกุล','ชาย','SUPER_ADMIN','Management','CEO / ผู้บริหาร');
SELECT seed_user('nida@webagency.co.th','HrNida@2026!','EMP-002','Nida','Kaewmanee','นิดา','แก้วมณี','นิด','HR','Human Resources','HR Manager');
SELECT seed_user('ploy@webagency.co.th','HrPloy@2026!','EMP-003','Ploynapas','Srisuk','พลอยนภัส','ศรีสุข','พลอย','ADMIN','Human Resources','HR Officer');
SELECT seed_user('tanakorn@webagency.co.th','PmTana@2026!','EMP-004','Tanakorn','Phansuwan','ธนากร','พันธ์สุวรรณ','ต้น','PM','Project Management','Senior Project Manager');
SELECT seed_user('fern@webagency.co.th','PmFern@2026!','EMP-005','Fernlada','Thongkham','เฟิร์นลดา','ทองคำ','เฟิร์น','PM','Project Management','Project Manager');
SELECT seed_user('peem@webagency.co.th','DevPeem@2026!','EMP-006','Peemwit','Chaiyo','ปิ่มวิชญ์','ไชโย','ปิ่ม','DEVELOPER','Development','Lead Frontend Developer');
SELECT seed_user('bank@webagency.co.th','DevBank@2026!','EMP-007','Bankitti','Rodprasert','บัณฑิตติ์','รอดประเสริฐ','แบงค์','DEVELOPER','Development','Lead Backend Developer');
SELECT seed_user('mint@webagency.co.th','DevMint@2026!','EMP-008','Mintita','Wongsiri','มินทิตา','วงศ์ศิริ','มิ้นท์','DEVELOPER','Development','Frontend Developer');
SELECT seed_user('top@webagency.co.th','DevTop@2026!','EMP-009','Topkiat','Sangkla','ทพเกียรติ','แสงกล้า','ท็อป','DEVELOPER','Development','Frontend Developer');
SELECT seed_user('new@webagency.co.th','DevNew@2026!','EMP-010','Newrawit','Jaidee','นิวรวิชญ์','ใจดี','นิว','DEVELOPER','Development','Backend Developer');
SELECT seed_user('game@webagency.co.th','DevGame@2026!','EMP-011','Gamepol','Kaewprathum','เกมพล','แก้วประทุม','เกม','DEVELOPER','Development','Backend Developer');
SELECT seed_user('earth@webagency.co.th','DevEarth@2026!','EMP-012','Earthakorn','Suktham','เอิร์ธกร','สุขธรรม','เอิร์ธ','DEVELOPER','Development','Fullstack Developer');
SELECT seed_user('palm@webagency.co.th','DevPalm@2026!','EMP-013','Palmarin','Narongrit','ปาล์มรินทร์','ณรงค์ฤทธิ์','ปาล์ม','DEVELOPER','Development','Junior Developer');
SELECT seed_user('ice@webagency.co.th','DesIce@2026!','EMP-014','Icenipa','Artcharoen','ไอซ์นิภา','อาจเจริญ','ไอซ์','DESIGNER','Design','Senior UI/UX Designer');
SELECT seed_user('bam@webagency.co.th','DesBam@2026!','EMP-015','Bambimol','Paisarn','แบมบิมล','ไพศาล','แบม','DESIGNER','Design','UI/UX Designer');
SELECT seed_user('gun@webagency.co.th','DesGun@2026!','EMP-016','Gunticha','Lamsam','กัณฐิชา','ล่ำซำ','กัน','DESIGNER','Design','Graphic Designer');
SELECT seed_user('beam@webagency.co.th','QaBeam@2026!','EMP-017','Beamsin','Pattanawong','บีมสิน','พัฒนวงศ์','บีม','QA','Quality Assurance','QA Lead');
SELECT seed_user('oat@webagency.co.th','QaOat@2026!','EMP-018','Oatpiya','Rungroj','โอ๊ตปิยะ','รุ่งโรจน์','โอ๊ต','QA','Quality Assurance','QA Tester');
SELECT seed_user('joy@webagency.co.th','SalesJoy@2026!','EMP-019','Joyrada','Somboon','จอยรดา','สมบูรณ์','จอย','SALES','Sales','Sales & Account Manager');
SELECT seed_user('nam@webagency.co.th','FinNam@2026!','EMP-020','Namfon','Thaweesuk','น้ำฝน','ทวีสุข','น้ำ','FINANCE','Finance & Accounting','Finance Manager');

-- ลบฟังก์ชันหลังใช้งาน
DROP FUNCTION IF EXISTS seed_user;
```

### 5.5 Login Server Action

```typescript
// src/lib/actions/auth.actions.ts
'use server';

import { redirect } from 'next/navigation';
import { createServer } from '@/lib/supabase/server';

export async function loginAction(formData: FormData) {
  const supabase = await createServer();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
  }

  redirect('/');
}

export async function logoutAction() {
  const supabase = await createServer();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function getCurrentEmployee() {
  const supabase = await createServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: employee } = await supabase
    .from('employees')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return employee;
}
```

### 5.6 RBAC Permissions (เหมือน v2)

```typescript
// src/lib/auth/permissions.ts
// (เหมือน v2 — ใช้โค้ดเดิมทุกประการ)
// ดูรายละเอียดที่ Section 5.8 ของเอกสาร v2
// hasPermission(), hasAnyPermission(), getPermissions()
```

### 5.7 Permission Table (สรุป)

| Feature | SUPER_ADMIN | ADMIN/HR | PM | DEV | DESIGNER | QA | SALES | FINANCE |
|---------|:-----------:|:--------:|:--:|:---:|:--------:|:--:|:-----:|:-------:|
| จัดการพนักงาน | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ดูพนักงาน | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| เงินเดือน | ✅ | ✅ (HR) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| อนุมัติลา | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| สร้างโปรเจกต์ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ดูทุกโปรเจกต์ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| ดูโปรเจกต์ตัวเอง | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| มอบหมาย Task | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| อัปเดต Task ตัวเอง | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| อัปโหลด Design | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Approve Design | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ใบเสนอราคา | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| จัดการการเงิน | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| จัดการลูกค้า | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Chat | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| สร้างประกาศ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ดูรายงานทั้งหมด | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| ตั้งค่าระบบ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 6. Supabase Database Schema

### 6.1 Migration: Enums

```sql
-- supabase/migrations/20260225000001_create_enums.sql

CREATE TYPE user_role AS ENUM (
  'SUPER_ADMIN', 'ADMIN', 'HR', 'PM',
  'DEVELOPER', 'DESIGNER', 'QA', 'SALES', 'FINANCE'
);

CREATE TYPE employee_status AS ENUM ('ACTIVE', 'PROBATION', 'RESIGNED');

CREATE TYPE project_status AS ENUM (
  'DRAFT', 'PROPOSAL', 'IN_PROGRESS', 'ON_HOLD',
  'REVIEW', 'COMPLETED', 'CANCELLED'
);

CREATE TYPE task_status AS ENUM (
  'BACKLOG', 'TODO', 'IN_PROGRESS', 'REVIEW', 'TESTING', 'DONE'
);

CREATE TYPE priority_level AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

CREATE TYPE leave_type AS ENUM (
  'SICK', 'ANNUAL', 'PERSONAL', 'MATERNITY', 'ORDINATION', 'WFH'
);

CREATE TYPE approval_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

CREATE TYPE lead_stage AS ENUM (
  'NEW', 'CONTACTED', 'PROPOSAL_SENT', 'NEGOTIATION',
  'CLOSED_WON', 'CLOSED_LOST'
);

CREATE TYPE doc_status AS ENUM ('DRAFT', 'SENT', 'VIEWED', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'REVISED');

CREATE TYPE invoice_status AS ENUM (
  'DRAFT', 'SENT', 'VIEWED', 'PAID', 'PARTIALLY_PAID', 'OVERDUE', 'CANCELLED'
);

CREATE TYPE ticket_status AS ENUM (
  'OPEN', 'IN_PROGRESS', 'WAITING_CLIENT', 'RESOLVED', 'CLOSED'
);

CREATE TYPE channel_type AS ENUM ('PUBLIC', 'PRIVATE', 'DIRECT', 'PROJECT');
```

### 6.2 Migration: HR Tables

```sql
-- supabase/migrations/20260225000002_create_hr_tables.sql

-- ═══ Employees ═══
CREATE TABLE employees (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  employee_code  TEXT UNIQUE NOT NULL,
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  first_name_th  TEXT,
  last_name_th   TEXT,
  nickname       TEXT,
  email          TEXT NOT NULL,
  phone          TEXT,
  avatar_url     TEXT,
  department     TEXT NOT NULL,
  position       TEXT NOT NULL,
  role           user_role NOT NULL,
  salary         NUMERIC(12,2) DEFAULT 0,
  start_date     DATE NOT NULL DEFAULT CURRENT_DATE,
  probation_end  DATE,
  status         employee_status NOT NULL DEFAULT 'ACTIVE',
  bank_account   TEXT,
  bank_name      TEXT,
  tax_id         TEXT,
  social_security_id TEXT,
  address        TEXT,
  emergency_name  TEXT,
  emergency_phone TEXT,
  emergency_relation TEXT,
  skills         TEXT[] DEFAULT '{}',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_role ON employees(role);
CREATE INDEX idx_employees_status ON employees(status);

-- ═══ Attendance ═══
CREATE TABLE attendance (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id  UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  date         DATE NOT NULL,
  check_in     TIMESTAMPTZ,
  check_out    TIMESTAMPTZ,
  work_mode    TEXT NOT NULL DEFAULT 'office',
  location     TEXT,
  total_hours  NUMERIC(4,2),
  ot_hours     NUMERIC(4,2) DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'present',
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

CREATE INDEX idx_attendance_employee ON attendance(employee_id);
CREATE INDEX idx_attendance_date ON attendance(date);

-- ═══ Leave Requests ═══
CREATE TABLE leave_requests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id   UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  type          leave_type NOT NULL,
  start_date    DATE NOT NULL,
  end_date      DATE NOT NULL,
  total_days    NUMERIC(3,1) NOT NULL,
  reason        TEXT NOT NULL,
  status        approval_status NOT NULL DEFAULT 'PENDING',
  approved_by   UUID REFERENCES employees(id),
  approved_at   TIMESTAMPTZ,
  reject_reason TEXT,
  attachment_url TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leaves_employee ON leave_requests(employee_id);
CREATE INDEX idx_leaves_status ON leave_requests(status);

-- ═══ Payroll ═══
CREATE TABLE payrolls (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id      UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  month            INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  year             INT NOT NULL,
  base_salary      NUMERIC(12,2) NOT NULL,
  ot_amount        NUMERIC(12,2) DEFAULT 0,
  bonus            NUMERIC(12,2) DEFAULT 0,
  deduction        NUMERIC(12,2) DEFAULT 0,
  social_security  NUMERIC(12,2) DEFAULT 0,
  tax              NUMERIC(12,2) DEFAULT 0,
  net_salary       NUMERIC(12,2) NOT NULL,
  status           TEXT NOT NULL DEFAULT 'draft',
  paid_at          TIMESTAMPTZ,
  payslip_url      TEXT,
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(employee_id, month, year)
);

-- ═══ Performance Reviews ═══
CREATE TABLE performance_reviews (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id    UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  reviewer_id    UUID NOT NULL REFERENCES employees(id),
  period         TEXT NOT NULL,
  self_score     NUMERIC(3,2),
  manager_score  NUMERIC(3,2),
  final_score    NUMERIC(3,2),
  strengths      TEXT,
  improvements   TEXT,
  goals          TEXT,
  status         TEXT NOT NULL DEFAULT 'pending',
  completed_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 6.3 Migration: Project Tables

```sql
-- supabase/migrations/20260225000003_create_project_tables.sql

-- ═══ Projects ═══
CREATE TABLE projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  client_id       UUID REFERENCES clients(id),
  type            TEXT NOT NULL DEFAULT 'website',
  status          project_status NOT NULL DEFAULT 'DRAFT',
  priority        priority_level NOT NULL DEFAULT 'MEDIUM',
  start_date      DATE,
  deadline        DATE,
  budget          NUMERIC(14,2),
  actual_cost     NUMERIC(14,2) DEFAULT 0,
  progress        INT NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  manager_id      UUID NOT NULL REFERENCES employees(id),
  repository      TEXT,
  staging_url     TEXT,
  production_url  TEXT,
  tech_stack      TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_manager ON projects(manager_id);

-- ═══ Project Members ═══
CREATE TABLE project_members (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  employee_id     UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  role            TEXT NOT NULL,
  allocated_hours INT,
  assigned_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(project_id, employee_id)
);

-- ═══ Project Phases ═══
CREATE TABLE project_phases (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  order_index  INT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'pending',
  start_date   DATE,
  end_date     DATE,
  deliverables TEXT[] DEFAULT '{}',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══ Tasks ═══
CREATE TABLE tasks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  parent_task_id  UUID REFERENCES tasks(id) ON DELETE SET NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  type            TEXT NOT NULL DEFAULT 'feature',
  status          task_status NOT NULL DEFAULT 'BACKLOG',
  priority        priority_level NOT NULL DEFAULT 'MEDIUM',
  assignee_id     UUID REFERENCES employees(id),
  reporter_id     UUID NOT NULL REFERENCES employees(id),
  phase           TEXT,
  estimated_hours NUMERIC(6,2),
  actual_hours    NUMERIC(6,2),
  start_date      DATE,
  due_date        DATE,
  completed_at    TIMESTAMPTZ,
  tags            TEXT[] DEFAULT '{}',
  order_index     INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_tasks_status ON tasks(status);

-- ═══ Timesheets ═══
CREATE TABLE timesheets (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id  UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  task_id      UUID REFERENCES tasks(id) ON DELETE SET NULL,
  date         DATE NOT NULL,
  hours        NUMERIC(4,2) NOT NULL,
  description  TEXT,
  is_billable  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══ Documents ═══
CREATE TABLE documents (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  category     TEXT NOT NULL,
  file_url     TEXT NOT NULL,
  file_name    TEXT NOT NULL,
  file_type    TEXT NOT NULL,
  file_size    INT NOT NULL,
  version      INT NOT NULL DEFAULT 1,
  uploaded_by  UUID NOT NULL REFERENCES employees(id),
  tags         TEXT[] DEFAULT '{}',
  status       TEXT NOT NULL DEFAULT 'draft',
  approved_by  UUID REFERENCES employees(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══ Design Assets ═══
CREATE TABLE design_assets (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id     UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  type           TEXT NOT NULL,
  file_url       TEXT NOT NULL,
  thumbnail_url  TEXT,
  figma_url      TEXT,
  version        INT NOT NULL DEFAULT 1,
  status         TEXT NOT NULL DEFAULT 'draft',
  designer_id    UUID NOT NULL REFERENCES employees(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══ Design Feedbacks ═══
CREATE TABLE design_feedbacks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_asset_id UUID NOT NULL REFERENCES design_assets(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES employees(id),
  comment         TEXT NOT NULL,
  position_x      FLOAT,
  position_y      FLOAT,
  status          TEXT NOT NULL DEFAULT 'open',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 6.4 Migration: Finance Tables

```sql
-- supabase/migrations/20260225000004_create_finance_tables.sql

CREATE TABLE quotations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_number  TEXT UNIQUE NOT NULL,
  client_id         UUID NOT NULL REFERENCES clients(id),
  project_id        UUID REFERENCES projects(id),
  title             TEXT NOT NULL,
  description       TEXT,
  items             JSONB NOT NULL DEFAULT '[]',
  subtotal          NUMERIC(14,2) NOT NULL,
  discount          NUMERIC(14,2) DEFAULT 0,
  discount_type     TEXT DEFAULT 'fixed',
  vat_rate          NUMERIC(4,2) DEFAULT 7,
  vat               NUMERIC(14,2) NOT NULL,
  withholding_tax   NUMERIC(14,2) DEFAULT 0,
  total             NUMERIC(14,2) NOT NULL,
  status            doc_status NOT NULL DEFAULT 'DRAFT',
  valid_until       DATE NOT NULL,
  notes             TEXT,
  terms             TEXT,
  payment_terms     TEXT,
  created_by        UUID NOT NULL REFERENCES employees(id),
  approved_by       UUID REFERENCES employees(id),
  sent_at           TIMESTAMPTZ,
  pdf_url           TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE invoices (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number    TEXT UNIQUE NOT NULL,
  quotation_id      UUID REFERENCES quotations(id),
  project_id        UUID NOT NULL REFERENCES projects(id),
  client_id         UUID NOT NULL REFERENCES clients(id),
  items             JSONB NOT NULL DEFAULT '[]',
  subtotal          NUMERIC(14,2) NOT NULL,
  vat               NUMERIC(14,2) NOT NULL,
  withholding_tax   NUMERIC(14,2) DEFAULT 0,
  total             NUMERIC(14,2) NOT NULL,
  status            invoice_status NOT NULL DEFAULT 'DRAFT',
  issue_date        DATE NOT NULL,
  due_date          DATE NOT NULL,
  paid_amount       NUMERIC(14,2) DEFAULT 0,
  paid_at           TIMESTAMPTZ,
  payment_method    TEXT,
  payment_proof_url TEXT,
  phase             TEXT,
  notes             TEXT,
  pdf_url           TEXT,
  created_by        UUID NOT NULL REFERENCES employees(id),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE receipts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_number  TEXT UNIQUE NOT NULL,
  invoice_id      UUID UNIQUE NOT NULL REFERENCES invoices(id),
  amount          NUMERIC(14,2) NOT NULL,
  vat             NUMERIC(14,2) NOT NULL,
  total           NUMERIC(14,2) NOT NULL,
  issue_date      DATE NOT NULL,
  pdf_url         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE expenses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID REFERENCES projects(id),
  category      TEXT NOT NULL,
  title         TEXT NOT NULL,
  amount        NUMERIC(14,2) NOT NULL,
  receipt_url   TEXT,
  status        approval_status NOT NULL DEFAULT 'PENDING',
  requested_by  UUID NOT NULL REFERENCES employees(id),
  approved_by   UUID REFERENCES employees(id),
  date          DATE NOT NULL,
  notes         TEXT,
  is_recurring  BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 6.5 Migration: CRM Tables

```sql
-- supabase/migrations/20260225000005_create_crm_tables.sql

CREATE TABLE clients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_code     TEXT UNIQUE NOT NULL,
  company_name    TEXT NOT NULL,
  company_name_th TEXT,
  industry        TEXT,
  website         TEXT,
  tax_id          TEXT,
  address         TEXT,
  status          TEXT NOT NULL DEFAULT 'active',
  source          TEXT,
  total_revenue   NUMERIC(14,2) DEFAULT 0,
  notes           TEXT,
  tags            TEXT[] DEFAULT '{}',
  assigned_to     UUID REFERENCES employees(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE client_contacts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id  UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  position   TEXT,
  email      TEXT,
  phone      TEXT,
  line_id    TEXT,
  is_primary BOOLEAN DEFAULT FALSE
);

CREATE TABLE leads (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT NOT NULL,
  client_id           UUID REFERENCES clients(id),
  contact_name        TEXT NOT NULL,
  contact_email       TEXT,
  contact_phone       TEXT,
  stage               lead_stage NOT NULL DEFAULT 'NEW',
  estimated_value     NUMERIC(14,2),
  probability         INT CHECK (probability BETWEEN 0 AND 100),
  source              TEXT,
  assigned_to         UUID REFERENCES employees(id),
  expected_close_date DATE,
  lost_reason         TEXT,
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lead_activities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id     UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,
  description TEXT NOT NULL,
  date        TIMESTAMPTZ NOT NULL,
  created_by  UUID NOT NULL REFERENCES employees(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE contracts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number  TEXT UNIQUE NOT NULL,
  client_id        UUID NOT NULL REFERENCES clients(id),
  project_id       UUID REFERENCES projects(id),
  title            TEXT NOT NULL,
  value            NUMERIC(14,2) NOT NULL,
  start_date       DATE NOT NULL,
  end_date         DATE NOT NULL,
  warranty_end     DATE,
  status           TEXT NOT NULL DEFAULT 'draft',
  file_url         TEXT,
  signed_at        TIMESTAMPTZ,
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE support_tickets (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number   TEXT UNIQUE NOT NULL,
  project_id      UUID NOT NULL REFERENCES projects(id),
  client_id       UUID NOT NULL REFERENCES clients(id),
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  category        TEXT NOT NULL,
  priority        priority_level NOT NULL DEFAULT 'MEDIUM',
  status          ticket_status NOT NULL DEFAULT 'OPEN',
  assignee_id     UUID REFERENCES employees(id),
  is_warranty     BOOLEAN DEFAULT FALSE,
  is_billable     BOOLEAN DEFAULT FALSE,
  estimated_hours NUMERIC(6,2),
  actual_hours    NUMERIC(6,2),
  resolved_at     TIMESTAMPTZ,
  sla_deadline    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 6.6 Migration: Chat & Shared Tables

```sql
-- supabase/migrations/20260225000006_create_chat_tables.sql

CREATE TABLE channels (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  type            channel_type NOT NULL DEFAULT 'PUBLIC',
  project_id      UUID UNIQUE REFERENCES projects(id),
  description     TEXT,
  created_by      UUID NOT NULL REFERENCES employees(id),
  last_message_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE channel_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id  UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  joined_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(channel_id, user_id)
);

CREATE TABLE messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id  UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  sender_id   UUID NOT NULL REFERENCES employees(id),
  content     TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'text',
  reply_to_id UUID REFERENCES messages(id),
  is_edited   BOOLEAN DEFAULT FALSE,
  is_pinned   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_channel ON messages(channel_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);

CREATE TABLE announcements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  category    TEXT DEFAULT 'general',
  is_pinned   BOOLEAN DEFAULT FALSE,
  author_id   UUID NOT NULL REFERENCES employees(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE wiki_articles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  content      TEXT NOT NULL,
  category     TEXT NOT NULL,
  author_id    UUID NOT NULL REFERENCES employees(id),
  is_published BOOLEAN DEFAULT TRUE,
  view_count   INT DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

```sql
-- supabase/migrations/20260225000007_create_shared_tables.sql

CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  link       TEXT,
  is_read    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id) WHERE is_read = FALSE;

CREATE TABLE comments (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content           TEXT NOT NULL,
  author_id         UUID NOT NULL REFERENCES employees(id),
  task_id           UUID REFERENCES tasks(id) ON DELETE CASCADE,
  document_id       UUID REFERENCES documents(id) ON DELETE CASCADE,
  support_ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE attachments (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name         TEXT NOT NULL,
  file_url          TEXT NOT NULL,
  file_type         TEXT NOT NULL,
  file_size         INT NOT NULL,
  task_id           UUID REFERENCES tasks(id) ON DELETE CASCADE,
  message_id        UUID REFERENCES messages(id) ON DELETE CASCADE,
  support_ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  uploaded_by       UUID NOT NULL REFERENCES employees(id),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE activity_logs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES employees(id),
  action     TEXT NOT NULL,
  entity     TEXT NOT NULL,
  entity_id  UUID,
  metadata   JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity, entity_id);

-- ═══ Auto-update updated_at trigger ═══
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger ทุกตารางที่มี updated_at
DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN
    SELECT table_name FROM information_schema.columns
    WHERE column_name = 'updated_at' AND table_schema = 'public'
  LOOP
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
      t
    );
  END LOOP;
END $$;
```

### 6.7 สรุปตาราง Database (30 Tables)

| # | Table | Module | Key Relations |
|---|-------|--------|---------------|
| 1 | `employees` | HR | → auth.users |
| 2 | `attendance` | HR | → employees |
| 3 | `leave_requests` | HR | → employees |
| 4 | `payrolls` | HR | → employees |
| 5 | `performance_reviews` | HR | → employees |
| 6 | `projects` | Project | → clients, employees |
| 7 | `project_members` | Project | → projects, employees |
| 8 | `project_phases` | Project | → projects |
| 9 | `tasks` | Project | → projects, employees |
| 10 | `timesheets` | Project | → employees, projects, tasks |
| 11 | `documents` | Project | → projects, employees |
| 12 | `design_assets` | Project | → projects, employees |
| 13 | `design_feedbacks` | Project | → design_assets, employees |
| 14 | `quotations` | Finance | → clients, projects, employees |
| 15 | `invoices` | Finance | → quotations, projects, clients |
| 16 | `receipts` | Finance | → invoices |
| 17 | `expenses` | Finance | → projects, employees |
| 18 | `clients` | CRM | — |
| 19 | `client_contacts` | CRM | → clients |
| 20 | `leads` | CRM | → clients, employees |
| 21 | `lead_activities` | CRM | → leads, employees |
| 22 | `contracts` | CRM | → clients, projects |
| 23 | `support_tickets` | CRM | → projects, clients, employees |
| 24 | `channels` | Chat | → projects, employees |
| 25 | `channel_members` | Chat | → channels, employees |
| 26 | `messages` | Chat | → channels, employees |
| 27 | `announcements` | Chat | → employees |
| 28 | `wiki_articles` | Wiki | → employees |
| 29 | `notifications` | Shared | → employees |
| 30 | `comments` | Shared | → tasks, documents, tickets |
| 31 | `attachments` | Shared | → tasks, messages, tickets |
| 32 | `activity_logs` | Shared | → employees |

---

## 7. Row Level Security (RLS)

```sql
-- supabase/migrations/20260225000008_create_rls_policies.sql

-- เปิด RLS ทุกตาราง
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
-- (ทำเหมือนกันทุกตาราง...)

-- ═══ Helper: ดึง role ของ user ปัจจุบัน ═══
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS user_role AS $$
  SELECT role FROM employees WHERE user_id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION get_my_employee_id()
RETURNS UUID AS $$
  SELECT id FROM employees WHERE user_id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ═══ Employees ═══
-- ทุกคนดูพนักงานได้ (ข้อมูลพื้นฐาน)
CREATE POLICY "employees_select" ON employees FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- เฉพาะ SUPER_ADMIN, ADMIN, HR แก้ไขได้
CREATE POLICY "employees_modify" ON employees FOR ALL
  USING (get_my_role() IN ('SUPER_ADMIN', 'ADMIN', 'HR'));

-- ═══ Attendance ═══
-- ดูของตัวเอง หรือ SUPER_ADMIN/ADMIN/HR/PM ดูทั้งหมด
CREATE POLICY "attendance_select" ON attendance FOR SELECT
  USING (
    employee_id = get_my_employee_id()
    OR get_my_role() IN ('SUPER_ADMIN', 'ADMIN', 'HR', 'PM')
  );

-- เพิ่มได้เฉพาะของตัวเอง
CREATE POLICY "attendance_insert" ON attendance FOR INSERT
  WITH CHECK (employee_id = get_my_employee_id());

-- ═══ Projects ═══
-- SUPER_ADMIN/ADMIN/PM/SALES/FINANCE ดูทั้งหมด, อื่น ๆ ดูเฉพาะที่เป็นสมาชิก
CREATE POLICY "projects_select" ON projects FOR SELECT
  USING (
    get_my_role() IN ('SUPER_ADMIN', 'ADMIN', 'HR', 'PM', 'SALES', 'FINANCE')
    OR id IN (SELECT project_id FROM project_members WHERE employee_id = get_my_employee_id())
  );

-- สร้างได้เฉพาะ SUPER_ADMIN, PM
CREATE POLICY "projects_insert" ON projects FOR INSERT
  WITH CHECK (get_my_role() IN ('SUPER_ADMIN', 'PM'));

-- ═══ Tasks ═══
-- เห็น Task ในโปรเจกต์ที่ตัวเองเป็นสมาชิก หรือ admin roles
CREATE POLICY "tasks_select" ON tasks FOR SELECT
  USING (
    get_my_role() IN ('SUPER_ADMIN', 'ADMIN', 'PM')
    OR project_id IN (SELECT project_id FROM project_members WHERE employee_id = get_my_employee_id())
  );

-- อัปเดตได้ถ้าเป็น assignee หรือ PM/ADMIN
CREATE POLICY "tasks_update" ON tasks FOR UPDATE
  USING (
    assignee_id = get_my_employee_id()
    OR reporter_id = get_my_employee_id()
    OR get_my_role() IN ('SUPER_ADMIN', 'PM')
  );

-- ═══ Messages ═══
-- เห็นเฉพาะ channel ที่ตัวเองเป็นสมาชิก
CREATE POLICY "messages_select" ON messages FOR SELECT
  USING (
    channel_id IN (
      SELECT channel_id FROM channel_members WHERE user_id = get_my_employee_id()
    )
  );

CREATE POLICY "messages_insert" ON messages FOR INSERT
  WITH CHECK (sender_id = get_my_employee_id());

-- ═══ Notifications ═══
-- เห็นเฉพาะของตัวเอง
CREATE POLICY "notifications_select" ON notifications FOR SELECT
  USING (user_id = get_my_employee_id());

CREATE POLICY "notifications_update" ON notifications FOR UPDATE
  USING (user_id = get_my_employee_id());

-- ═══ Finance (quotations, invoices, expenses) ═══
-- SUPER_ADMIN, FINANCE ดูได้ทั้งหมด; PM/SALES ดูเฉพาะที่เกี่ยวข้อง
CREATE POLICY "quotations_select" ON quotations FOR SELECT
  USING (
    get_my_role() IN ('SUPER_ADMIN', 'FINANCE')
    OR created_by = get_my_employee_id()
    OR client_id IN (SELECT id FROM clients WHERE assigned_to = get_my_employee_id())
  );

CREATE POLICY "invoices_select" ON invoices FOR SELECT
  USING (
    get_my_role() IN ('SUPER_ADMIN', 'FINANCE')
    OR project_id IN (SELECT project_id FROM project_members WHERE employee_id = get_my_employee_id())
  );
```

---

## 8-12. Module 1-5 (ฟีเจอร์)

> ฟีเจอร์ของทุก Module เหมือนเดิมทุกประการตามเอกสาร v2  
> แตกต่างที่ **Data Layer** เปลี่ยนจาก IndexedDB → Supabase

### ตัวอย่าง Data Access Pattern (Server Component)

```typescript
// src/lib/queries/project.queries.ts
import { createServer } from '@/lib/supabase/server';

export async function getProjects() {
  const supabase = await createServer();
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      client:clients(id, company_name),
      manager:employees!projects_manager_id_fkey(id, first_name, last_name, nickname, avatar_url),
      members:project_members(
        employee:employees(id, first_name, last_name, nickname, avatar_url, role)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProjectById(id: string) {
  const supabase = await createServer();
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      client:clients(*),
      manager:employees!projects_manager_id_fkey(*),
      members:project_members(*, employee:employees(*)),
      phases:project_phases(*),
      tasks:tasks(*, assignee:employees!tasks_assignee_id_fkey(id, first_name, nickname, avatar_url))
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
```

### ตัวอย่าง Server Action (Mutation)

```typescript
// src/lib/actions/project.actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createServer } from '@/lib/supabase/server';

export async function createProject(formData: FormData) {
  const supabase = await createServer();

  const { data, error } = await supabase
    .from('projects')
    .insert({
      code: formData.get('code') as string,
      name: formData.get('name') as string,
      client_id: formData.get('clientId') as string,
      manager_id: formData.get('managerId') as string,
      type: formData.get('type') as string,
      start_date: formData.get('startDate') as string,
      deadline: formData.get('deadline') as string,
      budget: Number(formData.get('budget')),
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath('/projects');
  return { data };
}

export async function updateTaskStatus(taskId: string, status: string, orderIndex: number) {
  const supabase = await createServer();

  const { error } = await supabase
    .from('tasks')
    .update({ status, order_index: orderIndex })
    .eq('id', taskId);

  if (error) return { error: error.message };

  revalidatePath('/projects');
  return { success: true };
}
```

---

## 13. Module 6: Dashboard & Reporting

### Dashboard Queries (Supabase SQL Functions)

```sql
-- supabase/migrations/20260225000009_create_functions.sql

-- ═══ Revenue Summary ═══
CREATE OR REPLACE FUNCTION get_revenue_summary(p_year INT)
RETURNS TABLE(month INT, revenue NUMERIC, expense NUMERIC, profit NUMERIC) AS $$
  SELECT
    EXTRACT(MONTH FROM i.paid_at)::INT AS month,
    COALESCE(SUM(i.total), 0) AS revenue,
    COALESCE((
      SELECT SUM(e.amount) FROM expenses e
      WHERE e.status = 'APPROVED'
      AND EXTRACT(YEAR FROM e.date) = p_year
      AND EXTRACT(MONTH FROM e.date) = EXTRACT(MONTH FROM i.paid_at)
    ), 0) AS expense,
    COALESCE(SUM(i.total), 0) - COALESCE((
      SELECT SUM(e.amount) FROM expenses e
      WHERE e.status = 'APPROVED'
      AND EXTRACT(YEAR FROM e.date) = p_year
      AND EXTRACT(MONTH FROM e.date) = EXTRACT(MONTH FROM i.paid_at)
    ), 0) AS profit
  FROM invoices i
  WHERE i.status = 'PAID'
  AND EXTRACT(YEAR FROM i.paid_at) = p_year
  GROUP BY EXTRACT(MONTH FROM i.paid_at)
  ORDER BY month;
$$ LANGUAGE sql SECURITY DEFINER;

-- ═══ Dashboard Overview ═══
CREATE OR REPLACE FUNCTION get_dashboard_overview()
RETURNS JSON AS $$
  SELECT json_build_object(
    'total_employees', (SELECT COUNT(*) FROM employees WHERE status = 'ACTIVE'),
    'active_projects', (SELECT COUNT(*) FROM projects WHERE status = 'IN_PROGRESS'),
    'pending_tasks', (SELECT COUNT(*) FROM tasks WHERE status NOT IN ('DONE')),
    'revenue_this_month', (
      SELECT COALESCE(SUM(total), 0) FROM invoices
      WHERE status = 'PAID'
      AND EXTRACT(MONTH FROM paid_at) = EXTRACT(MONTH FROM NOW())
      AND EXTRACT(YEAR FROM paid_at) = EXTRACT(YEAR FROM NOW())
    ),
    'outstanding_invoices', (
      SELECT COALESCE(SUM(total - paid_amount), 0) FROM invoices
      WHERE status IN ('SENT', 'VIEWED', 'OVERDUE', 'PARTIALLY_PAID')
    ),
    'new_leads', (SELECT COUNT(*) FROM leads WHERE stage = 'NEW'),
    'present_today', (
      SELECT COUNT(*) FROM attendance
      WHERE date = CURRENT_DATE AND check_in IS NOT NULL
    )
  );
$$ LANGUAGE sql SECURITY DEFINER;
```

```typescript
// เรียกใช้จาก Server Component
const { data } = await supabase.rpc('get_dashboard_overview');
const { data: revenue } = await supabase.rpc('get_revenue_summary', { p_year: 2026 });
```

---

## 14. Supabase Storage

### 14.1 Storage Buckets

```sql
-- สร้างผ่าน Supabase Dashboard หรือ migration
INSERT INTO storage.buckets (id, name, public) VALUES
  ('avatars', 'avatars', true),
  ('documents', 'documents', false),
  ('designs', 'designs', false),
  ('receipts', 'receipts', false),
  ('attachments', 'attachments', false);
```

### 14.2 Upload ตัวอย่าง

```typescript
// Upload document
async function uploadDocument(file: File, projectId: string) {
  const supabase = createClient();
  const path = `projects/${projectId}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from('documents')
    .upload(path, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('documents')
    .getPublicUrl(path);

  return publicUrl;
}
```

---

## 15. Supabase Realtime

### 15.1 Chat Realtime

```typescript
// src/hooks/useRealtime.ts
'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useChatRealtime(channelId: string, onNewMessage: (msg: any) => void) {
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`chat:${channelId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`,
        },
        (payload) => onNewMessage(payload.new)
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [channelId, onNewMessage]);
}

export function useNotificationRealtime(employeeId: string, onNotification: (n: any) => void) {
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`notif:${employeeId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${employeeId}`,
        },
        (payload) => onNotification(payload.new)
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [employeeId, onNotification]);
}
```

---

## 16. API & Data Access Patterns

### 16.1 Pattern สรุป

| Pattern | ใช้เมื่อ | ตัวอย่าง |
|---------|---------|---------|
| **Server Component + Query** | อ่านข้อมูลตอน render (SSR) | Dashboard, List pages |
| **Server Action** | เขียนข้อมูล (mutation) | Create/Update/Delete forms |
| **Client Component + Supabase** | Realtime, interactive UI | Chat, Kanban drag-drop |
| **Supabase RPC** | Query ซับซ้อน, รายงาน | Dashboard stats, Revenue report |
| **Supabase Storage** | อัปโหลด/ดาวน์โหลดไฟล์ | Documents, Designs, Avatars |
| **Supabase Realtime** | อัปเดตแบบ live | Chat messages, Notifications |

### 16.2 Type Generation

```bash
# สร้าง TypeScript types จาก Supabase schema
npx supabase gen types typescript --project-id <your-project-id> > src/types/database.types.ts
```

---

## 17. Deployment

### 17.1 Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...  # ⚠️ Server only
```

### 17.2 Vercel (แนะนำ)

```bash
# 1. Setup Supabase project
npx supabase init
npx supabase db push          # Push migrations

# 2. Deploy Next.js
vercel --prod

# 3. Set env vars ใน Vercel Dashboard
```

### 17.3 Docker (Self-Hosted)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 18. แผนการพัฒนา (Development Roadmap)

### Phase 1: Foundation (สัปดาห์ 1-3)

| สัปดาห์ | งาน |
|---------|-----|
| 1 | Setup Next.js 15 + Supabase project + Tailwind + shadcn/ui |
| 1 | Database migrations (all tables + enums + RLS) |
| 1 | Seed fixed users (20 คน) + Supabase Auth |
| 2 | Layout (Sidebar + Topbar + Responsive + Role-based menu) |
| 2 | Auth flow (Login/Logout + Middleware + RBAC) |
| 3 | **HR Module** (Employee, Attendance, Leave) |

### Phase 2: Core Modules (สัปดาห์ 4-8)

| สัปดาห์ | งาน |
|---------|-----|
| 4-5 | **Project Management** (CRUD + Kanban + Tasks) |
| 5-6 | **Documents + Design Assets** (Supabase Storage) |
| 6-7 | **Finance** (Quotation, Invoice, Expense) |
| 7-8 | **CRM** (Client, Lead Pipeline, Contract, Support) |

### Phase 3: Communication & Dashboard (สัปดาห์ 9-11)

| สัปดาห์ | งาน |
|---------|-----|
| 9 | **Chat** (Supabase Realtime + Channels + Messages) |
| 9-10 | **Notification** (Realtime) + **Announcements** + **Wiki** |
| 10-11 | **Dashboard + Reports** (RPC Functions + Recharts) |

### Phase 4: Polish & Deploy (สัปดาห์ 12)

| สัปดาห์ | งาน |
|---------|-----|
| 12 | Payroll + PDF print + Performance Review |
| 12 | Testing + Bug Fix + Production Deploy |

### ระยะเวลารวม: ~3 เดือน (12 สัปดาห์)

### Future Enhancements

| Feature | รายละเอียด |
|---------|-----------|
| **Supabase Edge Functions** | PDF generation, Email notification, Scheduled reports |
| **LINE Notify** | แจ้งเตือนผ่าน LINE |
| **Client Portal** | ลูกค้าดูสถานะโปรเจกต์ (Supabase Auth + separate role) |
| **PWA** | Service Worker + Offline support |
| **Mobile App** | React Native with Supabase |
| **AI Features** | Smart task estimation, Chatbot |
| **Supabase Branching** | Preview environments per PR |

---

## สรุปเปรียบเทียบ Architecture ทั้ง 3 เวอร์ชัน

| หัวข้อ | v1 (NestJS) | v2 (IndexedDB) | v3 (Supabase) ✅ |
|--------|------------|---------------|-----------------|
| Frontend | Next.js 15 | Next.js 15 | **Next.js 15** |
| Backend | NestJS แยก | ไม่มี | **Supabase BaaS** |
| Database | PostgreSQL + Prisma | IndexedDB (idb) | **Supabase PostgreSQL** |
| Auth | JWT + DB | JWT + Fixed Code | **Supabase Auth + Seed** |
| File Storage | MinIO / S3 | Base64 in Browser | **Supabase Storage** |
| Realtime | Socket.io | ❌ | **Supabase Realtime** |
| Data Sync | ✅ (central DB) | ❌ (per browser) | **✅ (cloud DB)** |
| Offline | ❌ | ✅ | ❌ |
| RLS / Security | Custom Guards | Client-side | **Supabase RLS** |
| Deploy | Docker 5 containers | Vercel / Docker 1 | **Vercel + Supabase Cloud** |
| ค่า Server | สูง | ต่ำ | **ต่ำ (Free Tier เพียงพอ)** |
| ความซับซ้อน | สูง | ต่ำ | **กลาง** |
| Scalability | ดี | ไม่ได้ | **ดี** |
| ความเหมาะสม 20 คน | Overkill | จำกัด | **✅ พอดี** |

---

*เอกสารนี้เป็น Living Document — อัปเดตตามการพัฒนาจริง*  
*Last Updated: 25 กุมภาพันธ์ 2026*
