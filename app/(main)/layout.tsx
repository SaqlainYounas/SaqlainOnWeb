import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DotGrid from "@/components/dot-grid";
import SectionNav from "@/components/section-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DotGrid />
      <Navbar />
      <SectionNav />
      <main className="min-h-screen relative z-10">{children}</main>
      <Footer />
    </>
  );
}
