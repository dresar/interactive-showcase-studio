import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa?: string;
  achievements: string[];
  description: string;
  type: 'formal' | 'certification' | 'course';
}

const EducationSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('formal');
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

  const educations: Education[] = [
    {
      id: '1',
      institution: 'Universitas Teknologi Indonesia',
      degree: 'S1 Teknik Informatika',
      field: 'Computer Science',
      startDate: '2018-08',
      endDate: '2022-07',
      location: 'Jakarta, Indonesia',
      gpa: '3.85',
      achievements: [
        'Magna Cum Laude Graduate',
        'Best Final Project Award',
        'Dean\'s List for 6 semesters',
        'Active in Programming Club'
      ],
      description: 'Fokus pada software engineering, web development, dan artificial intelligence. Menyelesaikan final project tentang machine learning untuk prediksi harga saham.',
      type: 'formal'
    },
    {
      id: '2',
      institution: 'SMA Negeri 1 Jakarta',
      degree: 'SMA',
      field: 'Science Major (IPA)',
      startDate: '2015-07',
      endDate: '2018-06',
      location: 'Jakarta, Indonesia',
      achievements: [
        'Top 5 Graduate',
        'Mathematics Olympiad Winner',
        'Student Council President',
        'Computer Club Founder'
      ],
      description: 'Mengambil jurusan IPA dengan fokus pada matematika dan fisika. Aktif dalam berbagai kegiatan ekstrakurikuler dan kompetisi akademik.',
      type: 'formal'
    },
    {
      id: '3',
      institution: 'Google Cloud Platform',
      degree: 'Professional Cloud Architect',
      field: 'Cloud Computing',
      startDate: '2023-01',
      endDate: '2023-03',
      location: 'Online',
      achievements: [
        'Professional Level Certification',
        'Hands-on Labs Completed',
        'Case Study Projects'
      ],
      description: 'Sertifikasi profesional untuk merancang dan mengelola arsitektur cloud yang scalable, secure, dan reliable menggunakan Google Cloud Platform.',
      type: 'certification'
    },
    {
      id: '4',
      institution: 'Meta (Facebook)',
      degree: 'React Developer Professional',
      field: 'Frontend Development',
      startDate: '2022-11',
      endDate: '2023-01',
      location: 'Online',
      achievements: [
        'Advanced React Concepts',
        'State Management Mastery',
        'Performance Optimization'
      ],
      description: 'Program sertifikasi comprehensive untuk mengembangkan aplikasi React yang complex dan scalable dengan best practices industry.',
      type: 'certification'
    },
    {
      id: '5',
      institution: 'Coursera - Stanford University',
      degree: 'Machine Learning Specialization',
      field: 'Artificial Intelligence',
      startDate: '2022-08',
      endDate: '2022-10',
      location: 'Online',
      achievements: [
        'Andrew Ng Certificate',
        'Practical ML Projects',
        'Deep Learning Fundamentals'
      ],
      description: 'Kursus comprehensive tentang machine learning algorithms, neural networks, dan deep learning dengan hands-on projects.',
      type: 'course'
    },
    {
      id: '6',
      institution: 'Udemy',
      degree: 'Full Stack Web Development Bootcamp',
      field: 'Web Development',
      startDate: '2021-06',
      endDate: '2021-09',
      location: 'Online',
      achievements: [
        'Full Stack Project Portfolio',
        'MERN Stack Mastery',
        'Deployment & DevOps'
      ],
      description: 'Intensive bootcamp covering frontend and backend development with modern technologies and deployment strategies.',
      type: 'course'
    }
  ];

  const tabs = [
    { id: 'formal', label: 'Pendidikan Formal', icon: GraduationCap },
    { id: 'certification', label: 'Sertifikasi', icon: Award },
    { id: 'course', label: 'Kursus Online', icon: BookOpen }
  ];

  const filteredEducations = educations.filter(edu => edu.type === activeTab);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <section ref={sectionRef} id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 right-32 w-64 h-64 bg-primary rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-secondary rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pendidikan & Sertifikasi
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Perjalanan pembelajaran dan pengembangan diri melalui pendidikan formal dan sertifikasi profesional
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`mb-12 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 nav-3d ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="space-y-8">
            {filteredEducations.map((education, index) => (
              <div
                key={education.id}
                className={`card-float ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="card-gradient rounded-2xl p-8 border border-border">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Basic Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {education.degree}
                          </h3>
                          <p className="text-lg text-primary font-semibold mb-2">
                            {education.institution}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(education.startDate)} - {formatDate(education.endDate)}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {education.location}
                            </div>
                            {education.gpa && (
                              <div className="px-2 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">
                                GPA: {education.gpa}
                              </div>
                            )}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {education.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Achievements */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        Prestasi & Pencapaian
                      </h4>
                      <ul className="space-y-2">
                        {education.achievements.map((achievement, achievementIndex) => (
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
                  </div>

                  {/* Field Tag */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      📚 {education.field}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Stats */}
        <div className={`mt-16 ${isVisible ? 'bounce-in' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎓', number: '2', label: 'Gelar Formal' },
              { icon: '🏆', number: '8+', label: 'Sertifikasi' },
              { icon: '📚', number: '15+', label: 'Kursus Online' },
              { icon: '⭐', number: '3.85', label: 'GPA Terakhir' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center card-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-gradient rounded-xl p-6 border border-border">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;