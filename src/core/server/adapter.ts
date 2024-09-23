import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "db";
import { sessionTable, userTable } from "schema";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export default adapter;
