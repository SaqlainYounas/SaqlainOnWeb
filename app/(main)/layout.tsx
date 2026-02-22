import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DotGrid from "@/components/dot-grid";
import SectionNav from "@/components/section-nav";
import LanguageTour from "@/components/language-tour";

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
      <LanguageTour />
      <main className="min-h-screen relative z-10">{children}</main>
      <Footer />
    </>
  );
}
