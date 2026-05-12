import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Siribaan Property Group',
  description: 'How Siribaan Property Group collects, uses, and protects your personal information in compliance with the Thailand Personal Data Protection Act (PDPA).',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-blue-50/40 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0d2b6e] via-[#0B2A6B] to-[#071640] pt-28 pb-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 mb-3">Legal</p>
        <h1
          className="text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Privacy Policy
        </h1>
        <p className="text-white/50 text-sm mt-4">Last updated: 1 January 2026</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white/70 backdrop-blur-sm border border-blue-100/70 rounded-2xl shadow-[0_2px_16px_rgba(18,93,229,0.07)] p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p className="mb-3">
              Siribaan Property Group ("we", "us", or "our") is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, retain, and safeguard your personal data in accordance with the <strong>Thailand Personal Data Protection Act B.E. 2562 (PDPA)</strong> and other applicable laws.
            </p>
            <p>
              Please read this policy carefully. By using our website or submitting an inquiry, you acknowledge that you have read and understood this policy. If you do not agree, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Data Controller</h2>
            <p className="mb-3">The Data Controller responsible for your personal data is:</p>
            <div className="bg-blue-50/60 rounded-xl p-4 text-sm text-gray-700 space-y-1">
              <p className="font-semibold text-gray-900">Siribaan Property Group</p>
              <p>8th Floor, Room 828, 1840 Sukhumvit Road, Bangkok, Thailand</p>
              <p>Email: <a href="mailto:info@siribaanproperty.com" className="text-[#125DE5] hover:underline">info@siribaanproperty.com</a></p>
              <p>Tel: <a href="tel:+66910062564" className="text-[#125DE5] hover:underline">+66 91 006 2564</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Personal Data We Collect</h2>
            <p className="mb-3">
              "Personal data" means any information relating to an identified or identifiable natural person. We collect the following categories:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Identity & contact data</strong> — full name, email address, and phone number provided through inquiry or contact forms.</li>
              <li><strong className="text-gray-800">Inquiry & transaction data</strong> — messages, preferred viewing dates, budget range, property interests, and correspondence with our team.</li>
              <li><strong className="text-gray-800">Identity verification data</strong> — where required for property transactions, identification documents (e.g., passport or national ID) collected in accordance with applicable KYC and anti-money laundering obligations.</li>
              <li><strong className="text-gray-800">Technical & usage data</strong> — IP address, browser type, operating system, pages visited, time spent, and referring URLs, collected automatically when you use our website.</li>
              <li><strong className="text-gray-800">Cookie data</strong> — preferences and session data stored via cookies as described in Section 6 below.</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">
              We do not knowingly collect sensitive personal data (such as health, religion, or biometric data) unless required by law and with your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Lawful Basis for Processing</h2>
            <p className="mb-3">
              Under the PDPA (Section 24), we process your personal data only where we have a lawful basis to do so:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Consent</strong> — where you have given us clear consent to process your data for a specific purpose (e.g., receiving marketing updates or newsletters).</li>
              <li><strong className="text-gray-800">Contractual necessity</strong> — where processing is necessary to take steps at your request prior to entering into, or in the performance of, a contract (e.g., processing a property inquiry or arranging a viewing).</li>
              <li><strong className="text-gray-800">Legal obligation</strong> — where we are required to process data to comply with Thai law, including anti-money laundering (AML) and Know Your Customer (KYC) requirements.</li>
              <li><strong className="text-gray-800">Legitimate interests</strong> — where processing is necessary for our legitimate business interests (e.g., improving our website, fraud prevention, internal analytics), provided those interests are not overridden by your rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. How We Use Your Personal Data</h2>
            <p className="mb-3">We use your personal data for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Responding to your property inquiries and arranging property viewings.</li>
              <li>Providing property recommendations, updates, and market information you have requested.</li>
              <li>Processing property transactions and fulfilling our obligations as a real estate agent.</li>
              <li>Verifying identity and conducting KYC/AML checks as required by Thai law.</li>
              <li>Improving, personalising, and administering our website and services.</li>
              <li>Sending marketing communications where you have consented (you may withdraw consent at any time).</li>
              <li>Complying with legal and regulatory obligations.</li>
              <li>Preventing and detecting fraud or other unlawful activity.</li>
            </ul>
            <p className="mt-3 font-medium text-gray-800">We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
            <p className="mb-3">
              Our website uses cookies — small text files stored on your device. We use the following types:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Strictly necessary cookies</strong> — essential for the website to function. These cannot be disabled without affecting core functionality.</li>
              <li><strong className="text-gray-800">Analytics cookies</strong> — help us understand how visitors interact with our website by collecting anonymous usage statistics. These are only set with your consent.</li>
              <li><strong className="text-gray-800">Preference cookies</strong> — remember your settings and preferences to improve your experience on return visits.</li>
            </ul>
            <p className="mt-3">
              You may disable non-essential cookies through your browser settings at any time. Note that disabling certain cookies may affect the performance or functionality of parts of the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Sharing of Personal Data</h2>
            <p className="mb-3">We may share your personal data with:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Service providers</strong> — trusted third parties who assist in operating our website and delivering our services (e.g., cloud hosting, email delivery, analytics platforms). These parties are bound by data processing agreements and may not use your data for their own purposes.</li>
              <li><strong className="text-gray-800">Partner agents and developers</strong> — where necessary to facilitate a property transaction you have expressed interest in, and only with your knowledge.</li>
              <li><strong className="text-gray-800">Regulatory authorities</strong> — government bodies, law enforcement agencies, or regulators where disclosure is required by Thai law or court order.</li>
              <li><strong className="text-gray-800">Professional advisors</strong> — lawyers, auditors, and insurers, under obligations of confidentiality.</li>
            </ul>
            <p className="mt-3">We do not share your data with any third party for their own marketing purposes without your explicit consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. International Data Transfers</h2>
            <p>
              We use cloud-based infrastructure and service providers whose servers may be located outside Thailand. Where personal data is transferred to a country that does not have an equivalent level of data protection, we ensure appropriate safeguards are in place — including contractual clauses that require the recipient to protect the data to the same standard required under the Thailand PDPA (Sections 28–29). By using our website, you acknowledge that your data may be processed in such jurisdictions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Specifically:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-3">
              <li><strong className="text-gray-800">Inquiry data</strong> — retained for up to 24 months from the date of the last interaction.</li>
              <li><strong className="text-gray-800">Transaction records</strong> — retained for at least 5 years as required under Thai commercial and tax law.</li>
              <li><strong className="text-gray-800">Marketing consent records</strong> — retained until consent is withdrawn or becomes irrelevant.</li>
            </ul>
            <p className="mt-3">Upon expiry of the applicable retention period, your data is securely deleted or anonymised.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Your Rights Under the PDPA</h2>
            <p className="mb-3">
              Under the Thailand Personal Data Protection Act B.E. 2562, you have the following rights with respect to your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Right to be informed</strong> — to be told how your data is collected and used (this policy fulfils that obligation).</li>
              <li><strong className="text-gray-800">Right of access</strong> — to obtain a copy of the personal data we hold about you.</li>
              <li><strong className="text-gray-800">Right to rectification</strong> — to request correction of inaccurate or incomplete data.</li>
              <li><strong className="text-gray-800">Right to erasure</strong> — to request deletion of your personal data, subject to our legal retention obligations.</li>
              <li><strong className="text-gray-800">Right to restrict processing</strong> — to request that we limit the ways in which we use your data in certain circumstances.</li>
              <li><strong className="text-gray-800">Right to data portability</strong> — to receive your personal data in a structured, commonly used format.</li>
              <li><strong className="text-gray-800">Right to object</strong> — to object to processing based on legitimate interests or for direct marketing purposes.</li>
              <li><strong className="text-gray-800">Right to withdraw consent</strong> — where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:info@siribaanproperty.com" className="text-[#125DE5] hover:underline">info@siribaanproperty.com</a>. We will respond to your request within <strong>30 days</strong> in accordance with PDPA Section 23. We may need to verify your identity before processing your request.
            </p>
            <p className="mt-3">
              If you are unsatisfied with our response, you have the right to lodge a complaint with the <strong>Personal Data Protection Committee (PDPC)</strong>, the supervisory authority under the Thailand PDPA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Children's Data</h2>
            <p>
              Our website and services are not directed at, and we do not knowingly collect personal data from, persons under the age of 20. If you believe that a child under 20 has provided us with personal data without appropriate parental or guardian consent, please contact us immediately at{' '}
              <a href="mailto:info@siribaanproperty.com" className="text-[#125DE5] hover:underline">info@siribaanproperty.com</a> and we will take steps to delete such data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, accidental loss, alteration, disclosure, or destruction. These measures include encrypted data transmission (TLS/SSL), access controls, and regular security reviews. However, no method of internet transmission is entirely secure. In the event of a personal data breach that is likely to result in high risk to your rights, we will notify you and the PDPC as required by the PDPA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or applicable law. Any material changes will be posted on this page with a revised effective date. Where required by law, we will notify you directly. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">14. Contact Us</h2>
            <p>For questions, requests, or concerns regarding this Privacy Policy or your personal data, please contact us at:</p>
            <div className="mt-3 bg-blue-50/60 rounded-xl p-4 text-sm text-gray-700 space-y-1">
              <p className="font-semibold text-gray-900">Siribaan Property Group — Data Privacy</p>
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
