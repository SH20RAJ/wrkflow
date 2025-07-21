// Mock database for Cloudflare Workers deployment

// Create a mock database client that doesn't actually connect
const mockClient = {
  execute: async () => ({ rows: [], columns: [] }),
  batch: async () => [],
  transaction: async () => ({}),
  close: async () => {},
};

// Create a mock drizzle instance
export const db = {
  select: () => ({ from: () => ({ where: () => ({ limit: () => [] }) }) }),
  insert: () => ({ values: () => Promise.resolve() }),
  update: () => ({ set: () => ({ where: () => Promise.resolve() }) }),
  delete: () => ({ where: () => Promise.resolve() }),
  execute: () => Promise.resolve({ rows: [], columns: [] }),
  transaction: () => Promise.resolve({}),
  $client: mockClient,
};
