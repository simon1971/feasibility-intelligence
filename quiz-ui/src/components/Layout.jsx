export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 sm:px-6 lg:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-xl flex-col justify-center gap-4">
        {children}
      </div>
    </div>
  );
}
