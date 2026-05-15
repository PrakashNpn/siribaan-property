'use server'
import { revalidatePath } from 'next/cache'
import { propertyService } from '@/features/property/server/property.service'

export async function toggleFeatured(id: string, featured: boolean) {
  await propertyService.update(id, { featured })
  revalidatePath('/admin/properties')
  revalidatePath('/admin')
}
