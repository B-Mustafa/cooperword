'use client'
import BackgroundParticles from "@/components/BackgroundParticles";
import Divider from "@/components/Divider";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import Navbar from "@/components/Navbar";
import { PricingCard } from "@/components/PricingCard";

// PWA 
 
import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions'
 
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\\-/g, '+')
    .replace(/_/g, '/')
 
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

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
      <div className="flex flex-row flex-wrap min-h-[30rem] p-2 items-end">
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
