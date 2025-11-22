
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  category: 'WEB' | 'MOBILE' | 'SECURITY';
  status: 'DEPLOYED' | 'PROTOTYPE' | 'AUDITED' | 'ARCHIVED';
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum ConnectionStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
