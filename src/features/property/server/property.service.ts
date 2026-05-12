import { propertyRepository } from './property.repository'
import { PropertyFormData, UnitTypeFormData } from '../validation'

export const propertyService = {
  getAll: (
    filters?: { location?: string; minPrice?: number; maxPrice?: number; type?: string },
    pagination?: { page?: number; pageSize?: number }
  ) => propertyRepository.findAll(filters, pagination),

  getById: (id: string) => propertyRepository.findById(id),

  getFeatured: (limit?: number) => propertyRepository.findFeatured(limit),

  getRecommended: (excludeId: string, limit?: number) =>
    propertyRepository.findRecommended(excludeId, limit),

  create: (data: PropertyFormData) => propertyRepository.create(data),

  createWithUnitTypes: (data: PropertyFormData, unitTypes: UnitTypeFormData[]) =>
    propertyRepository.createWithUnitTypes(data, unitTypes),

  update: (id: string, data: Partial<PropertyFormData>) => propertyRepository.update(id, data),

  delete: (id: string) => propertyRepository.delete(id),

  getAllAdmin: () => propertyRepository.findAllAdmin(),

  createUnitType: (propertyId: string, data: UnitTypeFormData) =>
    propertyRepository.createUnitType(propertyId, data),

  updateUnitType: (id: string, data: Partial<UnitTypeFormData>) =>
    propertyRepository.updateUnitType(id, data),

  deleteUnitType: (id: string) => propertyRepository.deleteUnitType(id),
}
