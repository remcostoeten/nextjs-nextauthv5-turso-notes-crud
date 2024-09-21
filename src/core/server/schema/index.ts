/*
 * This file exports all schema-specific index.ts files, which export all individual schema files. This allows to import any schema from 'schema' (which points to this file in the tsconfig).
 *
 */

// All schemas (3) regarding users (profile, sessions, user)
export * from "./users";
