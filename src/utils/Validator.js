import { z } from 'astro:schema';
import { Config } from './config';

const MAX_FILE_SIZE = Config.maxFileSize
const ACCEPTED_IMAGE_TYPES = [
 'image/jpeg',
 'image/jpg',
 'image/png',
 'image/webp',
]
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

export const categoryValidator = () => {
    return z.object({
        category: z.string().min(1).trim(),
        old: z.string().min(1).trim().optional()
    })
}

export const productValidator = () => {
    return z.object({
        name: z.string().min(1).trim().toLowerCase(),
        brand: z.string().min(1).trim(),
        category: z.string().min(1).trim(),
        description: z.string().min(1).trim().optional(),
        spec: z.string().array(),
        'spec-details': z.string().array(),
        image1: z
        .instanceof(File)
        .refine((file) => (((file?.size > 0) && (ACCEPTED_IMAGE_TYPES?.includes(file?.type))) || ( file?.name === '')), { 
          message: `.jpg, .jpeg, .png and .webp files are accepted.`,
         })
        .refine((file) => file?.size <= MAX_FILE_SIZE, {
          message: `Max file size is ${MAX_FILE_SIZE/1024/1024} MB.`,
         }),
         image2: z
        .instanceof(File)
        .refine((file) => (((file?.size > 0) && (ACCEPTED_IMAGE_TYPES?.includes(file?.type))) || ( file?.name === '')), { 
          message: `.jpg, .jpeg, .png and .webp files are accepted.`,
         })
        .refine((file) => file?.size <= MAX_FILE_SIZE, {
          message: `Max file size is ${MAX_FILE_SIZE/1024/1024} MB.`,
         }),
         image3: z
        .instanceof(File)
        .refine((file) => (((file?.size > 0) && (ACCEPTED_IMAGE_TYPES?.includes(file?.type))) || ( file?.name === '')), { 
          message: `.jpg, .jpeg, .png and .webp files are accepted.`,
         })
        .refine((file) => file?.size <= MAX_FILE_SIZE, {
          message: `Max file size is ${MAX_FILE_SIZE/1024/1024} MB.`,
         }),
    })
}