export interface UnitType {
  id: string
  propertyId: string
  name: string
  bedrooms: number
  bathrooms: number
  areaSqmMin: number
  areaSqmMax?: number | null
  parking: number
  images: string[]
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
  developer?: string | null
  listingType: string
  projectStatus?: string | null
  startingPrice?: number | null
  rentalYield?: number | null
  location: string
  address: string
  mapUrl?: string | null
  nearbyPlaces: string[]
  yearBuilt?: number | null
  completionDate?: string | null
  totalFloors?: number | null
  totalUnits?: number | null
  images: string[]
  amenities: string[]
  unitTypes: UnitType[]
  createdAt: Date
  updatedAt: Date
}
