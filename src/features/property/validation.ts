import { z } from 'zod'

export const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  location: z.string().min(1, 'Location is required'),
  address: z.string().min(1, 'Address is required'),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  areaSqm: z.number().positive(),
  parking: z.number().int().min(0),
  type: z.enum(['For Sale', 'For Rent']),
  status: z.enum(['active', 'sold', 'rented']),
  tag: z.string().optional(),
  images: z.array(z.string()),
  amenities: z.array(z.string()),
})

export type PropertyFormData = z.infer<typeof propertySchema>
