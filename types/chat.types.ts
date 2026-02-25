export type ChannelType = 'PUBLIC' | 'PRIVATE' | 'DIRECT';
export type MessageType = 'TEXT' | 'FILE' | 'IMAGE' | 'SYSTEM';

export interface Channel {
  id: string;
  name: string;
  description?: string;
  type: ChannelType;
  members: string[];
  memberCount: number;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  createdBy: string;
  createdAt: string;
}

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: MessageType;
  fileUrl?: string;
  fileName?: string;
  replyTo?: string;
  reactions: { emoji: string; users: string[] }[];
  isEdited: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'NORMAL' | 'IMPORTANT' | 'URGENT';
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  isPinned: boolean;
  readBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WikiArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  authorId: string;
  authorName: string;
  lastEditedBy?: string;
  lastEditedByName?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}
