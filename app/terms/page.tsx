export default function TermsPage() {
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
        <h1 className="text-4xl font-bold">Terms of Service</h1>

        <p className="mt-4 text-sm text-slate-400">
          Last updated: September 15, 2026
        </p>

        <div className="mt-10 space-y-10 text-slate-300 leading-7">
          <section>
            <h2 className="text-2xl font-semibold text-white">
              1. About ExtensionHub
            </h2>

            <p className="mt-4">
              ExtensionHub provides browser extensions and related digital
              software products designed to help users with productivity,
              accessibility, security, and other web-based workflows.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              2. Acceptance of Terms
            </h2>

            <p className="mt-4">
              By accessing ExtensionHub or using one of our products, you
              agree to these Terms of Service. If you do not agree with these
              terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              3. Products and Subscriptions
            </h2>

            <p className="mt-4">
              Some ExtensionHub products may be offered as paid digital
              products or subscriptions. Product descriptions, pricing,
              billing frequency, and available features are presented during
              the purchase process.
            </p>

            <p className="mt-4">
              Access to subscription features may depend on an active
              subscription and successful payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              4. Payments and Billing
            </h2>

            <p className="mt-4">
              Payments for ExtensionHub products are processed by our
              authorized payment provider. By completing a purchase, you
              authorize the applicable payment provider to process the
              transaction using the payment method you select.
            </p>

            <p className="mt-4">
              Subscription charges are billed according to the billing
              frequency displayed at checkout until the subscription is
              cancelled, subject to the applicable cancellation and refund
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              5. Cancellation
            </h2>

            <p className="mt-4">
              You may cancel an active subscription according to the
              cancellation options made available for the applicable product.
              Cancellation normally prevents future recurring charges but
              does not automatically create a refund for a previous billing
              period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              6. Acceptable Use
            </h2>

            <p className="mt-4">
              You agree not to misuse our products, attempt to bypass
              subscription or access controls, interfere with our services,
              reverse engineer protected components where prohibited by law,
              or use our products for unlawful activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              7. Intellectual Property
            </h2>

            <p className="mt-4">
              ExtensionHub products, software, branding, documentation, and
              related materials are owned by or licensed to ExtensionHub and
              are protected by applicable intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              8. Availability and Changes
            </h2>

            <p className="mt-4">
              We may update, improve, modify, or discontinue features of our
              products from time to time. We may also update these terms when
              necessary to reflect changes to our services or legal
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              9. Disclaimer
            </h2>

            <p className="mt-4">
              Our products are provided as software tools and are intended to
              assist users with their workflows. We do not guarantee that every
              scan, result, recommendation, or software output will identify
              every possible issue or meet every user's particular
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              10. Contact
            </h2>

            <p className="mt-4">
              For questions about these Terms of Service, purchases,
              subscriptions, or our products, contact:
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