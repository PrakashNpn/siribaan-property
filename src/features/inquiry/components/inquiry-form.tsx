'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inquirySchema, InquiryFormData } from '../validation'

interface InquiryFormProps {
  propertyId?: string
  variant?: 'sidebar' | 'contact'
}

export function InquiryForm({ propertyId, variant = 'sidebar' }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      propertyId,
      message: variant === 'sidebar' ? 'I would like to schedule a viewing for this property.' : '',
    },
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
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5 block">Full Name</label>
        <input
          {...register('name')}
          placeholder="John Doe"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-gray-400 transition"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5 block">Email Address</label>
        <input
          {...register('email')}
          type="email"
          placeholder="john@example.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-gray-400 transition"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5 block">Phone Number</label>
        <input
          {...register('phone')}
          placeholder="+66 00 000 0000"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-gray-400 transition"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      {variant === 'sidebar' && (
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5 block">Preferred Date</label>
          <input
            {...register('preferredDate')}
            type="date"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
          />
          <input type="hidden" {...register('message')} />
        </div>
      )}

      {variant === 'contact' && (
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5 block">Message</label>
          <textarea
            {...register('message')}
            rows={4}
            placeholder="Tell us about your property requirements..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-gray-400 transition resize-none"
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
      >
        {variant === 'sidebar' ? 'Request Inspection' : 'Submit Inquiry'}
      </button>
    </form>
  )
}
