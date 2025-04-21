import { vi } from 'vitest';

import '@testing-library/jest-dom';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: () => ({
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
  }),
}));
