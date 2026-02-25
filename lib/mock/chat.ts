import type {
  Channel,
  Message,
  Announcement,
  WikiArticle,
} from '@/types/chat.types';

// ──────────────────────────────────────────────
// 5 Channels
// ──────────────────────────────────────────────

export const mockChannels: Channel[] = [
  {
    id: 'ch-001',
    name: '#general',
    description: 'Company-wide discussions and announcements',
    type: 'PUBLIC',
    members: [
      'e0a1b2c3-0001-4d5e-8f6a-7b8c9d0e1f01',
      'e0a1b2c3-0002-4d5e-8f6a-7b8c9d0e1f02',
      'e0a1b2c3-0003-4d5e-8f6a-7b8c9d0e1f03',
      'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
      'e0a1b2c3-0005-4d5e-8f6a-7b8c9d0e1f05',
      'e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06',
      'e0a1b2c3-0007-4d5e-8f6a-7b8c9d0e1f07',
      'e0a1b2c3-0008-4d5e-8f6a-7b8c9d0e1f08',
      'e0a1b2c3-0009-4d5e-8f6a-7b8c9d0e1f09',
      'e0a1b2c3-0010-4d5e-8f6a-7b8c9d0e1f10',
      'e0a1b2c3-0011-4d5e-8f6a-7b8c9d0e1f11',
      'e0a1b2c3-0012-4d5e-8f6a-7b8c9d0e1f12',
      'e0a1b2c3-0013-4d5e-8f6a-7b8c9d0e1f13',
      'e0a1b2c3-0014-4d5e-8f6a-7b8c9d0e1f14',
      'e0a1b2c3-0015-4d5e-8f6a-7b8c9d0e1f15',
      'e0a1b2c3-0016-4d5e-8f6a-7b8c9d0e1f16',
      'e0a1b2c3-0017-4d5e-8f6a-7b8c9d0e1f17',
      'e0a1b2c3-0018-4d5e-8f6a-7b8c9d0e1f18',
      'e0a1b2c3-0019-4d5e-8f6a-7b8c9d0e1f19',
      'e0a1b2c3-0020-4d5e-8f6a-7b8c9d0e1f20',
    ],
    memberCount: 20,
    lastMessage: 'Reminder: Monthly team meeting this Friday at 2 PM.',
    lastMessageAt: '2026-02-25T08:30:00Z',
    unreadCount: 2,
    createdBy: 'e0a1b2c3-0001-4d5e-8f6a-7b8c9d0e1f01',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'ch-002',
    name: '#development',
    description: 'Development team discussions, code reviews, and technical topics',
    type: 'PUBLIC',
    members: [
      'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
      'e0a1b2c3-0005-4d5e-8f6a-7b8c9d0e1f05',
      'e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06',
      'e0a1b2c3-0007-4d5e-8f6a-7b8c9d0e1f07',
      'e0a1b2c3-0008-4d5e-8f6a-7b8c9d0e1f08',
      'e0a1b2c3-0009-4d5e-8f6a-7b8c9d0e1f09',
      'e0a1b2c3-0010-4d5e-8f6a-7b8c9d0e1f10',
      'e0a1b2c3-0011-4d5e-8f6a-7b8c9d0e1f11',
      'e0a1b2c3-0012-4d5e-8f6a-7b8c9d0e1f12',
      'e0a1b2c3-0013-4d5e-8f6a-7b8c9d0e1f13',
      'e0a1b2c3-0017-4d5e-8f6a-7b8c9d0e1f17',
      'e0a1b2c3-0018-4d5e-8f6a-7b8c9d0e1f18',
    ],
    memberCount: 12,
    lastMessage: 'PR #142 is ready for review - e-commerce product filtering',
    lastMessageAt: '2026-02-25T09:15:00Z',
    unreadCount: 5,
    createdBy: 'e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'ch-003',
    name: '#design',
    description: 'Design team discussions, inspiration, and feedback',
    type: 'PUBLIC',
    members: [
      'e0a1b2c3-0005-4d5e-8f6a-7b8c9d0e1f05',
      'e0a1b2c3-0014-4d5e-8f6a-7b8c9d0e1f14',
      'e0a1b2c3-0015-4d5e-8f6a-7b8c9d0e1f15',
      'e0a1b2c3-0016-4d5e-8f6a-7b8c9d0e1f16',
      'e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06',
      'e0a1b2c3-0009-4d5e-8f6a-7b8c9d0e1f09',
    ],
    memberCount: 6,
    lastMessage: 'Updated Figma link for the property portal agent dashboard',
    lastMessageAt: '2026-02-24T17:00:00Z',
    unreadCount: 1,
    createdBy: 'e0a1b2c3-0014-4d5e-8f6a-7b8c9d0e1f14',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'ch-004',
    name: '#project-alpha',
    description: 'Private channel for Mobile Banking App project team',
    type: 'PRIVATE',
    members: [
      'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
      'e0a1b2c3-0007-4d5e-8f6a-7b8c9d0e1f07',
      'e0a1b2c3-0012-4d5e-8f6a-7b8c9d0e1f12',
      'e0a1b2c3-0014-4d5e-8f6a-7b8c9d0e1f14',
      'e0a1b2c3-0017-4d5e-8f6a-7b8c9d0e1f17',
    ],
    memberCount: 5,
    lastMessage: 'Security audit checklist has been shared. Please review.',
    lastMessageAt: '2026-02-24T16:30:00Z',
    unreadCount: 3,
    createdBy: 'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
    createdAt: '2026-02-01T09:00:00Z',
  },
  {
    id: 'ch-005',
    name: 'Tanakorn Phansuwan',
    description: 'Direct message with Tanakorn',
    type: 'DIRECT',
    members: [
      'e0a1b2c3-0001-4d5e-8f6a-7b8c9d0e1f01',
      'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
    ],
    memberCount: 2,
    lastMessage: 'Noted, I will prepare the timeline by tomorrow.',
    lastMessageAt: '2026-02-25T10:00:00Z',
    unreadCount: 0,
    createdBy: 'e0a1b2c3-0001-4d5e-8f6a-7b8c9d0e1f01',
    createdAt: '2026-01-05T09:00:00Z',
  },
];

// ──────────────────────────────────────────────
// 15 Messages across channels
// ──────────────────────────────────────────────

export const mockMessages: Message[] = [
  // ── #general (3 messages) ──
  {
    id: 'msg-001',
    channelId: 'ch-001',
    senderId: 'e0a1b2c3-0001-4d5e-8f6a-7b8c9d0e1f01',
    senderName: 'Somchai Wongsakul',
    content: 'Good morning everyone! Just a heads up - we have a company-wide meeting this Friday at 2 PM to discuss Q1 goals and project updates. Please prepare your team summaries.',
    type: 'TEXT',
    reactions: [
      { emoji: '👍', users: ['e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04', 'e0a1b2c3-0005-4d5e-8f6a-7b8c9d0e1f05'] },
    ],
    isEdited: false,
    createdAt: '2026-02-25T08:15:00Z',
  },
  {
    id: 'msg-002',
    channelId: 'ch-001',
    senderId: 'e0a1b2c3-0002-4d5e-8f6a-7b8c9d0e1f02',
    senderName: 'Nida Kaewmanee',
    content: 'Reminder: Monthly team meeting this Friday at 2 PM. Also, please submit your timesheet for February by end of this week.',
    type: 'TEXT',
    reactions: [],
    isEdited: false,
    createdAt: '2026-02-25T08:30:00Z',
  },
  {
    id: 'msg-003',
    channelId: 'ch-001',
    senderId: 'e0a1b2c3-0019-4d5e-8f6a-7b8c9d0e1f19',
    senderName: 'Joyrada Somboon',
    content: 'Great news! We just closed the deal with Pet Paradise for the e-commerce project. Kickoff is planned for April.',
    type: 'TEXT',
    reactions: [
      { emoji: '🎉', users: ['e0a1b2c3-0001-4d5e-8f6a-7b8c9d0e1f01', 'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04', 'e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06'] },
      { emoji: '🚀', users: ['e0a1b2c3-0007-4d5e-8f6a-7b8c9d0e1f07'] },
    ],
    isEdited: false,
    createdAt: '2026-02-24T15:00:00Z',
  },

  // ── #development (5 messages) ──
  {
    id: 'msg-004',
    channelId: 'ch-002',
    senderId: 'e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06',
    senderName: 'Peemwit Chaiyo',
    content: 'PR #142 is ready for review - e-commerce product filtering with category tree, price range, and brand filters. @Bankitti could you take a look at the API side?',
    type: 'TEXT',
    reactions: [],
    isEdited: false,
    createdAt: '2026-02-25T09:15:00Z',
  },
  {
    id: 'msg-005',
    channelId: 'ch-002',
    senderId: 'e0a1b2c3-0007-4d5e-8f6a-7b8c9d0e1f07',
    senderName: 'Bankitti Rodprasert',
    content: 'Sure, I will review it this afternoon. Also, I pushed the API rate limiting middleware yesterday. Can someone test the endpoints?',
    type: 'TEXT',
    reactions: [
      { emoji: '👍', users: ['e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06'] },
    ],
    isEdited: false,
    createdAt: '2026-02-25T09:20:00Z',
  },
  {
    id: 'msg-006',
    channelId: 'ch-002',
    senderId: 'e0a1b2c3-0012-4d5e-8f6a-7b8c9d0e1f12',
    senderName: 'Earthakorn Suktham',
    content: 'Heads up - I found a potential N+1 query issue in the property listing endpoint. Working on a fix with query batching. Will push later today.',
    type: 'TEXT',
    reactions: [],
    isEdited: false,
    createdAt: '2026-02-25T09:45:00Z',
  },
  {
    id: 'msg-007',
    channelId: 'ch-002',
    senderId: 'e0a1b2c3-0017-4d5e-8f6a-7b8c9d0e1f17',
    senderName: 'Beamsin Pattanawong',
    content: 'Just finished E2E tests for the restaurant booking flow. 3 failing tests on the review module - @Palmarin can you check the component rendering order?',
    type: 'TEXT',
    reactions: [],
    isEdited: false,
    createdAt: '2026-02-25T10:00:00Z',
  },
  {
    id: 'msg-008',
    channelId: 'ch-002',
    senderId: 'e0a1b2c3-0013-4d5e-8f6a-7b8c9d0e1f13',
    senderName: 'Palmarin Narongrit',
    content: 'Looking into it now. I think it is the async state update in the star rating component. Will fix and push soon.',
    type: 'TEXT',
    reactions: [],
    isEdited: false,
    createdAt: '2026-02-25T10:10:00Z',
  },

  // ── #design (3 messages) ──
  {
    id: 'msg-009',
    channelId: 'ch-003',
    senderId: 'e0a1b2c3-0014-4d5e-8f6a-7b8c9d0e1f14',
    senderName: 'Icenipa Artcharoen',
    content: 'I have uploaded the mobile banking app wireframes to Figma. Please review and leave comments by Thursday. Link in the project channel.',
    type: 'TEXT',
    reactions: [
      { emoji: '👀', users: ['e0a1b2c3-0015-4d5e-8f6a-7b8c9d0e1f15', 'e0a1b2c3-0016-4d5e-8f6a-7b8c9d0e1f16'] },
    ],
    isEdited: false,
    createdAt: '2026-02-24T14:00:00Z',
  },
  {
    id: 'msg-010',
    channelId: 'ch-003',
    senderId: 'e0a1b2c3-0015-4d5e-8f6a-7b8c9d0e1f15',
    senderName: 'Bambimol Paisarn',
    content: 'Updated Figma link for the property portal agent dashboard. I changed the color scheme to match the client brand guide. Let me know what you think!',
    type: 'TEXT',
    reactions: [
      { emoji: '🎨', users: ['e0a1b2c3-0014-4d5e-8f6a-7b8c9d0e1f14'] },
    ],
    isEdited: true,
    createdAt: '2026-02-24T17:00:00Z',
  },
  {
    id: 'msg-011',
    channelId: 'ch-003',
    senderId: 'e0a1b2c3-0016-4d5e-8f6a-7b8c9d0e1f16',
    senderName: 'Gunticha Lamsam',
    content: 'XYZ Ltd approved the brand style guide. Starting on the icon set tomorrow. Does anyone have the vector source files for the current logo?',
    type: 'TEXT',
    reactions: [],
    isEdited: false,
    createdAt: '2026-02-24T11:30:00Z',
  },

  // ── #project-alpha (2 messages) ──
  {
    id: 'msg-012',
    channelId: 'ch-004',
    senderId: 'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
    senderName: 'Tanakorn Phansuwan',
    content: 'Team, I had a meeting with Thai Finance Bank today. They confirmed the security requirements - we need PCI DSS Level 2 compliance. I am sharing the full checklist now.',
    type: 'TEXT',
    reactions: [],
    isEdited: false,
    createdAt: '2026-02-24T16:00:00Z',
  },
  {
    id: 'msg-013',
    channelId: 'ch-004',
    senderId: 'e0a1b2c3-0007-4d5e-8f6a-7b8c9d0e1f07',
    senderName: 'Bankitti Rodprasert',
    content: 'Security audit checklist has been shared. Please review. I recommend we also engage a third-party pen testing firm. Will draft a proposal for the additional budget.',
    type: 'TEXT',
    reactions: [
      { emoji: '✅', users: ['e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04', 'e0a1b2c3-0012-4d5e-8f6a-7b8c9d0e1f12'] },
    ],
    isEdited: false,
    createdAt: '2026-02-24T16:30:00Z',
  },

  // ── DM with Tanakorn (2 messages) ──
  {
    id: 'msg-014',
    channelId: 'ch-005',
    senderId: 'e0a1b2c3-0001-4d5e-8f6a-7b8c9d0e1f01',
    senderName: 'Somchai Wongsakul',
    content: 'Tanakorn, can you prepare a project timeline for the Thai Finance Bank proposal? The board wants to see a detailed Gantt chart by next Monday.',
    type: 'TEXT',
    reactions: [],
    isEdited: false,
    createdAt: '2026-02-25T09:50:00Z',
  },
  {
    id: 'msg-015',
    channelId: 'ch-005',
    senderId: 'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
    senderName: 'Tanakorn Phansuwan',
    content: 'Noted, I will prepare the timeline by tomorrow. I will include resource allocation and risk factors as well. Should I also include the cost breakdown?',
    type: 'TEXT',
    reactions: [],
    isEdited: false,
    createdAt: '2026-02-25T10:00:00Z',
  },
];

// ──────────────────────────────────────────────
// 4 Announcements
// ──────────────────────────────────────────────

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-001',
    title: 'Monthly Team Meeting - February 28',
    content: 'Our monthly all-hands meeting is scheduled for Friday, February 28 at 2:00 PM in the main conference room. We will review Q1 progress, project updates from each team, and discuss upcoming goals. Lunch will be provided. Please ensure your team summaries are ready by Thursday EOD.',
    priority: 'NORMAL',
    authorId: 'e0a1b2c3-0001-4d5e-8f6a-7b8c9d0e1f01',
    authorName: 'Somchai Wongsakul',
    isPinned: true,
    readBy: [
      'e0a1b2c3-0002-4d5e-8f6a-7b8c9d0e1f02',
      'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
      'e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06',
      'e0a1b2c3-0007-4d5e-8f6a-7b8c9d0e1f07',
      'e0a1b2c3-0014-4d5e-8f6a-7b8c9d0e1f14',
      'e0a1b2c3-0019-4d5e-8f6a-7b8c9d0e1f19',
    ],
    createdAt: '2026-02-24T09:00:00Z',
    updatedAt: '2026-02-24T09:00:00Z',
  },
  {
    id: 'ann-002',
    title: 'New Remote Work Policy Update',
    content: 'Starting March 1, 2026, we are updating our remote work policy. Employees may work from home up to 2 days per week with manager approval. Please submit WFH requests at least 1 day in advance through the HR module. Core office hours remain 9:00 AM - 12:00 PM for in-office days.',
    priority: 'IMPORTANT',
    authorId: 'e0a1b2c3-0002-4d5e-8f6a-7b8c9d0e1f02',
    authorName: 'Nida Kaewmanee',
    isPinned: true,
    readBy: [
      'e0a1b2c3-0001-4d5e-8f6a-7b8c9d0e1f01',
      'e0a1b2c3-0003-4d5e-8f6a-7b8c9d0e1f03',
      'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
      'e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06',
      'e0a1b2c3-0008-4d5e-8f6a-7b8c9d0e1f08',
    ],
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-02-20T10:00:00Z',
  },
  {
    id: 'ann-003',
    title: 'Songkran Holiday Schedule 2026',
    content: 'The office will be closed from April 13-15, 2026 for Songkran. If you plan to take additional days off, please submit your leave requests by March 15. Emergency on-call rotation will be shared separately for projects with active SLAs.',
    priority: 'NORMAL',
    authorId: 'e0a1b2c3-0002-4d5e-8f6a-7b8c9d0e1f02',
    authorName: 'Nida Kaewmanee',
    isPinned: false,
    readBy: [
      'e0a1b2c3-0001-4d5e-8f6a-7b8c9d0e1f01',
      'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
    ],
    createdAt: '2026-02-18T09:00:00Z',
    updatedAt: '2026-02-18T09:00:00Z',
  },
  {
    id: 'ann-004',
    title: 'System Maintenance - Saturday, March 1',
    content: 'Scheduled maintenance for our internal systems (Supabase, Vercel, and monitoring tools) will take place on Saturday, March 1 from 10:00 PM to 2:00 AM. During this window, the WAMS platform and staging environments may be intermittently unavailable. Please plan accordingly.',
    priority: 'URGENT',
    authorId: 'e0a1b2c3-0007-4d5e-8f6a-7b8c9d0e1f07',
    authorName: 'Bankitti Rodprasert',
    isPinned: true,
    readBy: [
      'e0a1b2c3-0004-4d5e-8f6a-7b8c9d0e1f04',
      'e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06',
      'e0a1b2c3-0012-4d5e-8f6a-7b8c9d0e1f12',
    ],
    createdAt: '2026-02-25T08:00:00Z',
    updatedAt: '2026-02-25T08:00:00Z',
  },
];

// ──────────────────────────────────────────────
// 4 Wiki Articles
// ──────────────────────────────────────────────

export const mockWikiArticles: WikiArticle[] = [
  {
    id: 'wiki-001',
    slug: 'onboarding-guide',
    title: 'New Employee Onboarding Guide',
    content: `# New Employee Onboarding Guide

Welcome to WAMS! This guide will help you get started.

## Day 1 Checklist
- Receive laptop and equipment from IT
- Set up email and Slack accounts
- Complete HR paperwork with Ploynapas
- Access WAMS platform at wams.co.th
- Meet your team lead and buddy

## Tools We Use
- **Code**: VS Code, GitHub, Cursor
- **Design**: Figma, Adobe CC
- **Communication**: WAMS Chat, LINE
- **Project Management**: WAMS Projects
- **Deployment**: Vercel, Supabase

## Important Links
- HR Portal: /hr
- Project Board: /projects
- Time Tracking: /hr/attendance
- Wiki: /chat/wiki

## Contacts
- HR: Nida (นิด) or Ploynapas (พลอย)
- IT: Bankitti (แบงค์)
- Admin: Ploynapas (พลอย)`,
    category: 'HR & Admin',
    tags: ['onboarding', 'new-employee', 'getting-started'],
    authorId: 'e0a1b2c3-0002-4d5e-8f6a-7b8c9d0e1f02',
    authorName: 'Nida Kaewmanee',
    lastEditedBy: 'e0a1b2c3-0003-4d5e-8f6a-7b8c9d0e1f03',
    lastEditedByName: 'Ploynapas Srisuk',
    viewCount: 45,
    createdAt: '2026-01-05T09:00:00Z',
    updatedAt: '2026-02-10T14:00:00Z',
  },
  {
    id: 'wiki-002',
    slug: 'coding-standards',
    title: 'Coding Standards & Best Practices',
    content: `# Coding Standards & Best Practices

## General Rules
- Use TypeScript strict mode for all projects
- Follow ESLint + Prettier configuration
- Write meaningful commit messages (conventional commits)
- Create PR with description and screenshots

## Frontend (Next.js)
- Use App Router (not Pages Router)
- Server Components by default, "use client" only when needed
- Tailwind CSS for styling (no inline styles)
- Shadcn/ui for component library
- Use \`@/\` path alias for imports

## Backend (Supabase)
- Row Level Security (RLS) on all tables
- Use database functions for complex queries
- Type-safe queries with generated types
- Edge Functions for custom logic

## Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] No \`any\` types without justification
- [ ] Error handling is implemented
- [ ] Loading and empty states are handled
- [ ] Mobile responsive design verified
- [ ] Accessibility (a11y) basics covered`,
    category: 'Engineering',
    tags: ['coding', 'standards', 'nextjs', 'typescript', 'best-practices'],
    authorId: 'e0a1b2c3-0006-4d5e-8f6a-7b8c9d0e1f06',
    authorName: 'Peemwit Chaiyo',
    lastEditedBy: 'e0a1b2c3-0007-4d5e-8f6a-7b8c9d0e1f07',
    lastEditedByName: 'Bankitti Rodprasert',
    viewCount: 128,
    createdAt: '2026-01-10T09:00:00Z',
    updatedAt: '2026-02-15T11:00:00Z',
  },
  {
    id: 'wiki-003',
    slug: 'design-guidelines',
    title: 'Design System & Guidelines',
    content: `# Design System & Guidelines

## Brand Colors
- Primary: #6366F1 (Indigo 500)
- Secondary: #8B5CF6 (Violet 500)
- Success: #22C55E (Green 500)
- Warning: #F59E0B (Amber 500)
- Error: #EF4444 (Red 500)

## Typography
- Headings: Inter (Bold)
- Body: Inter (Regular)
- Code: JetBrains Mono
- Thai: Noto Sans Thai

## Component Library
We use Shadcn/ui as our base component library.
Customize in \`components/ui/\` directory.

## Figma Organization
- /Brand - Logo, colors, typography
- /Components - Reusable UI components
- /Projects - Project-specific designs
- /Archive - Completed project designs

## Handoff Process
1. Designer marks frames as "Ready for Dev"
2. Add dev notes in Figma comments
3. Export assets to shared drive
4. Tag developer in #design channel`,
    category: 'Design',
    tags: ['design', 'brand', 'figma', 'ui-components'],
    authorId: 'e0a1b2c3-0014-4d5e-8f6a-7b8c9d0e1f14',
    authorName: 'Icenipa Artcharoen',
    lastEditedBy: 'e0a1b2c3-0015-4d5e-8f6a-7b8c9d0e1f15',
    lastEditedByName: 'Bambimol Paisarn',
    viewCount: 67,
    createdAt: '2026-01-12T09:00:00Z',
    updatedAt: '2026-02-08T15:00:00Z',
  },
  {
    id: 'wiki-004',
    slug: 'deployment-process',
    title: 'Deployment Process & CI/CD',
    content: `# Deployment Process & CI/CD

## Environments
- **Development**: Auto-deploy from \`dev\` branch
- **Staging**: Auto-deploy from \`staging\` branch
- **Production**: Manual deploy from \`main\` branch (requires approval)

## Deployment Steps
1. Create PR from feature branch to \`dev\`
2. Pass all CI checks (lint, type-check, tests)
3. Get at least 1 code review approval
4. Merge to \`dev\` -> auto-deploys to dev environment
5. QA testing on dev environment
6. Merge \`dev\` to \`staging\` -> auto-deploys to staging
7. Client UAT on staging
8. Create release PR from \`staging\` to \`main\`
9. PM approves production deployment
10. Merge to \`main\` -> triggers production deploy

## Rollback Procedure
- Vercel: Use instant rollback from dashboard
- Database: Run migration rollback script
- Contact Bankitti for emergency rollbacks

## Monitoring
- Vercel Analytics for performance
- Sentry for error tracking
- Supabase Dashboard for database health`,
    category: 'Engineering',
    tags: ['deployment', 'ci-cd', 'vercel', 'devops'],
    authorId: 'e0a1b2c3-0007-4d5e-8f6a-7b8c9d0e1f07',
    authorName: 'Bankitti Rodprasert',
    lastEditedBy: 'e0a1b2c3-0012-4d5e-8f6a-7b8c9d0e1f12',
    lastEditedByName: 'Earthakorn Suktham',
    viewCount: 89,
    createdAt: '2026-01-08T09:00:00Z',
    updatedAt: '2026-02-20T09:00:00Z',
  },
];
