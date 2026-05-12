import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding...')

  const p1 = await prisma.property.create({
    data: {
      title: 'The Lumina Riverside Penthouse',
      slug: 'the-lumina-riverside-penthouse',
      description: 'Experience unparalleled luxury in this masterfully designed penthouse. Perched on the 48th floor of The Lumina, this residence offers breathtaking 270-degree views of the Chao Phraya River and the vibrant Sukhumvit skyline.',
      type: 'Condo',
      status: 'active',
      tag: 'NEW LISTING',
      featured: true,
      location: 'Sukhumvit 24, Bangkok',
      address: 'Sukhumvit 24, Khlong Toei, Bangkok 10110',
      nearbyPlaces: ['BTS Phrom Phong (500m)', 'Emporium Mall (300m)', 'Benjakiti Park (800m)'],
      yearBuilt: 2021,
      totalFloors: 50,
      totalUnits: 120,
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'],
      amenities: ['Private Sky Garden & Infinity Pool', 'Professional-grade Wine Cellar', 'En-suite Private Cinema', '24/7 Elite Concierge Service', 'Smart-Home Central Integration', 'Direct Elevator Access'],
    },
  })
  await prisma.unitType.createMany({
    data: [
      { propertyId: p1.id, name: '3 Bedroom', bedrooms: 3, bathrooms: 3, areaSqmMin: 280, areaSqmMax: 320, priceMin: 95000000, priceMax: 120000000, parking: 2 },
      { propertyId: p1.id, name: 'Penthouse', bedrooms: 4, bathrooms: 5, areaSqmMin: 450, priceMin: 145000000, parking: 3 },
    ],
  })

  const p2 = await prisma.property.create({
    data: {
      title: 'The Emerald Riverside Estate',
      slug: 'the-emerald-riverside-estate',
      description: 'A stunning riverside estate with unparalleled views of the Chao Phraya River. Features lush tropical gardens and a private boat dock.',
      type: 'House',
      status: 'active',
      tag: 'EXCLUSIVE',
      featured: true,
      location: 'Riverside, Bangkok',
      address: 'Charoen Nakhon Rd, Khlong San, Bangkok',
      nearbyPlaces: ['BTS Krung Thon Buri (1km)', 'ICONSIAM (500m)', 'Chao Phraya River'],
      totalFloors: 3,
      totalUnits: 1,
      images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80'],
      amenities: ['Private Sky Garden & Infinity Pool', '24/7 Elite Concierge Service', 'Smart-Home Central Integration', 'Private Gym & Spa', 'Underground Parking', 'Rooftop Terrace'],
    },
  })
  await prisma.unitType.create({
    data: { propertyId: p2.id, name: 'Full Estate', bedrooms: 5, bathrooms: 6, areaSqmMin: 820, priceMin: 320000000, parking: 4 },
  })

  const p3 = await prisma.property.create({
    data: {
      title: 'The Ritz-Carlton Residences',
      slug: 'the-ritz-carlton-residences',
      description: 'Ultra-luxury branded residences in the heart of Sukhumvit. World-class amenities and impeccable service.',
      type: 'Condo',
      status: 'active',
      tag: 'EXCLUSIVE',
      featured: true,
      location: 'Sukhumvit, Bangkok',
      address: '252 Sukhumvit Rd, Khlong Toei, Bangkok',
      nearbyPlaces: ['BTS Asok (200m)', 'Terminal 21 (300m)', 'Sukhumvit Road'],
      yearBuilt: 2022,
      totalFloors: 38,
      totalUnits: 90,
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80'],
      amenities: ['Private Sky Garden & Infinity Pool', '24/7 Elite Concierge Service', 'Smart-Home Central Integration', 'Direct Elevator Access'],
    },
  })
  await prisma.unitType.createMany({
    data: [
      { propertyId: p3.id, name: '2 Bedroom', bedrooms: 2, bathrooms: 2, areaSqmMin: 140, areaSqmMax: 180, priceMin: 85000000, priceMax: 110000000, parking: 1 },
      { propertyId: p3.id, name: '3 Bedroom', bedrooms: 3, bathrooms: 4, areaSqmMin: 280, priceMin: 145000000, parking: 2 },
    ],
  })

  const p4 = await prisma.property.create({
    data: {
      title: 'Celestial Park Villa',
      slug: 'celestial-park-villa',
      description: 'A magnificent tropical villa in the prestigious Thong Lo district. Designed by award-winning architects with a focus on indoor-outdoor living.',
      type: 'Villa',
      status: 'active',
      tag: 'HOT LISTING',
      featured: false,
      location: 'Thong Lo, Bangkok',
      address: 'Sukhumvit 55, Thong Lo, Bangkok',
      nearbyPlaces: ['BTS Thong Lo (600m)', 'J Avenue (400m)', 'Ekkamai Road'],
      yearBuilt: 2020,
      totalFloors: 2,
      totalUnits: 1,
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'],
      amenities: ['Private Sky Garden & Infinity Pool', 'Professional-grade Wine Cellar', '24/7 Elite Concierge Service', 'Smart Security System', 'Underground Parking'],
    },
  })
  await prisma.unitType.create({
    data: { propertyId: p4.id, name: 'Full Villa', bedrooms: 5, bathrooms: 6, areaSqmMin: 520, priceMin: 210000000, parking: 3 },
  })

  const p5 = await prisma.property.create({
    data: {
      title: 'Aman Residences Bangkok',
      slug: 'aman-residences-bangkok',
      description: 'Exclusive branded residences by Aman on the Riverside. Minimalist design meets unparalleled luxury.',
      type: 'Condo',
      status: 'active',
      tag: 'RIVERSIDE',
      featured: false,
      location: 'Riverside, Bangkok',
      address: 'Charoen Krung Rd, Bang Rak, Bangkok',
      nearbyPlaces: ['BTS Saphan Taksin (1.2km)', 'Mandarin Oriental (500m)', 'Chao Phraya River'],
      yearBuilt: 2023,
      totalFloors: 32,
      totalUnits: 52,
      images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80' ],
      amenities: ['24/7 Elite Concierge Service', 'Smart-Home Central Integration', 'Direct Elevator Access', 'Private Gym & Spa'],
    },
  })
  await prisma.unitType.createMany({
    data: [
      { propertyId: p5.id, name: '1 Bedroom', bedrooms: 1, bathrooms: 1, areaSqmMin: 80, areaSqmMax: 100, priceMin: 38000000, priceMax: 50000000, parking: 1 },
      { propertyId: p5.id, name: '2 Bedroom', bedrooms: 2, bathrooms: 3, areaSqmMin: 165, priceMin: 88000000, parking: 1 },
    ],
  })

  const p6 = await prisma.property.create({
    data: {
      title: 'Villa Satori Phrom Phong',
      slug: 'villa-satori-phrom-phong',
      description: 'A serene urban villa in Phrom Phong. Features a zen garden, private pool, and contemporary Japanese-inspired design.',
      type: 'Villa',
      status: 'active',
      tag: 'EXCLUSIVE',
      featured: false,
      location: 'Phrom Phong, Bangkok',
      address: 'Sukhumvit 39, Phrom Phong, Bangkok',
      nearbyPlaces: ['BTS Phrom Phong (400m)', 'Emquartier (600m)', 'Benjasiri Park (300m)'],
      yearBuilt: 2019,
      totalFloors: 2,
      totalUnits: 1,
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'],
      amenities: ['Private Sky Garden & Infinity Pool', 'Smart-Home Central Integration', 'Smart Security System', 'Underground Parking'],
    },
  })
  await prisma.unitType.create({
    data: { propertyId: p6.id, name: 'Full Villa', bedrooms: 4, bathrooms: 4, areaSqmMin: 320, priceMin: 89500000, parking: 2 },
  })

  console.log('Done seeding!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
