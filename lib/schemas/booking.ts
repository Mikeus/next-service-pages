import { z } from 'zod';
import { SlugSchema } from './params';

export const BookingRequestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Valid email is required'),
  phone: z
    .string()
    .trim()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^[\d\s()+-]+$/, 'Phone number contains invalid characters'),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Preferred date must be YYYY-MM-DD')
    .optional(),
  preferredTime: z.enum(['morning', 'afternoon', 'evening']).optional(),
  message: z.string().trim().max(2000).optional(),
  city: z.string().trim().min(2).max(100).optional(),
  service: z.string().trim().min(2).max(100).optional(),
});

export type BookingRequest = z.infer<typeof BookingRequestSchema>;

export const BookingSuccessResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: BookingRequestSchema,
});

export type BookingSuccessResponse = z.infer<typeof BookingSuccessResponseSchema>;
