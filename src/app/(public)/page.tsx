import { propertyService } from '@/features/property/server/property.service'
import { HomeClient } from './_components/home-client'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const featured = await propertyService.getFeatured(6)
  return <HomeClient featured={featured} />
}
