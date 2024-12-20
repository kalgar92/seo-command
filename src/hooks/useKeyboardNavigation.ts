import { useState, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  itemCount: number;
  onSelect: (index: number) => void;
  onEscape: () => void;
}

export const useKeyboardNavigation = ({
  itemCount,
  onSelect,
  onEscape,
}: UseKeyboardNavigationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % itemCount);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + itemCount) % itemCount);
          break;
        case 'Enter':
          event.preventDefault();
          if (itemCount > 0) {
            onSelect(selectedIndex);
          }
          break;
        case 'Escape':
          event.preventDefault();
          onEscape();
          break;
      }
    },
    [itemCount, selectedIndex, onSelect, onEscape]
  );

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
  };
};