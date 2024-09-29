import BackgroundParticles from "@/components/BackgroundParticles";
import Divider from "@/components/Divider";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import Navbar from "@/components/Navbar";
import { PricingCard } from "@/components/PricingCard";

// PWA 

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="w-full h-screen absolute -z-10">
        <BackgroundParticles quantity={300} />
      </div>
      <LandingHero />
      <Divider />
      <Features />
      <Divider />
        <h2 className="text-4xl font-bold text-white w-full text-center"> Pricing </h2>
      <div className="flex flex-row flex-wrap min-h-[30rem] p-4 items-end">
        <PricingCard
          title="Basic"
          price="$199"
          items={[
            {
              features: [
                "Create up to 50 Events",
                "Basic Reminder Notifications",
                "Access to Standard Templates",
                "Email Support",
              ],
            },
          ]}
        />
        <PricingCard
          title="Premium ++"
          price="$799"
          popular={true}
          items={[
            {
              features: [
                "Unlimited Events Creation",
                "Advanced Reminder Notifications",
                "Custom Templates",
                "24/7 Priority Support",
                "One-click Event Duplication",
                "Integration with Calendars",
                "Analytics Dashboard",
                "Dedicated Account Manager",
              ],
            },
          ]}
        />
        <PricingCard
          title="Premium"
          price="$399"
          items={[
            {
              features: [
                "Create up to 100 Events",
                "Standard Reminder Notifications",
                "Access to All Templates",
                "Dedicated Support",
                "Integration with Google Calendar",
              ],
            },
          ]}
        />
      </div>
      <Footer/>
    </div>
  );
}
