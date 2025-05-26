#!/usr/bin/env tsx

import { z } from 'zod';
import { execSync } from 'child_process';

// Zod schema for CLI arguments
const argSchema = z.object({
  scope: z.string().regex(/^[\w.-]+$/),
  dbName: z.string().regex(/^[\w.-]+$/),
  migrationName: z.string().regex(/^[\w.-]+$/),
  custom: z.boolean().optional(),
});

// Parse CLI args
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(
    'Usage: tsx scripts/drizzle-migrations.ts <scope> <dbName> <migrationName> [--custom]'
  );
  process.exit(1);
}

const [scope, dbName, migrationName, ...rest] = args;
const custom = rest.includes('--custom');

// Validate inputs
const parsed = argSchema.safeParse({ scope, dbName, migrationName, custom });
if (!parsed.success) {
  console.error('Invalid arguments:', parsed.error.format());
  process.exit(1);
}

// Build paths
const schemaPath = `libs/product-domain/backend/src/${scope}/infrastructure/drizzle/schemas/${dbName}`;
const outPath = `libs/product-domain/backend/src/${scope}/infrastructure/drizzle/migrations/${dbName}`;

// Build drizzle-kit command
let drizzleCmd = `npx drizzle-kit generate`;

drizzleCmd += ` --dialect "postgresql" --schema "${schemaPath}" --out "${outPath}" --name "${migrationName}"`;

if (custom) {
  drizzleCmd += ' --custom';
}

try {
  execSync(drizzleCmd, { stdio: 'inherit' });
  console.log('Migration created successfully.');
} catch (err) {
  console.error('Error running drizzle-kit:', '\n', err);
  process.exit(1);
}
