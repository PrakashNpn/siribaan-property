import { NextRequest, NextResponse } from 'next/server'
import { inquiryService } from '@/features/inquiry/server/inquiry.service'
import { inquirySchema } from '@/features/inquiry/validation'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = inquirySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const inquiry = await inquiryService.create(parsed.data)

  // Send email notification (only if RESEND_API_KEY is configured)
  if (resend && process.env.INQUIRY_EMAIL_TO) {
    const { name, email, phone, message, preferredDate, propertyId } = parsed.data
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    await resend.emails.send({
      from: 'Siribaan Website <onboarding@resend.dev>',
      to: process.env.INQUIRY_EMAIL_TO,
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1d4ed8; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Property Inquiry</h1>
            <p style="color: #bfdbfe; margin: 6px 0 0; font-size: 14px;">Siribaan Property Group</p>
          </div>
          <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 130px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${esc(name)}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 8px 0; font-weight: 600; color: #111827;"><a href="mailto:${esc(email)}" style="color: #1d4ed8;">${esc(email)}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Phone</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${esc(phone)}</td></tr>
              ${preferredDate ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Preferred Date</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${esc(preferredDate)}</td></tr>` : ''}
              ${propertyId ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Property ID</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${esc(propertyId)}</td></tr>` : ''}
            </table>
            ${message ? `
            <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 13px; margin: 0 0 6px;">Message</p>
              <p style="color: #111827; margin: 0; line-height: 1.6;">${esc(message)}</p>
            </div>` : ''}
          </div>
        </div>
      `,
    }).catch(console.error)
  }

  return NextResponse.json(inquiry, { status: 201 })
}
