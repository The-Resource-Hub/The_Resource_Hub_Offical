
import { LucideIcon } from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  files?: { name: string; type: 'image' | 'document'; url: string; size?: string }[];
  model?: 'fast' | 'thinking' | 'reasoning' | 'research';
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  lastUpdated: string;
}

export interface AIModel {
  id: 'fast' | 'thinking' | 'reasoning' | 'research';
  label: string;
  icon: LucideIcon;
  color: string;
  desc: string;
}
