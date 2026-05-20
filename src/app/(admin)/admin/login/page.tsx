'use client'
import { useActionState } from 'react'
import Image from 'next/image'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { loginAction } from './actions'

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2b6e] via-[#0B2A6B] to-[#071640] flex items-center justify-center px-4">
      {/* Orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#125DE5] blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-400 blur-3xl opacity-15 pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Shimmer top edge */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_24px_80px_rgba(7,22,64,0.4)]">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 relative mb-4">
              <Image src="/logo-symbol-transparent.png" alt="Siribaan" fill sizes="48px" className="object-contain" />
            </div>
            <h1 className="text-white text-lg font-bold tracking-wide">Siribaan Admin</h1>
            <p className="text-blue-300/70 text-xs mt-1 uppercase tracking-widest">Secure Access</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-7" />

          <form action={action} className="space-y-4">
            {/* Password field */}
            <div>
              <label className="block text-blue-200/80 text-xs font-semibold uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300/50">
                  <Lock size={14} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  autoFocus
                  placeholder="Enter admin password"
                  className="w-full bg-white/8 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-3 pl-10 pr-10 text-sm focus:outline-none focus:border-[#125DE5] focus:ring-1 focus:ring-[#125DE5]/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-300/50 hover:text-blue-200 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {state?.error && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {state.error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#125DE5] hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-lg shadow-blue-900/40 mt-2"
            >
              {pending ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-blue-300/40 text-[11px] mt-6">
            Protected area — authorised personnel only
          </p>
        </div>
      </div>
    </div>
  )
}
