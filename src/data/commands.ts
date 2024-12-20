import {
  Search,
  BookOpen,
  Settings,
  History,
  Bookmark,
  Share2,
  Download,
  Printer,
} from 'lucide-react';
import type { Command } from '../types';

export const commands: Command[] = [
  {
    id: 'search',
    title: 'Search',
    description: 'Search the current page',
    icon: Search,
    action: () => {
      document.execCommand('find');
    },
  },
  {
    id: 'reader-mode',
    title: 'Reader Mode',
    description: 'Toggle reader mode for better readability',
    icon: BookOpen,
    action: () => {
      // Implementation would depend on Chrome's Reader Mode API
      console.log('Toggle reader mode');
    },
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Open Chrome settings',
    icon: Settings,
    action: () => {
      chrome.runtime.sendMessage({ action: 'openSettings' });
    },
  },
  {
    id: 'history',
    title: 'History',
    description: 'View browser history',
    icon: History,
    action: () => {
      chrome.runtime.sendMessage({ action: 'openHistory' });
    },
  },
  {
    id: 'bookmarks',
    title: 'Bookmarks',
    description: 'Open bookmarks manager',
    icon: Bookmark,
    action: () => {
      chrome.runtime.sendMessage({ action: 'openBookmarks' });
    },
  },
  {
    id: 'share',
    title: 'Share',
    description: 'Share current page',
    icon: Share2,
    action: () => {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: window.location.href,
        });
      }
    },
  },
  {
    id: 'download',
    title: 'Download Page',
    description: 'Save current page',
    icon: Download,
    action: () => {
      chrome.runtime.sendMessage({ action: 'downloadPage' });
    },
  },
  {
    id: 'print',
    title: 'Print',
    description: 'Print current page',
    icon: Printer,
    action: () => {
      window.print();
    },
  },
];