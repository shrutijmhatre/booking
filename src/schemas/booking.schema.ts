import { z } from 'zod';

export const bookingSchema = z.object({
  title: z.string(),
  description: z.string(),
});
