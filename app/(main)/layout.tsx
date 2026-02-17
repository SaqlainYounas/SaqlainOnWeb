import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DotGrid from "@/components/dot-grid";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DotGrid />
      <Navbar />
      <main className="min-h-screen relative z-10">{children}</main>
      <Footer />
    </>
  );
}
