interface MapEmbedProps {
  address: string
  mapUrl?: string | null
  height?: string
}

function parseCoords(url: string): { lat: number; lng: number } | null {
  // Prefer exact pin coords (!3d<lat>!4d<lng>) over viewport center (@lat,lng)
  const pin = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)
  if (pin) return { lat: parseFloat(pin[1]), lng: parseFloat(pin[2]) }
  const viewport = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
  if (viewport) return { lat: parseFloat(viewport[1]), lng: parseFloat(viewport[2]) }
  return null
}

export function MapEmbed({ address, mapUrl, height = 'h-72' }: MapEmbedProps) {
  const coords = mapUrl ? parseCoords(mapUrl) : null
  const src = coords
    ? `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&output=embed&z=17`
    : `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=15`

  return (
    <div className="space-y-2">
      <div className={`${height} w-full rounded-2xl overflow-hidden border border-blue-100/70 shadow-[0_4px_24px_rgba(18,93,229,0.08)]`}>
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${address}`}
        />
      </div>
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#125DE5] hover:underline"
        >
          View on Google Maps ↗
        </a>
      )}
    </div>
  )
}
