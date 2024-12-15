import { z } from 'astro:schema';

export const loginValidator = () => {
   return z.object({
        username: z.string().email().min(1).trim(),
        password: z.string().min(1).trim()
    })
}

export const brandValidator = () => {
    return z.object({
        brand: z.string().min(1).trim()
    })
}
export const updateBrandValidator = () => {
    return z.object({
        brand: z.string().min(1).trim(),
        old: z.string().min(1).trim()
    })
}