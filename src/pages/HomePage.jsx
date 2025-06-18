import Navbar from '../components/Navbar/Navbar';
import HeroCarousel from '../components/Homepage/CarrouselPrincipal';
import SecuritySection from '../components/Homepage/SecuritySections';
import FinancialGoals from '../components/Homepage/FinanciaGoals';
import Testimonials from '../components/Homepage/Testimonials';
import ProductCarousel from '../components/Homepage/ProductCarrouse';
import Footer from '../components/Homepage/Footer';

const HomePage = () => {

  return(
    <>
      <Navbar />
      <HeroCarousel />
      <div className="max-w-7xl mx-auto px-1 py-9">
        <ProductCarousel />
      </div>
      <SecuritySection />
      <FinancialGoals />
      <Testimonials />
      <Footer />
    </>
  )

};

export default HomePage;