import { propertyRepository } from './property.repository'
import { PropertyFormData } from '../validation'

export const propertyService = {
  getAll: (filters?: { location?: string; minPrice?: number; maxPrice?: number; type?: string }) =>
    propertyRepository.findAll(filters),

  getById: (id: string) => propertyRepository.findById(id),

  getFeatured: (limit?: number) => propertyRepository.findFeatured(limit),

  getRecommended: (excludeId: string, limit?: number) =>
    propertyRepository.findRecommended(excludeId, limit),

  create: (data: PropertyFormData) => propertyRepository.create(data),

  update: (id: string, data: Partial<PropertyFormData>) => propertyRepository.update(id, data),

  delete: (id: string) => propertyRepository.delete(id),

  getAllAdmin: () => propertyRepository.findAllAdmin(),
}
