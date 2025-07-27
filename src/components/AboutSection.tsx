import React, { useEffect, useRef, useState } from 'react';
import { Code, Heart, Coffee, Award } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Code, number: '50+', label: 'Projects Completed', color: 'text-blue-400' },
    { icon: Heart, number: '100+', label: 'Happy Clients', color: 'text-red-400' },
    { icon: Coffee, number: '1000+', label: 'Cups of Coffee', color: 'text-yellow-400' },
    { icon: Award, number: '15+', label: 'Awards Won', color: 'text-green-400' }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tentang Saya
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passion, dedication, dan kreativitas adalah fondasi dari setiap project yang saya kerjakan
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
            <div className="relative">
              <div className="card-float bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-border">
                <div className="relative z-10">
                  <div className="w-full h-80 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-8xl mb-6">
                    👨‍💻
                  </div>
                  
                  {/* Floating Skills */}
                  <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold floating-animation">
                    React
                  </div>
                  <div className="absolute top-20 -left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold floating-animation" style={{ animationDelay: '1s' }}>
                    TypeScript
                  </div>
                  <div className="absolute bottom-10 -right-6 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold floating-animation" style={{ animationDelay: '2s' }}>
                    Node.js
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className={`${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Halo, Saya John Doe! 👋
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Saya adalah seorang Full Stack Developer dengan passion yang besar untuk menciptakan 
                solusi digital yang inovatif dan user-friendly. Dengan pengalaman lebih dari 5 tahun 
                di industri teknologi, saya telah menangani berbagai project mulai dari website 
                sederhana hingga aplikasi enterprise yang kompleks.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Keahlian saya mencakup frontend development dengan React, Vue.js, dan Angular, 
                serta backend development menggunakan Node.js, Python, dan PHP. Saya juga 
                berpengalaman dalam desain UI/UX dan selalu berusaha menciptakan pengalaman 
                pengguna yang optimal.
              </p>

              {/* Skills List */}
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-foreground">Keahlian Utama:</h4>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'UI/UX Design', 'Database Design', 'DevOps'].map((skill, index) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 nav-3d"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button className="btn-3d px-8 py-4 rounded-lg text-white font-semibold text-lg">
                  Download CV Lengkap
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center card-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="card-gradient rounded-2xl p-6 border border-border">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${stat.color} bg-current/10`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.number}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Quote */}
        <div className={`mt-16 text-center ${isVisible ? 'bounce-in' : 'opacity-0'}`}>
          <blockquote className="text-2xl font-medium text-foreground italic max-w-3xl mx-auto">
            "Code is poetry, design is art, and innovation is the bridge that connects them both."
          </blockquote>
          <cite className="text-muted-foreground mt-4 block">- John Doe</cite>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;