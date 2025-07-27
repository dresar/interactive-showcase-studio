import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About Me', icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'project', label: 'Project', icon: '💼' },
    { id: 'sertifikat', label: 'Sertifikat', icon: '🏆' },
    { id: 'skill', label: 'Skill', icon: '⚡' },
    { id: 'experience', label: 'Experience', icon: '🚀' },
    { id: 'kontak', label: 'Kontak', icon: '📱' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary pulse-glow">
                Portfolio
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`nav-3d px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentSection === item.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'text-foreground hover:text-primary'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="nav-3d p-2 rounded-lg text-foreground hover:text-primary"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/90 backdrop-blur-lg">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`nav-3d w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  currentSection === item.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground hover:text-primary hover:bg-secondary'
                } ${isOpen ? 'slide-in-left' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Floating Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
                currentSection === item.id
                  ? 'bg-primary shadow-lg'
                  : 'bg-secondary hover:bg-primary'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                boxShadow: currentSection === item.id ? 'var(--shadow-glow)' : 'none'
              }}
              title={item.label}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;