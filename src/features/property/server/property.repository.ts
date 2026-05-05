import { prisma } from '@/lib/prisma'
import { PropertyFormData } from '../validation'

export const propertyRepository = {
  findAll: async (filters?: { location?: string; minPrice?: number; maxPrice?: number; type?: string }) => {
    return prisma.property.findMany({
      where: {
        status: 'active',
        ...(filters?.location && { location: { contains: filters.location, mode: 'insensitive' } }),
        ...(filters?.type && filters.type !== 'All' && { type: filters.type }),
        ...(filters?.minPrice !== undefined || filters?.maxPrice !== undefined ? {
          price: {
            ...(filters?.minPrice ? { gte: filters.minPrice } : {}),
            ...(filters?.maxPrice ? { lte: filters.maxPrice } : {}),
          }
        } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  findById: async (id: string) => {
    return prisma.property.findUnique({ where: { id } })
  },

  findFeatured: async (limit = 4) => {
    return prisma.property.findMany({
      where: { status: 'active' },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
  },

  findRecommended: async (excludeId: string, limit = 3) => {
    return prisma.property.findMany({
      where: { status: 'active', id: { not: excludeId } },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
  },

  create: async (data: PropertyFormData) => {
    return prisma.property.create({ data })
  },

  update: async (id: string, data: Partial<PropertyFormData>) => {
    return prisma.property.update({ where: { id }, data })
  },

  delete: async (id: string) => {
    return prisma.property.delete({ where: { id } })
  },

  findAllAdmin: async () => {
    return prisma.property.findMany({ orderBy: { createdAt: 'desc' } })
  },
}
