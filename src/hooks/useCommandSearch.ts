import { useMemo } from 'react';
import type { Command } from '../types';

export const useCommandSearch = (commands: Command[], query: string) => {
  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    
    const searchTerms = query.toLowerCase().split(' ');
    
    return commands.filter((command) => {
      const searchString = `${command.title} ${command.description}`.toLowerCase();
      return searchTerms.every((term) => searchString.includes(term));
    });
  }, [commands, query]);

  return { filteredCommands };
};