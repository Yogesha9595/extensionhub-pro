export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Extension<span className="text-blue-400">Hub</span>
          </a>

          <nav className="flex items-center gap-5 text-sm text-slate-300">
            <a href="/" className="transition hover:text-white">
              Home
            </a>
            <a href="/terms" className="transition hover:text-white">
              Terms
            </a>
            <a href="/privacy" className="transition hover:text-white">
              Privacy
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
          <div className="mx-auto inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            AccessScan Pro
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Professional Accessibility Testing
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            AccessScan Pro is a Chrome extension for QA engineers and
            developers who need practical tools for auditing web accessibility
            and reviewing accessibility issues.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mx-auto max-w-xl rounded-2xl border border-blue-400/30 bg-white/[0.03] p-8 shadow-2xl shadow-blue-950/20 sm:p-10">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Pro Plan
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                AccessScan Pro
              </h2>

              <div className="mt-6 flex items-end justify-center gap-2">
                <span className="text-5xl font-bold tracking-tight">
                  $9.99
                </span>
                <span className="pb-2 text-slate-400">
                  USD / month
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-400">
                Recurring monthly subscription.
              </p>
            </div>

            <div className="my-8 border-t border-white/10" />

            <div>
              <h3 className="text-lg font-semibold">
                Included with AccessScan Pro
              </h3>

              <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Full accessibility audit reports</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Detailed accessibility findings</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>WCAG-related guidance</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Recommendations for identified issues</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Element highlighting and selector copying</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>PDF, HTML, CSV and JSON report exports</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/60 p-4 text-sm leading-6 text-slate-400">
              AccessScan Pro is delivered as a Chrome extension and provides
              tools for auditing web accessibility.
            </div>

            <div className="mt-8">
              <a
                href="https://extensionhub.in"
                className="flex w-full items-center justify-center rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
              >
                Get AccessScan Pro
              </a>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Payment is processed securely by Paddle. By subscribing, you
              agree to the applicable terms and policies.
            </p>
          </div>
        </div>
      </section>

      {/* Product information */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-8 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold">
                Accessibility Auditing
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Scan web pages and review accessibility issues identified by
                AccessScan.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold">
                Detailed Reports
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Review findings, guidance and recommendations in a structured
                report.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold">
                Export Options
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Export reports in PDF, HTML, CSV and JSON formats for
                documentation and testing workflows.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="border-b border-white/10 bg-slate-900">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold">
            Subscription & Policies
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            AccessScan Pro is offered as a recurring monthly subscription.
            Please review the applicable policies before subscribing.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm">
            <a
              href="/terms"
              className="text-slate-300 transition hover:text-white"
            >
              Terms of Service
            </a>

            <a
              href="/privacy"
              className="text-slate-300 transition hover:text-white"
            >
              Privacy Notice
            </a>

            <a
              href="/refund"
              className="text-slate-300 transition hover:text-white"
            >
              Refund Policy
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <div className="text-lg font-bold">
              Extension<span className="text-blue-400">Hub</span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Browser extensions and productivity tools.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-400 sm:justify-end">
            <a
              href="/terms"
              className="transition hover:text-white"
            >
              Terms
            </a>

            <a
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy
            </a>

            <a
              href="/refund"
              className="transition hover:text-white"
            >
              Refunds
            </a>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} ExtensionHub. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}