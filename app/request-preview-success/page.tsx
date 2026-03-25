export default function RequestPreviewSuccessPage() {
  return (
    <main className="min-h-screen bg-hero-radial">
      <div className="mx-auto flex max-w-3xl flex-col px-6 pb-24 pt-24 sm:px-8 lg:px-12">
        <div className="rounded-[32px] border border-white/10 bg-panel/80 p-10 shadow-panel backdrop-blur">
          <p className="text-sm uppercase tracking-[0.28em] text-primary/80">Request preview</p>
          <h1 className="mt-5 text-4xl font-medium tracking-[-0.03em] text-slate-50 sm:text-5xl">Thanks — your request has been sent.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            We have your details and will review the request. If the fit is right, the next step is a short conversation about workflow,
            input quality, and decision thresholds.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex h-12 w-fit items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-[15px] font-medium text-foreground transition hover:bg-white/10"
          >
            Back to site
          </a>
        </div>
      </div>
    </main>
  );
}
