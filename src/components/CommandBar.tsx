import React, { useState, useEffect, useRef } from 'react';
import { Search, Command } from 'lucide-react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useCommandSearch } from '../hooks/useCommandSearch';
import { useClickOutside } from '../hooks/useClickOutside';
import { commands } from '../data/commands';

export const CommandBar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { filteredCommands } = useCommandSearch(commands, query);
  const { selectedIndex, setSelectedIndex, handleKeyDown } = useKeyboardNavigation({
    itemCount: filteredCommands.length,
    onSelect: (index) => {
      filteredCommands[index]?.action();
      onClose();
    },
    onEscape: onClose,
  });

  useClickOutside(containerRef, onClose);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center bg-gray-800/50 backdrop-blur-sm">
        <div
          ref={containerRef}
          className="w-full max-w-2xl p-2 mx-auto mt-[20vh] bg-white rounded-lg shadow-2xl ring-1 ring-black/5 transform transition-all"
        >
          <div className="flex items-center px-3 py-2 border-b">
            <Command className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-1 text-base text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none"
              placeholder="Search commands..."
              autoComplete="off"
            />
            <kbd className="hidden px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded sm:block">
              ESC
            </kbd>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                No commands found
              </div>
            ) : (
              <div className="py-2">
                {filteredCommands.map((command, index) => (
                  <button
                    key={command.id}
                    onClick={() => {
                      command.action();
                      onClose();
                    }}
                    className={`w-full px-4 py-2 text-left transition-colors ${
                      selectedIndex === index
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <command.icon className="w-5 h-5 mr-3" />
                      <div>
                        <div className="font-medium">{command.title}</div>
                        <div className="text-sm text-gray-500">
                          {command.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};