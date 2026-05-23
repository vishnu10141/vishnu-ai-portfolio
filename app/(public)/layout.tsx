import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col gap-y-32 pb-32">{children}</main>
      <Footer />
    </div>
  );
}
