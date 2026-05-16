import { prisma, withRetry } from '@/lib/prisma'
import { PropertyFormData, UnitTypeFormData } from '../validation'

const withUnitTypes = { unitTypes: { orderBy: { areaSqmMin: 'asc' as const } } }

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
        ...(filters?.minPrice ? { startingPrice: { gte: filters.minPrice } } : {}),
        ...(filters?.maxPrice ? { startingPrice: { lte: filters.maxPrice } } : {}),
      }),
    }

    return withRetry(async () => {
      const [properties, total] = await prisma.$transaction([
        prisma.property.findMany({ where, skip, take: pageSize, orderBy: { createdAt: 'desc' }, include: withUnitTypes }),
        prisma.property.count({ where }),
      ])
      return { properties, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
    })
  },

  findById: async (id: string) =>
    withRetry(() => prisma.property.findUnique({ where: { id }, include: withUnitTypes })),

  findBySlug: async (slug: string) =>
    withRetry(() => prisma.property.findUnique({ where: { slug }, include: withUnitTypes })),

  findFeatured: async (limit = 4) =>
    withRetry(() => prisma.property.findMany({
      where: { status: 'active', featured: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: withUnitTypes,
    })),

  findRecommended: async (excludeId: string, limit = 3) =>
    withRetry(() => prisma.property.findMany({
      where: { status: 'active', id: { not: excludeId } },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: withUnitTypes,
    })),

  create: async (data: PropertyFormData) =>
    withRetry(() => prisma.property.create({ data, include: withUnitTypes })),

  createWithUnitTypes: async (data: PropertyFormData, unitTypes: UnitTypeFormData[]) =>
    withRetry(() => prisma.property.create({
      data: {
        ...data,
        unitTypes: unitTypes.length > 0 ? { create: unitTypes } : undefined,
      },
      include: withUnitTypes,
    })),

  update: async (id: string, data: Partial<PropertyFormData>) =>
    withRetry(() => prisma.property.update({ where: { id }, data, include: withUnitTypes })),

  delete: async (id: string) =>
    withRetry(() => prisma.property.delete({ where: { id } })),

  findAllAdmin: async (
    filters?: { search?: string; status?: string; type?: string; sort?: string },
    pagination?: { page?: number; pageSize?: number }
  ) => {
    const page = pagination?.page ?? 1
    const pageSize = Math.min(pagination?.pageSize ?? 20, 100)
    const skip = (page - 1) * pageSize

    const where = {
      ...(filters?.search && {
        OR: [
          { title: { contains: filters.search, mode: 'insensitive' as const } },
          { location: { contains: filters.search, mode: 'insensitive' as const } },
        ],
      }),
      ...(filters?.status && filters.status !== 'all' && { status: filters.status }),
      ...(filters?.type && filters.type !== 'all' && { type: filters.type }),
    }

    const isPriceSort = filters?.sort === 'price-asc' || filters?.sort === 'price-desc'

    const orderBy =
      filters?.sort === 'oldest' ? { createdAt: 'asc' as const }
      : filters?.sort === 'title-asc' ? { title: 'asc' as const }
      : filters?.sort === 'price-asc' ? { startingPrice: 'asc' as const }
      : filters?.sort === 'price-desc' ? { startingPrice: 'desc' as const }
      : { createdAt: 'desc' as const }

    return withRetry(async () => {
      const [properties, total] = await prisma.$transaction([
        prisma.property.findMany({
          where,
          orderBy: isPriceSort ? [{ startingPrice: orderBy.startingPrice }, { createdAt: 'desc' as const }] : orderBy,
          skip,
          take: pageSize,
          include: withUnitTypes,
        }),
        prisma.property.count({ where }),
      ])
      return { properties, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
    })
  },

  createUnitType: async (propertyId: string, data: UnitTypeFormData) =>
    withRetry(() => prisma.unitType.create({ data: { ...data, propertyId } })),

  getUnitTypeById: async (id: string) =>
    withRetry(() => prisma.unitType.findUnique({ where: { id } })),

  updateUnitType: async (id: string, data: Partial<UnitTypeFormData>) =>
    withRetry(() => prisma.unitType.update({ where: { id }, data })),

  deleteUnitType: async (id: string) =>
    withRetry(() => prisma.unitType.delete({ where: { id } })),
}
