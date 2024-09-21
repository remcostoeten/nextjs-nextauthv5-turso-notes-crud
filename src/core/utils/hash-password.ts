/**
 * @function hashPassword
 * @description This function hashes a given password using the SHA-256 algorithm.
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} The hashed password as a hexadecimal string.
 *
 * @example
 * // Example 1: Hashing a simple password
 * const hashedPassword1 = await hashPassword('mySecretPassword');
 * console.log(hashedPassword1); // Outputs the SHA-256 hash of 'mySecretPassword'
 *
 * @example
 * // Example 2: Hashing a more complex password
 * const hashedPassword2 = await hashPassword('P@ssw0rd!123');
 * console.log(hashedPassword2); // Outputs the SHA-256 hash of 'P@ssw0rd!123'
 */
export default async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
