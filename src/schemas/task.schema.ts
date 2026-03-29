import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    content: z.string().optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    content: z.string().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});