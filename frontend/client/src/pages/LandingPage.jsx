import Header from "../components/Header";
import Hero from "../components/Hero";
import StatsStrip from "../components/StatsStrip";
import About from "../components/About";
import WorkshopFlow from "../components/WorkshopFlow";
import TicketSection from "../components/TicketSection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <StatsStrip />
      <About />
      <WorkshopFlow />
      <TicketSection />
      <Footer />
    </>
  );
}
