export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Extension<span className="text-blue-400">Hub</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
            <a href="#products" className="transition hover:text-white">
              Products
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#support" className="transition hover:text-white">
              Support
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            Trusted tools for modern browsers
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Powerful Chrome Extensions for
            <span className="text-blue-400"> Better Productivity</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            ExtensionHub provides practical browser extensions designed to
            improve productivity, accessibility, security, and everyday
            workflows.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#products"
              className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Explore Products
            </a>

            <a
              href="#about"
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Our Products
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Tools built to solve real problems
            </h2>

            <p className="mt-4 text-slate-300">
              Explore our growing collection of browser extensions and
              productivity tools.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* AccessScan */}
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-blue-400/40 hover:bg-white/[0.05]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-xl">
                A
              </div>

              <h3 className="mt-6 text-2xl font-semibold">AccessScan</h3>

              <p className="mt-3 leading-7 text-slate-300">
                A professional accessibility testing extension for QA
                engineers and developers. Scan web pages for accessibility
                issues and generate detailed testing reports.
              </p>

              <div className="mt-6">
                <a
                  href="/checkout"
                  className="inline-flex rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-600"
                >
                  View AccessScan
                </a>
              </div>
            </article>

            {/* Coming Soon */}
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-xl">
                +
              </div>

              <h3 className="mt-6 text-2xl font-semibold">More Extensions</h3>

              <p className="mt-3 leading-7 text-slate-300">
                We are working on additional browser extensions focused on
                productivity, developer tools, security, and smarter web
                workflows.
              </p>

              <div className="mt-6">
                <span className="inline-flex rounded-lg border border-white/10 px-5 py-2.5 text-sm text-slate-400">
                  Coming Soon
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              About ExtensionHub
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Simple, useful browser software
            </h2>

            <p className="mt-6 leading-8 text-slate-300">
              ExtensionHub is focused on creating and distributing practical
              browser extensions that help users work more efficiently and
              solve specific problems directly from their browser.
            </p>

            <p className="mt-4 leading-8 text-slate-300">
              Our products are designed with usability, reliability, privacy,
              and transparent pricing in mind.
            </p>
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Support
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Need help?
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              If you have questions about our products, purchases,
              subscriptions, or account access, please contact our support
              team.
            </p>

            <a
              href="mailto:support@extensionhub.in"
              className="mt-6 inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/5"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="border-b border-white/10 bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold">Policies</h2>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div id="terms">
              <h3 className="text-lg font-semibold">Terms of Service</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                By using ExtensionHub products, you agree to use our services
                lawfully and in accordance with the applicable product terms.
              </p>
            </div>

            <div id="privacy">
              <h3 className="text-lg font-semibold">Privacy Notice</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                We respect user privacy and aim to collect and process only
                information necessary to provide our products and services.
              </p>
            </div>

            <div id="refund-policy">
              <h3 className="text-lg font-semibold">Refund Policy</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Refund requests are reviewed according to our refund terms and
                the circumstances of the purchase or subscription.
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Full policy documents will be provided on the applicable policy
            pages before commercial launch.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-lg font-bold">
              Extension<span className="text-blue-400">Hub</span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Browser extensions and productivity tools.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-400">
            <a href="/terms" className="transition hover:text-white">
              Terms of Service
            </a>

            <a href="/privacy" className="transition hover:text-white">
               Privacy Notice
            </a>

            <a href="/refund" className="transition hover:text-white">
               Refund Policy
            </a>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-500">
            © {new Date().getFullYear()} ExtensionHub. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}