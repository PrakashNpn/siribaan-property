'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Lock, Clock, ShieldCheck, Phone } from 'lucide-react'
import { inquirySchema, InquiryFormData } from '../validation'

const CONTACT_PHONE = '+66 91 006 2564'
const CONTACT_PHONE_TEL = '+66910062564'


interface InquiryFormProps {
  propertyId?: string
  variant?: 'sidebar' | 'contact'
}

export function InquiryForm({ propertyId, variant = 'sidebar' }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { propertyId },
  })

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
        <p className="text-sm text-gray-500">Our team will reach out to you within 8 business hours.</p>
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

      <div>
        <label className={labelClass}>Message</label>
        <textarea
          {...register('message')}
          rows={variant === 'sidebar' ? 3 : 4}
          placeholder="Let us know what you're looking for, any questions, or a preferred time to connect…"
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

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
