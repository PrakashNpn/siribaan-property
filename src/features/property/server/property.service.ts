import { cache } from 'react'
import { propertyRepository } from './property.repository'
import { PropertyFormData, UnitTypeFormData } from '../validation'

export const propertyService = {
  getAll: (
    filters?: { location?: string; minPrice?: number; maxPrice?: number; type?: string },
    pagination?: { page?: number; pageSize?: number }
  ) => propertyRepository.findAll(filters, pagination),

  getById: (id: string) => propertyRepository.findById(id),

  getBySlug: cache((slug: string) => propertyRepository.findBySlug(slug)),

  getFeatured: (limit?: number) => propertyRepository.findFeatured(limit),

  countActive: () => propertyRepository.countActive(),

  getRecommended: (excludeId: string, limit?: number) =>
    propertyRepository.findRecommended(excludeId, limit),

  create: (data: PropertyFormData) => propertyRepository.create(data),

  createWithUnitTypes: (data: PropertyFormData, unitTypes: UnitTypeFormData[]) =>
    propertyRepository.createWithUnitTypes(data, unitTypes),

  update: (id: string, data: Partial<PropertyFormData>) => propertyRepository.update(id, data),

  delete: (id: string) => propertyRepository.delete(id),

  getAllAdmin: (
    filters?: { search?: string; status?: string; type?: string; sort?: string },
    pagination?: { page?: number; pageSize?: number }
  ) => propertyRepository.findAllAdmin(filters, pagination),

  createUnitType: (propertyId: string, data: UnitTypeFormData) =>
    propertyRepository.createUnitType(propertyId, data),

  getUnitTypeById: (id: string) => propertyRepository.getUnitTypeById(id),

  updateUnitType: (id: string, data: Partial<UnitTypeFormData>) =>
    propertyRepository.updateUnitType(id, data),

  deleteUnitType: (id: string) => propertyRepository.deleteUnitType(id),
}
