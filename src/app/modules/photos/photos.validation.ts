import { z } from 'zod';

const createPhotosZodSchema = z.object({
  body: z.object({
    url: z.string({
      required_error: 'Url is required ',
    }),
    name: z.string().optional(),
  }),
});

const updatePhotosZodSchema = z.object({
  body: z.object({
    url: z.string().optional(),
    name: z.string().optional(),
  }),
});

export const PhotosValidation = {
  createPhotosZodSchema,
  updatePhotosZodSchema,
};
