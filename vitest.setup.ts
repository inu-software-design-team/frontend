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
  useSearchParams: () => ({
    entries: vi.fn(() => []),
    forEach: vi.fn(),
    get: vi.fn(() => ''),
    getAll: vi.fn(() => []),
    has: vi.fn(() => false),
    keys: vi.fn(() => []),
    size: vi.fn(() => 0),
    toString: vi.fn(() => ''),
    values: vi.fn(() => []),
  }),
}));
