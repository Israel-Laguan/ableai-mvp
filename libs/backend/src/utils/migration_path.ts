import { resolve } from 'path';
import { z } from 'zod';
import { existsSync } from 'fs';

interface MigrationPathConfig {
  /**
   * Framework being used for the migrations.
   * This is typically the name of the framework or library.
   * For example, 'drizzle'.
   */
  framework: string;

  /**
   *  Pattern for the final section of the migrations path.
   */
  finalPathPattern?: string;

  /**
   * Flag to indicate whether to validate the existence of the migrations path.
   * If true, an error will be thrown if the path does not exist.
   */
  validateExists?: boolean;
}

const migrationPathConfigSchema = z.object({
  framework: z.string(),
  finalPathPattern: z.string().optional(),
  validateExists: z.boolean().optional(),
});

/**
 * Generates the absolute path to the migrations directory based on the provided configuration,
 * following the conventions of the project's architecture.
 *
 * @param config - The configuration object specifying environment, database name, framework, and validation options.
 * @returns The resolved absolute path to the migrations directory.
 * @throws If `validateExists` is true and the migrations path does not exist, an error is thrown.
 *
 * This function creates the migration path according to the conventions of the project architecture.
 */
export const createMigrationsPath = (config: MigrationPathConfig) => {
  const { framework, finalPathPattern, validateExists } = migrationPathConfigSchema.parse(config);

  const segments = [
    process.cwd(),
    'libs',
    'product-domain',
    'backend',
    'src',
    'shared',
    'infrastructure',
    framework,
    'migrations',
  ];

  if (finalPathPattern) segments.push(finalPathPattern);

  const migrationsPath = resolve(...segments);

  if (validateExists && !existsSync(migrationsPath)) {
    throw new Error(`Migrations path does not exist: ${migrationsPath}`);
  }

  return migrationsPath;
};
