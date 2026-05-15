import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function resolveShortMapUrl(url: string): Promise<string> {
  if (!url || !url.includes('maps.app.goo.gl')) return url
  try {
    const res = await fetch(url, { redirect: 'follow', cache: 'no-store' })
    return res.url || url
  } catch {
    return url
  }
}

export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    const m = price / 1_000_000
    return `${parseFloat(m.toFixed(2))}M`
  }
  if (price >= 1_000) {
    return `${Math.round(price / 1_000)}K`
  }
  return price.toString()
}
