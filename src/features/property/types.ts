export interface UnitType {
  id: string
  propertyId: string
  name: string
  bedrooms: number
  bathrooms: number
  areaSqmMin: number
  areaSqmMax?: number | null
  priceMin: number
  priceMax?: number | null
  parking: number
  floorMin?: number | null
  floorMax?: number | null
  available?: number | null
  createdAt: Date
  updatedAt: Date
}

export interface Property {
  id: string
  title: string
  slug: string
  description: string
  type: string
  status: string
  tag?: string | null
  featured: boolean
  location: string
  address: string
  nearbyPlaces: string[]
  yearBuilt?: number | null
  completionDate?: string | null
  totalFloors?: number | null
  totalUnits?: number | null
  landAreaSqm?: number | null
  images: string[]
  amenities: string[]
  unitTypes: UnitType[]
  createdAt: Date
  updatedAt: Date
}
