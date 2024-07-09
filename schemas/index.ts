import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(1, { message: 'Password is required' }),
  code: z.optional(z.string().trim()),
});

export const RegisterSchema = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(2, { message: 'Minimum 2 characters required' }),
  name: z.string().trim().min(1, { message: 'Name is required' }),
});

export const ResetSchema = z.object({
  email: z.string().trim().email(),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(2, { message: 'Minimum 2 characters required' }),
});

export const SettingsSchema = z.object({
  name: z.optional(z.string().trim().min(1, { message: 'Name is required' })),
  email: z.optional(z.string().trim().email()),
});
