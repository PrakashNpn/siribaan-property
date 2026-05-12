import { Property } from '@/features/property/types'

const BASE = 'https://siribaanproperty.com'

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Siribaan Property Group',
  url: BASE,
  logo: `${BASE}/logo/logo-transparent.png`,
  image: `${BASE}/og-default.jpg`,
  description:
    'Premium luxury real estate in Bangkok. A curated portfolio of exclusive residences in Sukhumvit, Riverside, and Thonglor.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '8th Floor, Room No. 828, 1840 Sukhumvit Rd',
    addressLocality: 'Phra Khanong Tai',
    addressRegion: 'Bangkok',
    postalCode: '10260',
    addressCountry: 'TH',
  },
  telephone: '+66910062564',
  email: 'info@siribaanproperty.com',
  sameAs: ['https://www.facebook.com/profile.php?id=61573484701811'],
  areaServed: {
    '@type': 'City',
    name: 'Bangkok',
  },
  priceRange: '฿฿฿฿',
}

export function propertyJsonLd(property: Property) {
  const startingPrice =
    property.unitTypes.length > 0
      ? Math.min(...property.unitTypes.map((u) => u.priceMin))
      : null

  const maxPrice =
    property.unitTypes.length > 0
      ? Math.max(...property.unitTypes.map((u) => u.priceMax ?? u.priceMin))
      : null

  const bedroomsMin =
    property.unitTypes.length > 0
      ? Math.min(...property.unitTypes.map((u) => u.bedrooms))
      : undefined

  const areaMin =
    property.unitTypes.length > 0
      ? Math.min(...property.unitTypes.map((u) => u.areaSqmMin))
      : undefined

  const listing: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description.slice(0, 500),
    url: `${BASE}/properties/${property.id}`,
    datePosted: property.createdAt,
    image: property.images.slice(0, 5),
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.location,
      addressRegion: 'Bangkok',
      addressCountry: 'TH',
    },
  }

  if (startingPrice !== null) {
    listing.offers = {
      '@type': 'Offer',
      priceCurrency: 'THB',
      price: startingPrice,
      ...(maxPrice && maxPrice !== startingPrice ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: startingPrice, maxPrice, priceCurrency: 'THB' } } : {}),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'RealEstateAgent', name: 'Siribaan Property Group', url: BASE },
    }
  }

  if (bedroomsMin !== undefined) {
    listing.numberOfRooms = bedroomsMin
  }

  if (areaMin !== undefined) {
    listing.floorSize = {
      '@type': 'QuantitativeValue',
      value: areaMin,
      unitCode: 'MTK',
    }
  }

  if (property.yearBuilt) {
    listing.yearBuilt = property.yearBuilt
  }

  return listing
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
