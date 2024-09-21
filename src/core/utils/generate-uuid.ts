export default function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

/*
 * Example usage:
 * 
 * const uuid1 = generateUUID();
 * console.log(uuid1); // Output: a random UUID string, e.g., "123e4567-e89b-12d3-a456-426614174000"
 * 
 * const uuid2 = generateUUID();
 * console.log(uuid2); // Output: another random UUID string, e.g., "234e5678-f90g-34h5-i678-567890jkl012"
 */
