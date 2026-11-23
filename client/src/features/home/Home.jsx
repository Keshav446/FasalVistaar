
import Navbar from "../../components/layout/Navbar";
import Hero from "./components/Hero";
import WhyFasalVistaar from "./components/WhyFasalVistaar";
import CropKnowledge from "./components/CropKnowledge";
import VerifyProduct from "./components/VerifyProduct";
import CompareProducts from "./components/CompareProducts";
import TrustedSellers from "./components/TrustedSellers";
import AIExpert from "./components/AIExpert";
import FarmerReviews from "./components/FarmerReviews";
import FAQs from "./components/FAQs";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyFasalVistaar/>
        <CropKnowledge/>
        <VerifyProduct/> 
        <CompareProducts />
        <TrustedSellers />
        <AIExpert />
        <FarmerReviews />
        <FAQs />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}

export default Home;
