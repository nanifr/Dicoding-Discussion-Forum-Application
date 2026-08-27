import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Memastikan setiap komponen yang di-render oleh React Testing Library
// selalu di-unmount setelah masing-masing pengujian selesai, supaya
// pengujian satu sama lain tidak saling memengaruhi (test isolation).
afterEach(() => {
  cleanup();
});
