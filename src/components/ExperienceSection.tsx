import React, { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Briefcase, TrendingUp, Users, Award } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  description: string;
  achievements: string[];
  technologies: string[];
  teamSize?: number;
  projects?: number;
}

const ExperienceSection: React.FC = () => {
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

  const experiences: Experience[] = [
    {
      id: '1',
      company: 'TechCorp Indonesia',
      position: 'Senior Full Stack Developer',
      startDate: '2023-01',
      endDate: null, // Current job
      location: 'Jakarta, Indonesia',
      type: 'full-time',
      description: 'Memimpin tim pengembangan untuk membangun aplikasi enterprise yang complex. Bertanggung jawab dalam arsitektur sistem, code review, dan mentoring junior developers.',
      achievements: [
        'Meningkatkan performance aplikasi sebesar 40%',
        'Mengimplementasikan microservices architecture',
        'Memimpin tim 8 developers',
        'Mengurangi bug production hingga 60%',
        'Mengembangkan CI/CD pipeline yang robust'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'Docker', 'AWS', 'MongoDB', 'Redis'],
      teamSize: 8,
      projects: 12
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2021-08',
      endDate: '2022-12',
      location: 'Remote',
      type: 'full-time',
      description: 'Mengembangkan MVP dari nol hingga menjadi aplikasi dengan 10K+ users. Bekerja dalam lingkungan startup yang fast-paced dengan tanggung jawab end-to-end development.',
      achievements: [
        'Membangun aplikasi dari konsep hingga production',
        'Mencapai 10,000+ registered users',
        'Mengintegrasikan multiple payment gateways',
        'Implementasi real-time notifications',
        'Optimasi SEO yang meningkatkan traffic 200%'
      ],
      technologies: ['Vue.js', 'Express.js', 'PostgreSQL', 'Socket.io', 'Stripe', 'Google Cloud'],
      teamSize: 5,
      projects: 8
    },
    {
      id: '3',
      company: 'Digital Agency Pro',
      position: 'Frontend Developer',
      startDate: '2020-03',
      endDate: '2021-07',
      location: 'Bandung, Indonesia',
      type: 'full-time',
      description: 'Fokus pada pengembangan user interface yang responsive dan interactive untuk berbagai klien dari UMKM hingga korporasi besar.',
      achievements: [
        'Menyelesaikan 25+ project client',
        'Meningkatkan conversion rate client rata-rata 35%',
        'Mengembangkan component library perusahaan',
        'Training junior developer dalam modern frontend',
        'Memenangkan "Best UI/UX" award internal'
      ],
      technologies: ['React', 'Angular', 'Sass', 'Figma', 'WordPress', 'jQuery'],
      teamSize: 12,
      projects: 25
    },
    {
      id: '4',
      company: 'Freelance Developer',
      position: 'Full Stack Developer',
      startDate: '2019-06',
      endDate: '2020-02',
      location: 'Remote',
      type: 'freelance',
      description: 'Bekerja sebagai freelancer untuk berbagai klien lokal dan internasional. Menangani project dari website company profile hingga e-commerce platform.',
      achievements: [
        'Menyelesaikan 15+ project freelance',
        'Rating 4.9/5 di platform freelance',
        'Membangun network klien international',
        'Mengembangkan 3 e-commerce platforms',
        'Total revenue $25,000+ dalam 8 bulan'
      ],
      technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap', 'WooCommerce'],
      projects: 15
    },
    {
      id: '5',
      company: 'PT Teknologi Masa Depan',
      position: 'Junior Web Developer',
      startDate: '2018-08',
      endDate: '2019-05',
      location: 'Jakarta, Indonesia',
      type: 'full-time',
      description: 'Posisi pertama sebagai developer profesional. Belajar best practices dalam software development dan bekerja dalam tim yang terstruktur.',
      achievements: [
        'Menyelesaikan training program 6 bulan',
        'Berkontribusi dalam 8 project perusahaan',
        'Meningkatkan skill dari junior ke intermediate',
        'Mendapat promosi dalam 10 bulan',
        'Membantu optimasi website loading time 50%'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Git'],
      teamSize: 6,
      projects: 8
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long'
    });
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (months < 12) {
      return `${months} bulan`;
    }
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) {
      return `${years} tahun`;
    }
    
    return `${years} tahun ${remainingMonths} bulan`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-500';
      case 'part-time': return 'bg-blue-500';
      case 'contract': return 'bg-yellow-500';
      case 'freelance': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'full-time': return 'Full Time';
      case 'part-time': return 'Part Time';
      case 'contract': return 'Contract';
      case 'freelance': return 'Freelance';
      default: return type;
    }
  };

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 right-40 w-72 h-72 bg-primary rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-40 left-40 w-96 h-96 bg-secondary rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pengalaman Profesional
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Perjalanan karir dan pengalaman kerja yang telah membentuk keahlian saya
          </p>
        </div>

        {/* Experience Stats */}
        <div className={`mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, number: '5+', label: 'Tahun Pengalaman', color: 'text-blue-400' },
              { icon: Briefcase, number: '5', label: 'Perusahaan', color: 'text-green-400' },
              { icon: Users, number: '30+', label: 'Tim Members', color: 'text-purple-400' },
              { icon: Award, number: '68+', label: 'Project Selesai', color: 'text-yellow-400' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center card-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-gradient rounded-xl p-6 border border-border">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>
            
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className={`relative ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg pulse-glow"></div>
                  
                  {/* Experience Card */}
                  <div className="ml-20">
                    <div className="card-float card-gradient rounded-2xl p-8 border border-border">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-foreground">
                              {experience.position}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getTypeColor(experience.type)}`}>
                              {getTypeLabel(experience.type)}
                            </span>
                            {experience.endDate === null && (
                              <span className="px-2 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">
                                Current
                              </span>
                            )}
                          </div>
                          
                          <p className="text-lg text-primary font-semibold mb-3">
                            {experience.company}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Sekarang'}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {experience.location}
                            </div>
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                              {calculateDuration(experience.startDate, experience.endDate)}
                            </span>
                          </div>
                        </div>
                        
                        {(experience.teamSize || experience.projects) && (
                          <div className="flex gap-4">
                            {experience.teamSize && (
                              <div className="text-center">
                                <div className="text-lg font-bold text-primary">{experience.teamSize}</div>
                                <div className="text-xs text-muted-foreground">Team Size</div>
                              </div>
                            )}
                            {experience.projects && (
                              <div className="text-center">
                                <div className="text-lg font-bold text-secondary">{experience.projects}</div>
                                <div className="text-xs text-muted-foreground">Projects</div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {experience.description}
                      </p>

                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Achievements */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-500" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, achievementIndex) => (
                              <li
                                key={achievementIndex}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 nav-3d"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Progression */}
        <div className={`mt-16 ${isVisible ? 'bounce-in' : 'opacity-0'}`}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">Career Progression</h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {['Junior Developer', 'Web Developer', 'Full Stack Developer', 'Senior Developer', 'Tech Lead'].map((role, index) => (
                <React.Fragment key={role}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                      index < 4 ? 'bg-primary' : 'bg-primary/50'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm text-muted-foreground mt-2 text-center max-w-20">
                      {role}
                    </span>
                  </div>
                  {index < 4 && (
                    <div className={`w-8 h-0.5 ${index < 3 ? 'bg-primary' : 'bg-primary/30'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;