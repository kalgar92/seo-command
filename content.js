import React from 'react';
import { createRoot } from 'react-dom/client';
import { CommandBar } from './components/CommandBar';

// Create root container
const container = document.createElement('div');
container.id = 'command-bar-root';
document.body.appendChild(container);

const root = createRoot(container);

// State management
let isCommandBarOpen = false;

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    isCommandBarOpen = !isCommandBarOpen;
    render();
  }
});

// Render function
function render() {
  root.render(
    <CommandBar
      isOpen={isCommandBarOpen}
      onClose={() => {
        isCommandBarOpen = false;
        render();
      }}
    />
  );
}

// Initial render
render();