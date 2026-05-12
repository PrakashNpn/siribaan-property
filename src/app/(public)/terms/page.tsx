import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions governing your use of the Siribaan Property Group website and services.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | Siribaan Property Group',
    description: 'Terms and conditions governing your use of the Siribaan Property Group website and services.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Siribaan Property Group' }],
    type: 'website',
  },
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <main className="bg-blue-50/40 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0d2b6e] via-[#0B2A6B] to-[#071640] pt-28 pb-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 mb-3">Legal</p>
        <h1
          className="text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Terms of Service
        </h1>
        <p className="text-white/50 text-sm mt-4">Last updated: 1 January 2026</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl shadow-[0_2px_16px_rgba(18,93,229,0.07)] p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Siribaan Property Group website (<strong>siribaanproperty.com</strong>), you agree to be legally bound by these Terms of Service and our <Link href="/privacy-policy" className="text-[#125DE5] hover:underline">Privacy Policy</Link>, which is incorporated by reference. If you do not agree to these terms in their entirety, you must immediately cease using our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Eligibility</h2>
            <p>
              You must be at least 20 years of age — the age of legal majority under Thai law — or acting with the consent of a parent or legal guardian, to use our website or submit inquiries. By using our services, you represent and warrant that you meet this eligibility requirement. We reserve the right to refuse service to anyone for any reason at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Role of Siribaan Property Group</h2>
            <p className="mb-3">
              Siribaan Property Group operates as a <strong>real estate agent and intermediary</strong>. We are not a principal buyer or seller in any property transaction. Our role is to connect prospective buyers, tenants, and investors with property owners and developers.
            </p>
            <p className="mb-3">
              We operate in accordance with the <strong>Real Estate Brokerage Act B.E. 2551</strong> and related regulations. Nothing on this website constitutes an offer, binding agreement, or guarantee of any property transaction. All transactions are subject to separate, duly executed written agreements between the relevant parties.
            </p>
            <p>
              <strong>Foreign Ownership Notice:</strong> Thai law imposes restrictions on foreign ownership of land and certain property types under the <strong>Land Code Act</strong> and the <strong>Condominium Act B.E. 2522</strong>. Prospective foreign buyers are strongly advised to seek independent legal advice before proceeding with any property inquiry or transaction. Siribaan Property Group accepts no liability for the legal consequences of any property acquisition by foreign nationals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Acceptable Use</h2>
            <p className="mb-3">You agree to use this website only for lawful purposes and in a manner consistent with these terms. You must not:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Use the website to transmit unsolicited, unauthorised, or deceptive communications.</li>
              <li>Attempt to gain unauthorised access to any part of the website, its servers, or connected systems.</li>
              <li>Reproduce, distribute, modify, or commercially exploit any part of the website without our prior written consent.</li>
              <li>Use the website in any way that could damage, disable, overburden, or impair our infrastructure.</li>
              <li>Submit false, misleading, or fraudulent information through any form or inquiry channel.</li>
              <li>Use automated tools (bots, scrapers, crawlers) to access or extract data from the website without our written permission.</li>
              <li>Violate any applicable local, national, or international law or regulation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Property Listings and Information</h2>
            <p className="mb-3">
              All property listings, prices, descriptions, floor plans, and availability information displayed on this website are provided for general informational purposes only. While we make every reasonable effort to ensure accuracy, Siribaan Property Group does not warrant that any listing is complete, current, or free from error.
            </p>
            <p>
              Prices are indicative and subject to change without notice. Images are for illustrative purposes only and may not reflect the exact condition or current state of a property. Any reliance you place on listing information is entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Inquiry Submissions and Consent</h2>
            <p>
              When you submit an inquiry through our platform, you expressly consent to being contacted by our team using the contact details you provide, for the purpose of responding to your inquiry and facilitating property services. Your personal data will be handled in accordance with our <Link href="/privacy-policy" className="text-[#125DE5] hover:underline">Privacy Policy</Link> and the Thailand PDPA. Submitting an inquiry does not create a reservation, binding offer, agency agreement, or any contractual obligation on either party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Intellectual Property</h2>
            <p>
              All content on this website — including but not limited to text, property listings, photographs, videos, logos, graphics, design layouts, and software code — is the property of Siribaan Property Group or its licensors and is protected under Thai and international copyright, trademark, and intellectual property law. You are granted a limited, non-exclusive, non-transferable licence to access and use the website for personal, non-commercial purposes only. No rights are granted beyond this scope without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Third-Party Links and Services</h2>
            <p>
              Our website may contain links to third-party websites, map services, or embedded content. These links are provided solely for your convenience. Siribaan Property Group does not endorse, control, or accept responsibility for the content, privacy practices, or reliability of any third-party sites or services. Your access to and use of third-party links is entirely at your own risk and subject to those parties' terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Disclaimer of Warranties</h2>
            <p>
              This website and all its content are provided on an "as is" and "as available" basis. To the fullest extent permitted by applicable law, Siribaan Property Group expressly disclaims all warranties of any kind, whether express, implied, or statutory — including but not limited to implied warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement. We do not warrant that the website will be uninterrupted, error-free, secure, or free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Limitation of Liability</h2>
            <p className="mb-3">
              To the fullest extent permitted by law, Siribaan Property Group, its directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including but not limited to loss of profit, revenue, data, goodwill, or business opportunity — arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Your use of, or inability to use, the website or its services.</li>
              <li>Any inaccuracy, error, or omission in property listing information.</li>
              <li>Any property transaction entered into in reliance on information found on this website.</li>
              <li>Unauthorised access to or alteration of your data.</li>
            </ul>
            <p className="mt-3">
              Our total aggregate liability to you in connection with these Terms shall not exceed the amount of any fees you have paid us in the three months preceding the claim, or THB 10,000, whichever is greater. Nothing in these Terms limits or excludes liability for death or personal injury caused by our negligence, or for fraud.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Siribaan Property Group and its directors, officers, employees, and agents from and against any claims, damages, losses, costs, and expenses (including reasonable legal fees) arising from: (a) your use or misuse of the website; (b) your breach of these Terms; (c) your violation of any applicable law or third-party rights; or (d) any content or information you submit through the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Consumer Protection</h2>
            <p>
              Nothing in these Terms is intended to limit or exclude any rights you may have as a consumer under the <strong>Consumer Protection Act B.E. 2522</strong> and its amendments or any other mandatory consumer protection legislation applicable in Thailand. Statutory rights that cannot lawfully be excluded remain unaffected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Governing Law and Dispute Resolution</h2>
            <p className="mb-3">
              These Terms of Service shall be governed by and construed exclusively in accordance with the laws of the <strong>Kingdom of Thailand</strong>, without regard to its conflict of law provisions.
            </p>
            <p className="mb-3">
              In the event of any dispute arising out of or in connection with these Terms or your use of the website, the parties shall first attempt to resolve the matter amicably through good-faith negotiation within 30 days of written notice of the dispute.
            </p>
            <p>
              If the dispute cannot be resolved through negotiation, it shall be subject to the exclusive jurisdiction of the <strong>Civil Court, Bangkok</strong>, Thailand.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">14. Language</h2>
            <p>
              These Terms of Service are provided in English. In the event of any inconsistency between an English version and any translation, the <strong>English version shall prevail</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">15. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Where changes are material, we will endeavour to provide reasonable notice (e.g., a notice on the website) before the changes take effect. The revised terms will be posted on this page with an updated effective date. Your continued use of the website after any changes constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">16. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid, unlawful, or unenforceable by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it enforceable, or severed from these Terms. The remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">17. Waiver</h2>
            <p>
              No failure or delay by Siribaan Property Group in exercising any right or remedy under these Terms shall operate as a waiver of that right or remedy. A waiver of any breach shall not constitute a waiver of any subsequent breach of the same or any other provision.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">18. Entire Agreement</h2>
            <p>
              These Terms of Service, together with our <Link href="/privacy-policy" className="text-[#125DE5] hover:underline">Privacy Policy</Link>, constitute the entire agreement between you and Siribaan Property Group with respect to your use of the website, and supersede all prior or contemporaneous agreements, representations, or understandings relating to the same subject matter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">19. Contact Us</h2>
            <p>For any questions regarding these Terms of Service, please contact us at:</p>
            <div className="mt-3 bg-blue-50/60 rounded-xl p-4 text-sm text-gray-700 space-y-1">
              <p className="font-semibold text-gray-900">Siribaan Property Group</p>
              <p>8th Floor, Room 828, 1840 Sukhumvit Road, Bangkok, Thailand</p>
              <p>Email: <a href="mailto:info@siribaanproperty.com" className="text-[#125DE5] hover:underline">info@siribaanproperty.com</a></p>
              <p>Tel: <a href="tel:+66910062564" className="text-[#125DE5] hover:underline">+66 91 006 2564</a></p>
            </div>
          </section>

        </div>

        <div className="text-center mt-10">
          <Link href="/" className="text-sm text-[#125DE5] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
