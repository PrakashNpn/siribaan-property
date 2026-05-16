import { z } from 'zod'

export const PROPERTY_TYPES = ['Condo', 'House', 'Villa', 'Townhouse', 'Apartment'] as const
export const PROPERTY_STATUSES = ['active', 'inactive'] as const
export const LISTING_TYPES = ['Sale', 'Rent', 'Sale & Rent'] as const
export const PROJECT_STATUSES = ['Completed', 'Ready to Move', 'Under Construction'] as const

export const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(PROPERTY_TYPES),
  status: z.enum(PROPERTY_STATUSES),
  tag: z.string().optional().nullable(),
  featured: z.boolean(),
  developer: z.string().optional().nullable(),
  listingType: z.enum(LISTING_TYPES),
  projectStatus: z.enum(PROJECT_STATUSES).optional().nullable(),
  startingPrice: z.number().positive().optional().nullable(),
  location: z.string().min(1, 'Location is required'),
  address: z.string().min(1, 'Address is required'),
  mapUrl: z.string().optional().nullable(),
  nearbyPlaces: z.array(z.string()),
  yearBuilt: z.number().int().min(1900).max(2100).optional().nullable(),
  completionDate: z.string().optional().nullable(),
  totalFloors: z.number().int().min(1).optional().nullable(),
  totalUnits: z.number().int().min(1).optional().nullable(),
  images: z.array(z.string()),
  amenities: z.array(z.string()),
})

export type PropertyFormData = z.infer<typeof propertySchema>

export const unitTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  areaSqmMin: z.number().positive('Area must be positive'),
  areaSqmMax: z.number().positive().optional().nullable(),
  parking: z.number().int().min(0),
  images: z.array(z.string()),
})

export type UnitTypeFormData = z.infer<typeof unitTypeSchema>
