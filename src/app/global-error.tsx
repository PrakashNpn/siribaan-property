'use client'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '24px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#125DE5', marginBottom: '12px' }}>
            Critical Error
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', marginBottom: '12px', lineHeight: 1.2 }}>
            Something went seriously wrong
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.6, maxWidth: '400px', marginBottom: '32px' }}>
            The application encountered a critical error. Please refresh the page or contact our team at{' '}
            <a href="mailto:info@siribaanproperty.com" style={{ color: '#125DE5' }}>info@siribaanproperty.com</a>.
          </p>
          <button
            onClick={reset}
            style={{ background: '#125DE5', color: '#fff', fontWeight: 600, padding: '12px 28px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
