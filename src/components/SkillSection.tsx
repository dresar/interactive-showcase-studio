import React, { useEffect, useRef, useState } from 'react';
import { Code, Palette, Server, Database, Cloud, Smartphone, Globe, Zap } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  years: number;
  projects: number;
}

const SkillSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
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

  const skills: Skill[] = [
    // Frontend
    { name: 'React.js', level: 95, category: 'frontend', icon: '⚛️', years: 4, projects: 25 },
    { name: 'TypeScript', level: 90, category: 'frontend', icon: '📘', years: 3, projects: 20 },
    { name: 'Vue.js', level: 85, category: 'frontend', icon: '💚', years: 2, projects: 15 },
    { name: 'Tailwind CSS', level: 92, category: 'frontend', icon: '🎨', years: 3, projects: 30 },
    { name: 'Next.js', level: 88, category: 'frontend', icon: '⚡', years: 2, projects: 12 },
    { name: 'Three.js', level: 75, category: 'frontend', icon: '🎮', years: 1, projects: 8 },

    // Backend
    { name: 'Node.js', level: 93, category: 'backend', icon: '🟢', years: 4, projects: 22 },
    { name: 'Python', level: 88, category: 'backend', icon: '🐍', years: 3, projects: 18 },
    { name: 'Express.js', level: 90, category: 'backend', icon: '🚀', years: 4, projects: 20 },
    { name: 'Django', level: 82, category: 'backend', icon: '🎯', years: 2, projects: 10 },
    { name: 'GraphQL', level: 78, category: 'backend', icon: '📊', years: 2, projects: 12 },
    { name: 'REST API', level: 95, category: 'backend', icon: '🔌', years: 5, projects: 35 },

    // Database
    { name: 'MongoDB', level: 90, category: 'database', icon: '🍃', years: 4, projects: 25 },
    { name: 'PostgreSQL', level: 85, category: 'database', icon: '🐘', years: 3, projects: 18 },
    { name: 'Redis', level: 80, category: 'database', icon: '🔴', years: 2, projects: 15 },
    { name: 'Firebase', level: 88, category: 'database', icon: '🔥', years: 3, projects: 20 },

    // DevOps & Cloud
    { name: 'Docker', level: 85, category: 'devops', icon: '🐳', years: 3, projects: 20 },
    { name: 'AWS', level: 80, category: 'devops', icon: '☁️', years: 2, projects: 15 },
    { name: 'Git', level: 95, category: 'devops', icon: '📝', years: 5, projects: 50 },
    { name: 'CI/CD', level: 78, category: 'devops', icon: '🔄', years: 2, projects: 12 },

    // Mobile
    { name: 'React Native', level: 82, category: 'mobile', icon: '📱', years: 2, projects: 10 },
    { name: 'Flutter', level: 75, category: 'mobile', icon: '🦋', years: 1, projects: 6 },

    // Design
    { name: 'UI/UX Design', level: 88, category: 'design', icon: '🎨', years: 4, projects: 30 },
    { name: 'Figma', level: 90, category: 'design', icon: '🎭', years: 3, projects: 25 },
    { name: 'Adobe XD', level: 78, category: 'design', icon: '🎯', years: 2, projects: 15 }
  ];

  const categories = [
    { id: 'all', label: 'Semua Skill', icon: Zap, color: 'text-purple-400' },
    { id: 'frontend', label: 'Frontend', icon: Globe, color: 'text-blue-400' },
    { id: 'backend', label: 'Backend', icon: Server, color: 'text-green-400' },
    { id: 'database', label: 'Database', icon: Database, color: 'text-orange-400' },
    { id: 'devops', label: 'DevOps', icon: Cloud, color: 'text-cyan-400' },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, color: 'text-pink-400' },
    { id: 'design', label: 'Design', icon: Palette, color: 'text-red-400' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'from-green-400 to-green-600';
    if (level >= 80) return 'from-blue-400 to-blue-600';
    if (level >= 70) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => (
    <div
      className="card-float card-gradient rounded-xl p-6 border border-border group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {skill.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {skill.years} tahun · {skill.projects} project
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-foreground">{skill.level}%</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} rounded-full transition-all duration-1000 ease-out`}
            style={{
              width: isVisible ? `${skill.level}%` : '0%',
              transitionDelay: `${index * 0.1}s`
            }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Beginner</span>
          <span>Expert</span>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="skill" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary rounded-full blur-3xl floating-animation" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Keahlian & Teknologi
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Koleksi skill dan teknologi yang telah saya kuasai dalam perjalanan karir sebagai developer
          </p>
        </div>

        {/* Category Filter */}
        <div className={`mb-12 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 nav-3d ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <category.icon className={`w-4 h-4 ${activeCategory === category.id ? '' : category.color}`} />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Overview Stats */}
        <div className={`mb-12 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💻', number: '25+', label: 'Teknologi Dikuasai', color: 'text-blue-400' },
              { icon: '🚀', number: '5+', label: 'Tahun Pengalaman', color: 'text-green-400' },
              { icon: '🎯', number: '50+', label: 'Project Diselesaikan', color: 'text-yellow-400' },
              { icon: '📈', number: '95%', label: 'Success Rate', color: 'text-purple-400' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center card-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-gradient rounded-xl p-6 border border-border">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Skill Proficiency Legend */}
        <div className={`mt-12 ${isVisible ? 'bounce-in' : 'opacity-0'}`}>
          <div className="card-gradient rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
              Tingkat Keahlian
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { range: '90-100%', label: 'Expert', color: 'from-green-400 to-green-600', description: 'Menguasai sepenuhnya' },
                { range: '80-89%', label: 'Advanced', color: 'from-blue-400 to-blue-600', description: 'Sangat menguasai' },
                { range: '70-79%', label: 'Intermediate', color: 'from-yellow-400 to-yellow-600', description: 'Menguasai dengan baik' },
                { range: '60-69%', label: 'Beginner', color: 'from-red-400 to-red-600', description: 'Sedang mempelajari' }
              ].map((level, index) => (
                <div key={level.label} className="text-center">
                  <div className={`w-full h-3 bg-gradient-to-r ${level.color} rounded-full mb-2`}></div>
                  <div className="font-medium text-foreground text-sm">{level.label}</div>
                  <div className="text-xs text-muted-foreground">{level.range}</div>
                  <div className="text-xs text-muted-foreground mt-1">{level.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Philosophy */}
        <div className={`mt-16 text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <blockquote className="text-xl font-medium text-foreground italic max-w-3xl mx-auto mb-4">
            "Technology is best when it brings people together. I believe in continuous learning and staying updated with the latest trends to deliver the best solutions."
          </blockquote>
          <cite className="text-muted-foreground">- Philosophy dalam Tech Development</cite>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;