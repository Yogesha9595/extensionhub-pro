export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Extension<span className="text-blue-400">Hub</span>
          </a>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold">Privacy Notice</h1>

        <p className="mt-4 text-sm text-slate-400">
          Last updated: September 15, 2026
        </p>

        <div className="mt-10 space-y-10 text-slate-300 leading-7">
          <section>
            <h2 className="text-2xl font-semibold text-white">
              1. Introduction
            </h2>

            <p className="mt-4">
              ExtensionHub respects your privacy. This Privacy Notice
              explains how information may be collected, used, and protected
              when you visit our website or use our browser extensions and
              related services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              2. Information We May Collect
            </h2>

            <p className="mt-4">
              Depending on the product or service you use, we may process
              information such as your email address, account information,
              subscription status, transaction information, and technical
              information required to operate and secure our services.
            </p>

            <p className="mt-4">
              We aim to collect only information that is reasonably necessary
              to provide, maintain, secure, and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              3. Browser Extension Data
            </h2>

            <p className="mt-4">
              Our browser extensions may process information from webpages
              when you explicitly use features that require webpage
              inspection or analysis.
            </p>

            <p className="mt-4">
              For example, accessibility testing features may inspect page
              structure, elements, attributes, and related information in
              order to generate testing results.
            </p>

            <p className="mt-4">
              Product-specific data practices may vary depending on the
              extension and its functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              4. How We Use Information
            </h2>

            <p className="mt-4">
              Information may be used to:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Provide and operate our products and services.</li>
              <li>Manage user accounts and subscriptions.</li>
              <li>Process payments and maintain billing records.</li>
              <li>Provide customer support.</li>
              <li>Prevent fraud, abuse, and unauthorized access.</li>
              <li>Improve reliability, security, and product functionality.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              5. Payment Information
            </h2>

            <p className="mt-4">
              Payments for our products are processed by our payment
              provider. We do not intend to store complete payment card
              details on our own systems.
            </p>

            <p className="mt-4">
              Payment providers may process information according to their
              own privacy policies and terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              6. Service Providers
            </h2>

            <p className="mt-4">
              We may use third-party service providers to operate parts of our
              services, including hosting, authentication, payment
              processing, analytics, infrastructure, and security services.
            </p>

            <p className="mt-4">
              These providers may process information only as necessary to
              provide their services and according to their applicable terms
              and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              7. Data Security
            </h2>

            <p className="mt-4">
              We use reasonable technical and organizational measures designed
              to protect information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>

            <p className="mt-4">
              However, no internet transmission or electronic storage system
              can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              8. Data Retention
            </h2>

            <p className="mt-4">
              We retain information for as long as reasonably necessary to
              provide our services, maintain business and transaction
              records, comply with legal obligations, resolve disputes, and
              enforce applicable agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              9. Your Choices
            </h2>

            <p className="mt-4">
              Depending on applicable law, you may have rights regarding your
              personal information, including requesting access, correction,
              deletion, or other actions concerning your information.
            </p>

            <p className="mt-4">
              To make a privacy-related request, contact us using the email
              address below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              10. Changes to This Notice
            </h2>

            <p className="mt-4">
              We may update this Privacy Notice from time to time to reflect
              changes to our products, services, or legal requirements. The
              updated version will be published on this page with a revised
              update date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              11. Contact Us
            </h2>

            <p className="mt-4">
              If you have questions or requests regarding this Privacy Notice,
              contact:
            </p>

            <p className="mt-3">
              <a
                href="mailto:support@extensionhub.in"
                className="text-blue-400 hover:text-blue-300"
              >
                support@extensionhub.in
              </a>
            </p>
          </section>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <a
            href="/"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            ← Back to ExtensionHub
          </a>
        </div>
      </article>
    </main>
  );
}