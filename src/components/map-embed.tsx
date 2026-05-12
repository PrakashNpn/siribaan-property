interface MapEmbedProps {
  address: string
  height?: string
}

export function MapEmbed({ address, height = 'h-72' }: MapEmbedProps) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=15`

  return (
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
  )
}
