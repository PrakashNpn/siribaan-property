import { z } from 'zod'

export const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(1, 'Phone is required'),
  message: z.string().optional(),
  propertyId: z.string().optional(),
  preferredDate: z.string().optional(),
})

export type InquiryFormData = z.infer<typeof inquirySchema>
