import Link from 'next/link'
import { Building2, CheckCircle, Star, MessageSquare, Plus, ArrowRight, Clock } from 'lucide-react'
import { prisma, withRetry } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

function StatCard({
  label,
  value,
  icon,
  color,
  sub,
}: {
  label: string
  value: number | string
  icon: React.ReactNode
  color: string
  sub?: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-blue-50 p-6 shadow-[0_2px_16px_rgba(18,93,229,0.06)] hover:shadow-[0_4px_24px_rgba(18,93,229,0.10)] transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>{value}</p>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mt-1">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1.5 border-t border-gray-50 pt-1.5">{sub}</p>}
    </div>
  )
}

export default async function AdminDashboardPage() {
  const [
    totalProperties,
    activeProperties,
    featuredProperties,
    totalInquiries,
    recentInquiries,
    recentProperties,
    newInquiriesThisWeek,
  ] = await withRetry(() => Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { status: 'active' } }),
    prisma.property.count({ where: { featured: true } }),
    prisma.inquiry.count(),
    prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { property: { select: { title: true } } },
    }),
    prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, title: true, type: true, status: true, startingPrice: true, createdAt: true },
    }),
    prisma.inquiry.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ]))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#125DE5] mb-1 flex items-center gap-2">
            <span className="w-5 h-px bg-[#125DE5] inline-block" />
            Admin Panel
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>Dashboard</h1>
          <div className="w-8 h-0.5 bg-amber-400 mt-2 mb-2" />
          <p className="text-sm text-gray-400">Overview of your property portfolio</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="bg-[#125DE5] hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm shadow-blue-200 mt-1"
        >
          <Plus size={16} /> Add Property
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Properties"
          value={totalProperties}
          icon={<Building2 size={18} className="text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          label="Active Listings"
          value={activeProperties}
          icon={<CheckCircle size={18} className="text-green-600" />}
          color="bg-green-50"
          sub={totalProperties > 0 ? `${Math.round((activeProperties / totalProperties) * 100)}% of total` : undefined}
        />
        <StatCard
          label="Featured"
          value={featuredProperties}
          icon={<Star size={18} className="text-amber-500" />}
          color="bg-amber-50"
          sub="Shown on homepage"
        />
        <StatCard
          label="Total Inquiries"
          value={totalInquiries}
          icon={<MessageSquare size={18} className="text-purple-600" />}
          color="bg-purple-50"
          sub={newInquiriesThisWeek > 0 ? `${newInquiriesThisWeek} new this week` : 'None this week'}
        />
      </div>

      {/* Two-column: recent properties + recent inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent properties */}
        <div className="bg-white rounded-2xl border border-blue-50 overflow-hidden shadow-[0_2px_16px_rgba(18,93,229,0.05)]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>Recent Properties</h2>
            <Link href="/admin/properties" className="text-xs text-[#125DE5] hover:text-blue-700 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {recentProperties.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No properties yet.</div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentProperties.map((p) => {
                const startingPrice = p.startingPrice ?? null
                return (
                  <li key={p.id}>
                    <Link
                      href={`/admin/properties/${p.id}/edit`}
                      className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{p.title}</p>
                        <p className="text-xs text-gray-400">{p.type}</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-xs font-semibold text-gray-700">
                          {startingPrice ? `฿${formatPrice(startingPrice)}` : '—'}
                        </p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          p.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Recent inquiries */}
        <div className="bg-white rounded-2xl border border-blue-50 overflow-hidden shadow-[0_2px_16px_rgba(18,93,229,0.05)]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>Recent Inquiries</h2>
            <span className="text-xs text-gray-400">{totalInquiries} total</span>
          </div>
          {recentInquiries.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No inquiries yet.</div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentInquiries.map((inq) => (
                <li key={inq.id} className="px-6 py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">{inq.name}</p>
                      <p className="text-xs text-gray-400 truncate">{inq.email}</p>
                      {inq.property && (
                        <p className="text-xs text-blue-600 truncate mt-0.5">Re: {inq.property.title}</p>
                      )}
                    </div>
                    <div className="shrink-0 flex items-center gap-1 text-gray-400 text-[11px] mt-0.5">
                      <Clock size={10} />
                      {new Date(inq.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  {inq.message && (
                    <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{inq.message}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}
