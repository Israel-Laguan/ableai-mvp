/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = [
    ,
    /* 0 */ /* 1 */
    /***/ module => {
      module.exports = require('tslib');

      /***/
    },
    /* 2 */
    /***/ module => {
      module.exports = require('express');

      /***/
    },
    /* 3 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.Shared = void 0;
      const tslib_1 = __webpack_require__(1);
      exports.Shared = tslib_1.__importStar(__webpack_require__(4));

      /***/
    },
    /* 4 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.Infrastructure = void 0;
      const tslib_1 = __webpack_require__(1);
      exports.Infrastructure = tslib_1.__importStar(__webpack_require__(5));

      /***/
    },
    /* 5 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.Drizzle = void 0;
      const tslib_1 = __webpack_require__(1);
      exports.Drizzle = tslib_1.__importStar(__webpack_require__(6));

      /***/
    },
    /* 6 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.Utils = exports.Mocks = void 0;
      const tslib_1 = __webpack_require__(1);
      exports.Mocks = tslib_1.__importStar(__webpack_require__(7));
      exports.Utils = tslib_1.__importStar(__webpack_require__(10));

      /***/
    },
    /* 7 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      const tslib_1 = __webpack_require__(1);
      tslib_1.__exportStar(__webpack_require__(8), exports);

      /***/
    },
    /* 8 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.users = void 0;
      const tslib_1 = __webpack_require__(1);
      const p = tslib_1.__importStar(__webpack_require__(9));
      exports.users = p.pgTable('users', {
        id: p.serial().primaryKey(),
        name: p.text(),
        email: p.text().unique(),
        password: p.text(),
      });

      /***/
    },
    /* 9 */
    /***/ module => {
      module.exports = require('drizzle-orm/pg-core');

      /***/
    },
    /* 10 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      const tslib_1 = __webpack_require__(1);
      tslib_1.__exportStar(__webpack_require__(11), exports);
      tslib_1.__exportStar(__webpack_require__(13), exports);
      tslib_1.__exportStar(__webpack_require__(15), exports);

      /***/
    },
    /* 11 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.createDrizzleExpressSampleCrudRouter = createDrizzleExpressSampleCrudRouter;
      const tslib_1 = __webpack_require__(1);
      const drizzle_orm_1 = __webpack_require__(12);
      const express = tslib_1.__importStar(__webpack_require__(2));
      const devErrLog = ({ action, err }) => {
        if (process.env['NODE_ENV'] === 'development')
          console.warn(`[DEV] Error ${action} item: `, {
            err: err instanceof Error ? err : new Error(String(err)),
          });
      };
      function createDrizzleExpressSampleCrudRouter({ app, db, prefix, table }) {
        const router = express.Router();
        // GET all
        router.get('/', (req, res) =>
          tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
              const items = yield db.select().from(table);
              return res.json(items);
            } catch (err) {
              devErrLog({ action: 'fetching', err });
              return res.status(500).json({ error: 'Error fetching items' });
            }
          })
        );
        // GET by id
        router.get('/:id', (req, res) =>
          tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
              const id = Number(req.params.id);
              const item = yield db
                .select()
                .from(table)
                .where((0, drizzle_orm_1.eq)(table['id'], id));
              if (!item) return res.status(404).json({ error: 'Not found' });
              return res.json(item);
            } catch (err) {
              devErrLog({ action: 'fetching', err });
              return res.status(500).json({ error: 'Error fetching item' });
            }
          })
        );
        // CREATE
        router.post('/', (req, res) =>
          tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
              const created = yield db.insert(table).values(req.body).returning();
              return res.status(201).json(created);
            } catch (err) {
              devErrLog({ action: 'creating', err });
              return res.status(500).json({ error: 'Error creating item' });
            }
          })
        );
        // UPDATE
        router.put('/:id', (req, res) =>
          tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
              const id = Number(req.params.id);
              const updated = yield db
                .update(table)
                .set(req.body)
                .where((0, drizzle_orm_1.eq)(table['id'], id))
                .returning();
              if (!updated) return res.status(404).json({ error: 'Not found' });
              return res.json(updated);
            } catch (err) {
              devErrLog({ action: 'updating', err });
              return res.status(500).json({ error: 'Error updating item' });
            }
          })
        );
        // DELETE
        router.delete('/:id', (req, res) =>
          tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
              const id = Number(req.params.id);
              const deleted = yield db
                .delete(table)
                .where((0, drizzle_orm_1.eq)(table['id'], id))
                .returning();
              if (!deleted) return res.status(404).json({ error: 'Not found' });
              return res.status(204).send();
            } catch (err) {
              devErrLog({ action: 'deleting', err });
              return res.status(500).json({ error: 'Error deleting item' });
            }
          })
        );
        app.use(prefix, router);
      }

      /***/
    },
    /* 12 */
    /***/ module => {
      module.exports = require('drizzle-orm');

      /***/
    },
    /* 13 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.runMigrations = runMigrations;
      const tslib_1 = __webpack_require__(1);
      const migrator_1 = __webpack_require__(14);
      function runMigrations(_a) {
        return tslib_1.__awaiter(this, arguments, void 0, function* ({ db, migrationsFolder }) {
          try {
            yield (0, migrator_1.migrate)(db, {
              migrationsFolder,
            });
            console.log('Migrations ran successfully');
          } catch (error) {
            console.error('Migration error:', error);
            process.exit(1);
          }
        });
      }

      /***/
    },
    /* 14 */
    /***/ module => {
      module.exports = require('drizzle-orm/node-postgres/migrator');

      /***/
    },
    /* 15 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.createDrizzlePostgresDbConnection = createDrizzlePostgresDbConnection;
      const node_postgres_1 = __webpack_require__(16);
      const pg_1 = __webpack_require__(17);
      function createDrizzlePostgresDbConnection(config) {
        const { connectionString } = config;
        const client = new pg_1.Pool({
          connectionString: connectionString,
          ssl: {
            rejectUnauthorized: false,
          },
        });
        return (0, node_postgres_1.drizzle)(client);
      }

      /***/
    },
    /* 16 */
    /***/ module => {
      module.exports = require('drizzle-orm/node-postgres');

      /***/
    },
    /* 17 */
    /***/ module => {
      module.exports = require('pg');

      /***/
    },
    /* 18 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.Shared = void 0;
      const tslib_1 = __webpack_require__(1);
      exports.Shared = tslib_1.__importStar(__webpack_require__(19));

      /***/
    },
    /* 19 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.Utils = void 0;
      const tslib_1 = __webpack_require__(1);
      exports.Utils = tslib_1.__importStar(__webpack_require__(20));

      /***/
    },
    /* 20 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      const tslib_1 = __webpack_require__(1);
      tslib_1.__exportStar(__webpack_require__(21), exports);

      /***/
    },
    /* 21 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.createMigrationsPath = void 0;
      const path_1 = __webpack_require__(22);
      const zod_1 = __webpack_require__(23);
      const fs_1 = __webpack_require__(24);
      const migrationPathConfigSchema = zod_1.z.object({
        domainContext: zod_1.z.string(),
        framework: zod_1.z.string(),
        finalPathPattern: zod_1.z.string().optional(),
        validateExists: zod_1.z.boolean().optional(),
      });
      /**
       * Generates the absolute path to the migrations directory based on the provided configuration,
       * following the conventions of the project's architecture.
       *
       * @param config - The configuration object specifying environment, domain context, framework, and validation options.
       * @returns The resolved absolute path to the migrations directory.
       * @throws If `validateExists` is true and the migrations path does not exist, an error is thrown.
       *
       * This function creates the migration path according to the conventions of the project architecture.
       */
      const createMigrationsPath = config => {
        const { domainContext, framework, finalPathPattern, validateExists } =
          migrationPathConfigSchema.parse(config);
        const segments = [
          process.cwd(),
          'libs',
          'product-domain',
          'backend',
          'src',
          domainContext,
          'infrastructure',
          framework,
          'migrations',
        ];
        if (finalPathPattern) segments.push(finalPathPattern);
        const migrationsPath = (0, path_1.resolve)(...segments);
        if (validateExists && !(0, fs_1.existsSync)(migrationsPath)) {
          throw new Error(`Migrations path does not exist: ${migrationsPath}`);
        }
        return migrationsPath;
      };
      exports.createMigrationsPath = createMigrationsPath;

      /***/
    },
    /* 22 */
    /***/ module => {
      module.exports = require('path');

      /***/
    },
    /* 23 */
    /***/ module => {
      module.exports = require('zod');

      /***/
    },
    /* 24 */
    /***/ module => {
      module.exports = require('fs');

      /***/
    },
    /* 25 */
    /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.env = void 0;
      const tslib_1 = __webpack_require__(1);
      const zod_1 = tslib_1.__importDefault(__webpack_require__(23));
      const envSchema = zod_1.default.object({
        NODE_ENV: zod_1.default.enum(['development', 'production', 'test']),
        GIG_DB_URL: zod_1.default.string(),
        PRIVATE_GIG_DB_URL: zod_1.default.string(),
      });
      exports.env = envSchema.parse(process.env);

      /***/
    },
    /******/
  ];
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
  (() => {
    var exports = __webpack_exports__;

    var _a;
    Object.defineProperty(exports, '__esModule', { value: true });
    const tslib_1 = __webpack_require__(1);
    const express_1 = tslib_1.__importDefault(__webpack_require__(2));
    const backend_1 = __webpack_require__(3);
    const _backend_1 = __webpack_require__(18);
    const env_config_1 = __webpack_require__(25);
    const {
      Infrastructure: {
        Drizzle: {
          Mocks: { users },
          Utils: {
            createDrizzleExpressSampleCrudRouter,
            createDrizzlePostgresDbConnection,
            runMigrations,
          },
        },
      },
    } = backend_1.Shared;
    const {
      Utils: { createMigrationsPath },
    } = _backend_1.Shared;
    // Db connection config
    const gigDb = createDrizzlePostgresDbConnection({
      connectionString: env_config_1.env.GIG_DB_URL,
    });
    const privateGigDb = createDrizzlePostgresDbConnection({
      connectionString: env_config_1.env.PRIVATE_GIG_DB_URL,
    });
    const gigMigrationsPath = createMigrationsPath({
      domainContext: 'shared',
      framework: 'drizzle',
      finalPathPattern: 'gig-migrations',
      validateExists: true,
    });
    const privateGigMigrationsPath = createMigrationsPath({
      domainContext: 'shared',
      framework: 'drizzle',
      finalPathPattern: 'private-gig-migrations',
      validateExists: true,
    });
    // Api config
    const globalPrefix = 'api/auth-api/main';
    const host = (_a = process.env.HOST) !== null && _a !== void 0 ? _a : 'localhost';
    const port = process.env.PORT ? Number(process.env.PORT) : 3002;
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // Routers config
    createDrizzleExpressSampleCrudRouter({
      app,
      db: gigDb,
      table: users,
      prefix: `/${globalPrefix}/gig/users`,
    });
    createDrizzleExpressSampleCrudRouter({
      app,
      db: privateGigDb,
      table: users,
      prefix: `/${globalPrefix}/private-gig/users`,
    });
    app.get('/' + globalPrefix, (req, res) => {
      res.send({ message: 'Hello Auth-API' });
    });
    // API startup
    Promise.all([
      runMigrations({
        db: gigDb,
        migrationsFolder: gigMigrationsPath,
      }),
      runMigrations({
        db: privateGigDb,
        migrationsFolder: privateGigMigrationsPath,
      }),
    ])
      .catch(err => {
        console.error('Error during startup:', err);
        process.exit(1);
      })
      .then(() => {
        app.listen(port, host, () => {
          console.log(`[ ready ] http://${host}:${port}/${globalPrefix}`);
        });
      });
    exports['default'] = app;
  })();

  /******/
})();
