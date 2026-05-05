import { prisma } from '@/lib/prisma'
import { InquiryFormData } from '../validation'

export const inquiryService = {
  create: async (data: InquiryFormData) => {
    return prisma.inquiry.create({ data })
  },
}
