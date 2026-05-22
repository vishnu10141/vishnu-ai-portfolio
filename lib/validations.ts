import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  category: z.string().min(2, "Category is required"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(250, "Short description is too long"),
  detailedOverview: z.string().min(10, "Overview is required"),
  outcomes: z.string().optional(),
  applications: z.string().optional(),
  librariesUsed: z.array(z.string()).optional(),
  technologies: z.array(z.string()).min(1, "Add at least one technology"),
  sampleCode: z.string().optional(),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  demoUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  status: z.enum(['draft', 'published']),
  featured: z.boolean(),
  researchType: z.enum(['Applied', 'Fundamental', 'Review', 'Engineering']),
  completionDate: z.string().min(1, "Completion date is required"),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
