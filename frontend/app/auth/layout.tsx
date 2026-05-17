export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}