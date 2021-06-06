import React from 'react';
import { createRoot } from 'react-dom';

import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    createRoot(root).render(<App />);
  } else {
    throw Error('Root element not found');
  }
});
