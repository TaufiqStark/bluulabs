export const metadata = {
  title: "Settings | Admin - taufiq.",
};

export default function SettingsAdminPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">System settings</h1>
        <p className="mt-1 text-sm text-white/60">Manage global configuration and environment variables.</p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Environment Configuration</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              For security reasons, core application settings like Database URLs and Storage API Keys are managed via Environment Variables (<code>.env</code> file) rather than stored in the database.
            </p>
          </div>
          <div className="mt-5">
             <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <div className="sm:flex sm:items-start">
                   <div className="mt-3 sm:mt-0">
                      <div className="text-sm font-medium text-gray-900">Database Connection</div>
                      <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                         <div>Connected via Server Environment (Drizzle)</div>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="rounded-md bg-gray-50 px-6 py-5 mt-4 sm:flex sm:items-start sm:justify-between">
                <div className="sm:flex sm:items-start">
                   <div className="mt-3 sm:mt-0">
                      <div className="text-sm font-medium text-gray-900">Authentication</div>
                      <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                         <div>Currently open. Consider adding NextAuth or basic password protection to the <code>/admin</code> route.</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
