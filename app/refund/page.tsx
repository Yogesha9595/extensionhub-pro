export default function RefundPage() {
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
        <h1 className="text-4xl font-bold">Refund Policy</h1>

        <p className="mt-4 text-sm text-slate-400">
          Last updated: September 15, 2026
        </p>

        <div className="mt-10 space-y-10 text-slate-300 leading-7">
          <section>
            <h2 className="text-2xl font-semibold text-white">
              1. Overview
            </h2>

            <p className="mt-4">
              ExtensionHub provides digital software products and browser
              extensions. This Refund Policy explains how refund requests for
              paid products and subscriptions are handled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              2. Subscription Charges
            </h2>

            <p className="mt-4">
              Paid subscriptions are billed according to the price and billing
              frequency displayed during checkout. Recurring charges are
              generally non-refundable for a billing period that has already
              started, except where a refund is required by applicable law or
              approved by ExtensionHub.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              3. Refund Requests
            </h2>

            <p className="mt-4">
              If you believe you are entitled to a refund, contact our support
              team with the email address associated with your purchase and
              relevant transaction details.
            </p>

            <p className="mt-4">
              Each request may be reviewed based on the circumstances of the
              purchase, product access, billing history, and applicable legal
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              4. Duplicate or Incorrect Charges
            </h2>

            <p className="mt-4">
              If you believe you were charged more than once for the same
              purchase or were incorrectly charged, please contact us as soon
              as possible so that we can investigate the transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              5. Cancellation
            </h2>

            <p className="mt-4">
              Cancelling a subscription generally prevents future recurring
              charges. Cancellation does not automatically provide a refund
              for charges that have already been processed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              6. Refund Processing
            </h2>

            <p className="mt-4">
              When a refund is approved, it is processed through the payment
              method or payment provider associated with the original
              transaction. The time required for the refund to appear may
              depend on the payment provider and financial institution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              7. Contact Us
            </h2>

            <p className="mt-4">
              For refund or billing questions, contact:
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