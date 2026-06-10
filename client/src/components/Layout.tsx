import Navigation from './Navigation';
import Footer from './sections/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ overflowX: 'clip' }}>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
