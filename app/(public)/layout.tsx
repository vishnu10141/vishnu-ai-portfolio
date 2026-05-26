import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col min-h-screen relative bg-grid">
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-green-500/5 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute top-1/2 left-0 w-[40vw] h-[60vh] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen -translate-y-1/2" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col gap-y-32 pb-0 pt-20">{children}</main>
        
        {/* STRUCTURAL GAP: Forces the footer into the next vertical scroll area, completely preventing compression */}
        <div className="w-full h-[15vh] min-h-[150px] shrink-0 pointer-events-none" aria-hidden="true" />
        
        <Footer />
      </div>
    </div>
  );
}
