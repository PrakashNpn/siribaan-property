import { prisma, withRetry } from '@/lib/prisma'
import { Mail, Phone, Building2, Clock, MessageSquare, Reply } from 'lucide-react'
import { MarkReadButton } from './mark-read-button'

export const dynamic = 'force-dynamic'

export default async function InquiriesPage() {
  const inquiries = await withRetry(() =>
    prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      include: { property: { select: { id: true, title: true, slug: true } } },
    })
  )

  const total = inquiries.length
  const unread = inquiries.filter((i) => !i.read).length
  const thisWeek = inquiries.filter(
    (i) => i.createdAt >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length
  const general = inquiries.filter((i) => !i.propertyId).length

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#125DE5] mb-1 flex items-center gap-2">
          <span className="w-5 h-px bg-[#125DE5] inline-block" />
          Messages
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>Inquiries</h1>
        <div className="w-8 h-0.5 bg-amber-400 mt-2 mb-2" />
        <p className="text-sm text-gray-400">
          {total} total &middot; {thisWeek} this week &middot; {general} general
        </p>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-blue-50 px-5 py-4 shadow-[0_2px_16px_rgba(18,93,229,0.05)]">
          <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>{total}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mt-1">Total</p>
        </div>
        <div className="bg-white rounded-2xl border border-blue-50 px-5 py-4 shadow-[0_2px_16px_rgba(18,93,229,0.05)]">
          <p className="text-3xl font-bold text-[#125DE5]" style={{ fontFamily: 'var(--font-display)' }}>{thisWeek}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mt-1">This Week</p>
        </div>
        <div className={`rounded-2xl border px-5 py-4 shadow-[0_2px_16px_rgba(18,93,229,0.05)] ${unread > 0 ? 'bg-blue-50 border-blue-100' : 'bg-white border-blue-50'}`}>
          <p className={`text-3xl font-bold ${unread > 0 ? 'text-[#125DE5]' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-display)' }}>{unread}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mt-1">Unread</p>
        </div>
      </div>

      {/* List */}
      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-blue-50 p-16 text-center shadow-[0_2px_16px_rgba(18,93,229,0.05)]">
          <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No inquiries yet.</p>
          <p className="text-gray-400 text-xs mt-1">They will appear here once visitors submit the contact form.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`rounded-2xl border p-5 transition-colors shadow-[0_2px_16px_rgba(18,93,229,0.05)] ${
                inq.read ? 'bg-white border-blue-50' : 'bg-blue-50/40 border-blue-100'
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                {/* Left: unread dot + name + contact */}
                <div className="min-w-0 flex items-start gap-3">
                  <div className="mt-1.5 shrink-0 w-2 h-2">
                    {!inq.read && <div className="w-2 h-2 rounded-full bg-[#125DE5]" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{inq.name}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                      <a
                        href={`mailto:${inq.email}`}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#125DE5] transition-colors"
                      >
                        <Mail size={11} className="shrink-0" />
                        {inq.email}
                      </a>
                      {inq.phone && (
                        <a
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#125DE5] transition-colors"
                        >
                          <Phone size={11} className="shrink-0" />
                          {inq.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: date + property + mark read */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Clock size={11} />
                    {new Date(inq.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                    {' '}
                    {new Date(inq.createdAt).toLocaleTimeString('en-GB', {
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </div>
                  {inq.property ? (
                    <a
                      href={`/admin/properties/${inq.property.id}/edit`}
                      className="flex items-center gap-1.5 text-[11px] font-medium text-[#125DE5] hover:text-blue-700 transition-colors bg-blue-50 px-2.5 py-1 rounded-lg"
                    >
                      <Building2 size={11} />
                      {inq.property.title}
                    </a>
                  ) : (
                    <span className="text-[11px] text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
                      General inquiry
                    </span>
                  )}
                  <a
                    href={`mailto:${inq.email}?subject=${encodeURIComponent(inq.property ? `Re: ${inq.property.title}` : 'Re: Your Inquiry — Siribaan Property Group')}&body=${encodeURIComponent(`Dear ${inq.name},\n\nThank you for your inquiry`)}`}
                    className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    <Reply size={11} />
                    Reply
                  </a>
                  <MarkReadButton id={inq.id} read={inq.read} />
                </div>
              </div>

              {/* Message */}
              {inq.message && (
                <div className="mt-3 pt-3 border-t border-gray-100 ml-5">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{inq.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
