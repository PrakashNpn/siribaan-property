import { prisma } from '@/lib/prisma'
import { PropertyFormData, UnitTypeFormData } from '../validation'

const withUnitTypes = { unitTypes: { orderBy: { priceMin: 'asc' as const } } }

export const propertyRepository = {
  findAll: async (
    filters?: { location?: string; minPrice?: number; maxPrice?: number; type?: string },
    pagination?: { page?: number; pageSize?: number }
  ) => {
    const page = pagination?.page ?? 1
    const pageSize = pagination?.pageSize ?? 9
    const skip = (page - 1) * pageSize

    const where = {
      status: 'active',
      ...(filters?.location && { location: { contains: filters.location, mode: 'insensitive' as const } }),
      ...(filters?.type && filters.type !== 'All' && { type: filters.type }),
      ...((filters?.minPrice !== undefined || filters?.maxPrice !== undefined) && {
        unitTypes: {
          some: {
            ...(filters?.minPrice ? { priceMin: { gte: filters.minPrice } } : {}),
            ...(filters?.maxPrice ? { priceMin: { lte: filters.maxPrice } } : {}),
          },
        },
      }),
    }

    const [properties, total] = await prisma.$transaction([
      prisma.property.findMany({ where, skip, take: pageSize, orderBy: { createdAt: 'desc' }, include: withUnitTypes }),
      prisma.property.count({ where }),
    ])

    return { properties, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
  },

  findById: async (id: string) => {
    return prisma.property.findUnique({ where: { id }, include: withUnitTypes })
  },

  findFeatured: async (limit = 4) => {
    return prisma.property.findMany({
      where: { status: 'active', featured: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: withUnitTypes,
    })
  },

  findRecommended: async (excludeId: string, limit = 3) => {
    return prisma.property.findMany({
      where: { status: 'active', id: { not: excludeId } },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: withUnitTypes,
    })
  },

  create: async (data: PropertyFormData) => {
    return prisma.property.create({ data, include: withUnitTypes })
  },

  createWithUnitTypes: async (data: PropertyFormData, unitTypes: UnitTypeFormData[]) => {
    return prisma.property.create({
      data: {
        ...data,
        unitTypes: unitTypes.length > 0 ? { create: unitTypes } : undefined,
      },
      include: withUnitTypes,
    })
  },

  update: async (id: string, data: Partial<PropertyFormData>) => {
    return prisma.property.update({ where: { id }, data, include: withUnitTypes })
  },

  delete: async (id: string) => {
    return prisma.property.delete({ where: { id } })
  },

  findAllAdmin: async () => {
    return prisma.property.findMany({ orderBy: { createdAt: 'desc' }, include: withUnitTypes })
  },

  createUnitType: async (propertyId: string, data: UnitTypeFormData) => {
    return prisma.unitType.create({ data: { ...data, propertyId } })
  },

  updateUnitType: async (id: string, data: Partial<UnitTypeFormData>) => {
    return prisma.unitType.update({ where: { id }, data })
  },

  deleteUnitType: async (id: string) => {
    return prisma.unitType.delete({ where: { id } })
  },
}
