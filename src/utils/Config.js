/**
 * 
 */

export const Config = {
    sessionCookieName: import.meta.env.SESSION_NAME || 'mystock',
    maxFileSize: Number(import.meta.env.MAX_FILE_SIZE) * 1024 * 1024  || 5 * 1024 * 1024,
}