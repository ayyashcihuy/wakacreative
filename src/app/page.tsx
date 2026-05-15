"use client";

import BackgroundGradient from "@/components/Background/GradientBackground";
import NavigationBar from "@/components/Navigation/NavigationBar";
import FloatingActions from "@/components/Navigation/FloatingActions";
import HeroComponent from "@/components/Section/Hero/HeroComponent";
import AboutSection from "@/components/Section/About/AboutSection";
import { ABOUT_SECTION_CONTENT } from "@/constants/aboutSection";
import ServicesSection from "@/components/Section/Services/ServicesSection";
import VideoSection from "@/components/Section/Videos/VideoSection";
import ProjectsSection from "@/components/Section/Projects/ProjectsSection";
import ClientsSection from "@/components/Section/Clients/ClientsSection";
import ContactSection from "@/components/Section/Contact/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <BackgroundGradient />
      <div className="relative z-10 flex flex-col w-full">
        <NavigationBar />
        <FloatingActions />
        <HeroComponent />
        <AboutSection
          title={ABOUT_SECTION_CONTENT.title}
          description={ABOUT_SECTION_CONTENT.description}
        />
        <ServicesSection />
        <VideoSection />
        <ProjectsSection />
        <ClientsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
