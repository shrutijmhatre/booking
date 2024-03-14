import { z } from 'zod';

export const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  isAdmin:z.boolean(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});