import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import ProjectSection from '@/components/ProjectSection';
import SertifikatSection from '@/components/SertifikatSection';
import SkillSection from '@/components/SkillSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import WhatsAppChat from '@/components/WhatsAppChat';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'project', 'sertifikat', 'skill', 'experience', 'kontak'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ProjectSection />
        <SertifikatSection />
        <SkillSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <WhatsAppChat />
      
      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 nav-3d opacity-80 hover:opacity-100"
        title="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
};

export default Index;
