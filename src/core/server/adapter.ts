import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "db";
import { sessionTable, userTable } from "./schema/user";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export default adapter;
