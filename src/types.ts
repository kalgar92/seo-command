import { LucideIcon } from 'lucide-react';

export interface Command {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  action: () => void;
}