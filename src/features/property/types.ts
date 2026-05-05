export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  address: string
  bedrooms: number
  bathrooms: number
  areaSqm: number
  parking: number
  type: string
  status: string
  tag?: string | null
  images: string[]
  amenities: string[]
  createdAt: Date
}
