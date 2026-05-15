'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, Building2, MessageSquare,
  ExternalLink, LogOut, Menu, X, ChevronRight,
} from 'lucide-react'
import { logoutAction } from './admin/login/actions'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/properties', label: 'Properties', icon: Building2, exact: false },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare, exact: false },
]

function NavItem({ href, label, icon: Icon, exact, badge }: typeof NAV[number] & { badge?: number }) {
  const pathname = usePathname()
  const active = exact ? pathname === href : pathname.startsWith(href)
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-gradient-to-r from-blue-50 to-transparent text-[#125DE5] shadow-[inset_3px_0_0_0_#125DE5]'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon size={17} className={active ? 'text-[#125DE5]' : 'text-gray-400'} />
      {label}
      {badge && badge > 0 ? (
        <span className="ml-auto bg-[#125DE5] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
          {badge > 99 ? '99+' : badge}
        </span>
      ) : active ? (
        <ChevronRight size={13} className="ml-auto text-[#125DE5]/50" />
      ) : null}
    </Link>
  )
}

function SidebarContent({ onClose, unreadInquiries }: { onClose?: () => void; unreadInquiries?: number }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="relative flex items-center justify-between px-4 py-5 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0C3BAF 0%, #071E6B 100%)' }}
      >
        {/* Decorative orb */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />
        <Link href="/admin" onClick={onClose} className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 relative shrink-0">
            <Image src="/logo/logo.png" alt="Siribaan" fill sizes="32px" className="object-contain" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">Siribaan</p>
            <p className="text-[10px] text-blue-300 uppercase tracking-widest mt-0.5">Admin Panel</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="relative text-blue-300 hover:text-white md:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 px-3 mb-3">Menu</p>
        {NAV.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            badge={item.href === '/admin/inquiries' ? unreadInquiries : undefined}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 pt-3 border-t border-gray-100 space-y-1">
        {/* Admin info card */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 mb-2 rounded-xl bg-[#F5F7FF] border border-blue-50">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#125DE5] to-[#071E6B] flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-800 leading-none">Admin</p>
            <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide">Super Admin</p>
          </div>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
        >
          <ExternalLink size={16} className="text-gray-400" />
          View Site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={16} className="text-gray-400" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}

export function AdminSidebar({ unreadInquiries }: { unreadInquiries?: number }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-60 bg-white border-r border-gray-100 z-40">
        <SidebarContent unreadInquiries={unreadInquiries} />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setMobileOpen(true)} className="text-gray-600 hover:text-gray-900">
          <Menu size={20} />
        </button>
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-6 h-6 relative">
            <Image src="/logo/logo.png" alt="Siribaan" fill sizes="24px" className="object-contain" />
          </div>
          <span className="text-sm font-bold text-gray-900">Siribaan Admin</span>
        </Link>
        {unreadInquiries && unreadInquiries > 0 ? (
          <span className="ml-auto bg-[#125DE5] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {unreadInquiries > 99 ? '99+' : unreadInquiries}
          </span>
        ) : null}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="md:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl">
            <SidebarContent onClose={() => setMobileOpen(false)} unreadInquiries={unreadInquiries} />
          </aside>
        </>
      )}
    </>
  )
}
