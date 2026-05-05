interface MapEmbedProps {
  address: string
  height?: string
}

export function MapEmbed({ address, height = 'h-72' }: MapEmbedProps) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=15`

  return (
    <div className={`${height} w-full rounded-2xl overflow-hidden border border-gray-100`}>
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
  )
}
