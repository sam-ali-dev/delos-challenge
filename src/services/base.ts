// import { Pool, types } from "pg";
// import { DBConfig } from "configuration";
// import { Database } from "models";
// import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";


// declare module "models" {
//   export interface Database {
//     pgClass: {
//       reltuples: number;
//       relname: string;
//     };
//   }
// }

// types.setTypeParser(types.builtins.INT8, Number);

// types.setTypeParser(types.builtins.BYTEA, (value) => {
//   return Buffer.from(value.slice(2), "hex");
// });

// const dialect = new PostgresDialect({
//   pool: new Pool({
//     host: DBConfig.DB_HOST,
//     port: DBConfig.DB_PORT,
//     user: DBConfig.DB_USER,
//     password: DBConfig.DB_PASSWORD,
//     database: DBConfig.DB_NAME,
//     min: DBConfig.DB_MIN,
//     max: DBConfig.DB_MAX,
//     idleTimeoutMillis: DBConfig.DB_IDLE_TIMEOUT,
//     connectionTimeoutMillis: DBConfig.DB_CONN_TIMEOUT,
//   }),
// });

// export const db = new Kysely<Database>({
//   dialect,
//   plugins: [new CamelCasePlugin()],
// });

// export type TableName = keyof Database;
