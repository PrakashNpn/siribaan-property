import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { InquiryForm } from '@/features/inquiry/components/inquiry-form'
import { MapEmbed } from '@/components/map-embed'

export const metadata: Metadata = {
  title: 'Contact Us | Siribaan Property Group',
  description: 'Get in touch with Siribaan Property Group. Our luxury real estate advisors are available 9 AM – 6 PM ICT for private consultations.',
}

const OFFICE_ADDRESS = '1840 Sukhumvit Rd, Phra Khanong Tai, Bangkok 10260'

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-80 flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
          alt="Contact"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Global Reach, Local Expertise</p>
          <h1 className="text-5xl font-bold text-white leading-tight mb-4">
            Contact the<br />Architects of<br /><span className="text-blue-400">Excellence</span>
          </h1>
          <p className="text-gray-200 text-sm max-w-sm leading-relaxed">
            Whether you are seeking a private sanctuary or a strategic investment, our advisors provide bespoke guidance across Bangkok&apos;s premier districts.
          </p>
        </div>
      </section>

      {/* SPLIT SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* FORM */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send an Inquiry</h2>
              <p className="text-gray-500 text-sm mb-6">We typically respond within 2 business hours.</p>
              <InquiryForm variant="contact" />
            </div>

            {/* INFO CARDS */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">Our Office</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    8th Floor, Room No. 828,<br />
                    1840 Sukhumvit Rd, Phra Khanong Tai,<br />
                    Bangkok 10260
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                  <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">Direct Line</h3>
                    <a href="tel:+66910062564" className="text-gray-900 font-semibold text-sm hover:text-blue-600 transition-colors">
                      091 006 2564
                    </a>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={11} className="text-gray-400" />
                      <p className="text-gray-400 text-xs">9 AM – 6 PM (ICT)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                  <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">Email</h3>
                    <a href="mailto:concierge@siribaan.com" className="text-gray-900 font-semibold text-sm hover:text-blue-600 transition-colors break-all">
                      concierge@siribaan.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Experience the Service</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Join our exclusive network of property investors and receive priority access to off-market listings in Sukhumvit and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Find Us</h2>
          <MapEmbed address={OFFICE_ADDRESS} height="h-80" />
        </div>
      </section>
    </>
  )
}
