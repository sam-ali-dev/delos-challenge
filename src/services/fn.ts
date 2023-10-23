// import { SelectQueryBuilder, sql } from "kysely";
// import { db, TableName } from "./base";
// import { Database } from "models";

// export type RowCountMethod = "exact" | "estimate";

// export const table = {
//   count: async (table: TableName, method: RowCountMethod) => {
//     const query =
//       method === "estimate"
//         ? db
//           .selectFrom("pgClass")
//           .select("reltuples as rows")
//           .where("relname", "=", table)
//         : db
//           .selectFrom(table)
//           .select((eb) => eb.fn.countAll<number>().as("rows"));
//     return (await query.executeTakeFirstOrThrow()).rows;
//   },
//   countAs: (table: TableName, method: RowCountMethod, column: string) => {
//     const query =
//       method === "estimate"
//         ? db
//           .selectFrom("pgClass")
//           .select("reltuples as count")
//           .where("relname", "=", table)
//         : db
//           .selectFrom(table)
//           .select((eb) => eb.fn.countAll<number>().as("rows"));
//     return query.as(column);
//   },
// } as const;

// /**
//  * @see https://wiki.postgresql.org/wiki/Count_estimate
//  * @see https://www.postgresql.org/docs/current/sql-explain.html
//  */
// export const query = {
//   count: async <TB extends TableName, O>(
//     query: SelectQueryBuilder<Database, TB, O>,
//     method: RowCountMethod
//   ) => {
//     const params =
//       method === "estimate"
//         ? { analyze: "false", column: "Plan Rows" }
//         : { analyze: "true", column: "Actual Rows" };
//     const explain = await query.explain(
//       "json",
//       sql`analyze ${sql.lit(params.analyze)}`
//     );
//     return explain[0]["QUERY PLAN"][0].Plan[params.column] as number;
//   },
// } as const;
