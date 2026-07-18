import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
          <section className="hidden bg-emerald-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-16 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl font-bold">
                AI
              </div>

              <h1 className="text-5xl font-bold">
                TaskPilot AI Admin
              </h1>

              <p className="mt-8 max-w-xl text-xl leading-9 text-emerald-50">
                Manage users, workspace access, email settings, Gmail sync,
                AI reply controls, and system security from one admin area.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide">
                Admin Access
              </p>
              <p className="mt-4 text-lg text-emerald-50">
                This page is only for verified TaskPilot AI administrators.
              </p>
            </div>
          </section>

          <section className="flex items-center justify-center bg-white px-6 py-12 sm:px-12">
            <AdminLoginForm />
          </section>
        </div>
      </div>
    </main>
  );
}
