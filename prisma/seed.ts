import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const properties = [
  {
    title: 'The Lumina Riverside Penthouse',
    description: 'Experience unparalleled luxury in this masterfully designed 450-square-meter penthouse. Perched on the 48th floor of The Lumina, this residence offers breathtaking 270-degree views of the Chao Phraya River and the vibrant Sukhumvit skyline.',
    price: 145000000,
    location: 'Sukhumvit 24, Khlong Toei, Bangkok 10110',
    address: 'Sukhumvit 24, Khlong Toei, Bangkok 10110',
    bedrooms: 4,
    bathrooms: 5,
    areaSqm: 450,
    parking: 3,
    type: 'For Sale',
    status: 'active',
    tag: 'NEW LISTING',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'],
    amenities: ['Private Sky Garden & Infinity Pool', 'Professional-grade Wine Cellar', 'En-suite Private Cinema', '24/7 Elite Concierge Service', 'Smart-Home Central Integration', 'Direct Elevator Access'],
  },
  {
    title: 'The Emerald Riverside Estate',
    description: 'A stunning riverside estate with unparalleled views of the Chao Phraya River. Features lush tropical gardens and a private boat dock.',
    price: 320000000,
    location: 'Chao Phraya River, Bangkok',
    address: 'Charoen Nakhon Rd, Khlong San, Bangkok',
    bedrooms: 5,
    bathrooms: 6,
    areaSqm: 820,
    parking: 4,
    type: 'For Sale',
    status: 'active',
    tag: 'EXCLUSIVE',
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80'],
    amenities: ['Private Sky Garden & Infinity Pool', '24/7 Elite Concierge Service', 'Smart-Home Central Integration', 'Private Gym & Spa', 'Underground Parking', 'Rooftop Terrace'],
  },
  {
    title: 'The Ritz-Carlton Residences',
    description: 'Ultra-luxury branded residences in the heart of Sukhumvit. World-class amenities and impeccable service.',
    price: 145000000,
    location: 'Sukhumvit, Bangkok',
    address: '252 Sukhumvit Rd, Khlong Toei, Bangkok',
    bedrooms: 3,
    bathrooms: 4,
    areaSqm: 280,
    parking: 2,
    type: 'For Sale',
    status: 'active',
    tag: 'EXCLUSIVE',
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80'],
    amenities: ['Private Sky Garden & Infinity Pool', '24/7 Elite Concierge Service', 'Smart-Home Central Integration', 'Direct Elevator Access'],
  },
  {
    title: 'Celestial Park Villa',
    description: 'A magnificent tropical villa in the prestigious Thong Lo district. Designed by award-winning architects.',
    price: 210000000,
    location: 'Thong Lo',
    address: 'Sukhumvit 55, Thong Lo, Bangkok',
    bedrooms: 5,
    bathrooms: 6,
    areaSqm: 520,
    parking: 3,
    type: 'For Sale',
    status: 'active',
    tag: 'HOT LISTING',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'],
    amenities: ['Private Sky Garden & Infinity Pool', 'Professional-grade Wine Cellar', '24/7 Elite Concierge Service', 'Smart Security System', 'Underground Parking'],
  },
  {
    title: 'Aman Residences',
    description: 'Exclusive branded residences by Aman on the Riverside. Minimalist design meets unparalleled luxury.',
    price: 88000000,
    location: 'Riverside',
    address: 'Charoen Krung Rd, Bang Rak, Bangkok',
    bedrooms: 2,
    bathrooms: 3,
    areaSqm: 165,
    parking: 1,
    type: 'For Sale',
    status: 'active',
    tag: 'RIVERSIDE',
    images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'],
    amenities: ['24/7 Elite Concierge Service', 'Smart-Home Central Integration', 'Direct Elevator Access', 'Private Gym & Spa'],
  },
  {
    title: 'Villa Satori Phrom Phong',
    description: 'A serene urban villa in Phrom Phong. Features a zen garden, private pool, and contemporary design.',
    price: 89500000,
    location: 'Phrom Phong, Bangkok',
    address: 'Sukhumvit 39, Phrom Phong, Bangkok',
    bedrooms: 4,
    bathrooms: 4,
    areaSqm: 320,
    parking: 2,
    type: 'For Sale',
    status: 'active',
    tag: 'EXCLUSIVE',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'],
    amenities: ['Private Sky Garden & Infinity Pool', 'Smart-Home Central Integration', 'Smart Security System', 'Underground Parking'],
  },
]

async function main() {
  console.log('Seeding...')
  for (const property of properties) {
    await prisma.property.create({ data: property })
  }
  console.log('Done seeding!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
