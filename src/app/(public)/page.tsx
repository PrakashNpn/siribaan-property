import type { Metadata } from 'next'
import { propertyService } from '@/features/property/server/property.service'
import { HomeClient } from './_components/home-client'

export const revalidate = 60

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [featured, propertyCount] = await Promise.all([
    propertyService.getFeatured(6),
    propertyService.countActive(),
  ])
  return <HomeClient featured={featured} propertyCount={propertyCount} />
}
