import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full Stack Developer & UI/UX Designer';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl floating-animation"
          style={parallaxStyle}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl floating-animation"
          style={{
            ...parallaxStyle,
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute top-20 left-20 w-60 h-60 bg-accent/10 rounded-full blur-2xl floating-animation"
          style={{
            ...parallaxStyle,
            animationDelay: '4s'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="mb-8 fade-in-up">
          <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 card-float">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full p-1">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-lg pulse-glow"></div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 fade-in-up">
          <span className="block text-foreground">Halo, Saya</span>
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            John Doe
          </span>
        </h1>

        {/* Typed Text */}
        <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 fade-in-up h-12 flex items-center justify-center">
          <span className="font-mono">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto fade-in-up leading-relaxed">
          Passionate about creating innovative digital solutions with modern technologies. 
          I bring ideas to life through clean code and beautiful design.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up">
          <button className="btn-3d px-8 py-4 rounded-lg text-white font-semibold text-lg flex items-center gap-2 hover:shadow-xl">
            <Download className="w-5 h-5" />
            Download CV
          </button>
          <button className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 nav-3d">
            Lihat Portfolio
          </button>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center mb-12 fade-in-up">
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#', label: 'Email' }
          ].map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              className="p-4 rounded-full border border-border hover:border-primary transition-all duration-300 nav-3d group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in-up">
          <div className="flex flex-col items-center text-muted-foreground">
            <span className="text-sm mb-2">Scroll untuk lebih lanjut</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 floating-animation">
        <div className="w-4 h-4 bg-primary rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-40 right-20 floating-animation" style={{ animationDelay: '1s' }}>
        <div className="w-3 h-3 bg-secondary rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-40 left-20 floating-animation" style={{ animationDelay: '3s' }}>
        <div className="w-5 h-5 bg-accent rounded-full opacity-50"></div>
      </div>
    </section>
  );
};

export default HeroSection;