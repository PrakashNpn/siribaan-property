'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Lock, Clock, ShieldCheck, CalendarDays, ChevronLeft, ChevronRight, Phone } from 'lucide-react'
import { inquirySchema, InquiryFormData } from '../validation'

const CONTACT_PHONE = '+66 91 006 2564'
const CONTACT_PHONE_TEL = '+66910062564'

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAY_LABELS = ['Su','Mo','Tu','We','Th','Fr','Sa']

function DatePicker({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const selected = value ? new Date(value + 'T00:00:00') : null
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const handleDay = (day: number) => {
    const d = new Date(year, month, day)
    d.setHours(0, 0, 0, 0)
    if (d < today) return
    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onChange(formatted)
    setOpen(false)
  }

  const displayValue = value
    ? new Date(value + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between focus:outline-none focus:border-[#125DE5] focus:ring-2 focus:ring-[#125DE5]/10 transition"
      >
        <span className={value ? 'text-gray-700' : 'text-gray-400'}>{displayValue || 'Select a date'}</span>
        <CalendarDays size={15} className="text-[#125DE5] shrink-0" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 bottom-full mb-2 w-full bg-white/95 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl shadow-blue-100/50 p-4">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-50 text-gray-400 hover:text-[#125DE5] transition"
              >
                <ChevronLeft size={14} />
              </button>
              <p className="text-sm font-semibold text-gray-900">{MONTH_NAMES[month]} {year}</p>
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-50 text-gray-400 hover:text-[#125DE5] transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_LABELS.map(d => (
                <div key={d} className="text-center text-[10px] font-semibold text-gray-400 uppercase py-1">{d}</div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-y-0.5">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`pad-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const thisDate = new Date(year, month, day)
                thisDate.setHours(0, 0, 0, 0)
                const isPast = thisDate < today
                const isSelected = selected !== null && thisDate.getTime() === selected.getTime()
                const isToday = thisDate.getTime() === today.getTime()

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDay(day)}
                    disabled={isPast}
                    className={[
                      'w-full aspect-square flex items-center justify-center rounded-full text-xs font-medium transition-all',
                      isSelected
                        ? 'bg-[#125DE5] text-white shadow-md shadow-blue-300/50'
                        : isToday
                        ? 'ring-1 ring-[#125DE5] text-[#125DE5] font-bold'
                        : isPast
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-[#125DE5] cursor-pointer',
                    ].join(' ')}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

interface InquiryFormProps {
  propertyId?: string
  variant?: 'sidebar' | 'contact'
}

export function InquiryForm({ propertyId, variant = 'sidebar' }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      propertyId,
      message: variant === 'sidebar' ? 'I would like to schedule a viewing for this property.' : '',
    },
  })

  const preferredDate = watch('preferredDate') || ''

  const onSubmit = async (data: InquiryFormData) => {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      setSubmitted(true)
      reset()
    }
  }

  const inputClass = "w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#125DE5] focus:ring-2 focus:ring-[#125DE5]/10 placeholder:text-gray-400 transition"
  const labelClass = "text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5 block"

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-4xl mb-2">✓</div>
        <h3 className="font-semibold text-gray-900 mb-1">Inquiry Sent!</h3>
        <p className="text-sm text-gray-500">Our team will reach out within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={labelClass}>Full Name</label>
        <input {...register('name')} placeholder="John Doe" className={inputClass} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Email Address</label>
        <input {...register('email')} type="email" placeholder="john@example.com" className={inputClass} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Phone Number</label>
        <input {...register('phone')} placeholder="+66 00 000 0000" className={inputClass} />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      {variant === 'sidebar' && (
        <div>
          <label className={labelClass}>Preferred Date</label>
          <DatePicker
            value={preferredDate}
            onChange={(val) => setValue('preferredDate', val)}
          />
          <input type="hidden" {...register('message')} />
        </div>
      )}

      {variant === 'contact' && (
        <div>
          <label className={labelClass}>Message</label>
          <textarea
            {...register('message')}
            rows={4}
            placeholder="Tell us about your property requirements..."
            className={`${inputClass} resize-none`}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
      )}

      <div className={variant === 'sidebar' ? 'flex gap-2' : ''}>
        {variant === 'sidebar' && (
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 border border-[#125DE5] text-[#125DE5] hover:bg-blue-50 font-semibold py-2 rounded-xl transition-all text-sm"
          >
            <span className="flex items-center gap-1.5"><Phone size={13} /> Call Us</span>
            <span className="text-[10px] font-normal text-[#125DE5]/70">{CONTACT_PHONE}</span>
          </a>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${variant === 'sidebar' ? 'flex-1' : 'w-full'} bg-gradient-to-r from-[#0d4fd4] to-[#125DE5] hover:from-[#0a44c0] hover:to-[#0f52d4] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-200/60`}
        >
          {isSubmitting ? 'Sending…' : (
            <>{variant === 'sidebar' ? 'Inquire Now' : 'Submit Inquiry'} {!isSubmitting && <ArrowRight size={15} />}</>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 pt-1">
        <span className="flex items-center gap-1 text-[10px] text-gray-400">
          <Lock size={9} /> Confidential
        </span>
        <span className="text-gray-200 text-xs">·</span>
        <span className="flex items-center gap-1 text-[10px] text-gray-400">
          <Clock size={9} /> 24h Response
        </span>
        <span className="text-gray-200 text-xs">·</span>
        <span className="flex items-center gap-1 text-[10px] text-gray-400">
          <ShieldCheck size={9} /> No Obligation
        </span>
      </div>
    </form>
  )
}
