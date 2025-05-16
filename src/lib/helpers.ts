export const sanitizeName = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z\s]/g, '')           // Remove non-letter characters
        .replace(/\s+/g, ' ')               // Replace multiple spaces with one
        .trim()                             // Remove leading/trailing spaces
        .split(' ')                         // Split into words
        .filter(Boolean)                   // Remove empty entries
        .slice(0, 2)                        // Get first and last word
        .map(word => word[0].toUpperCase() + word.slice(1)) // Capitalize
        .join(' ');
};