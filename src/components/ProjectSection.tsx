import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Eye, X, Calendar, Tag } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  date: string;
  status: 'completed' | 'in-progress' | 'maintenance';
}

const ProjectSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Dashboard',
      description: 'Modern dashboard untuk mengelola toko online dengan analytics real-time',
      fullDescription: 'Dashboard e-commerce yang komprehensif dengan fitur analytics real-time, manajemen produk, tracking pesanan, dan sistem notifikasi. Menggunakan React.js untuk frontend yang responsif dan Node.js untuk backend yang scalable. Dilengkapi dengan sistem pembayaran terintegrasi dan reporting yang detail.',
      image: '🛒',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
      date: '2024-01',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Mobile Banking App',
      description: 'Aplikasi mobile banking dengan keamanan tinggi dan UX yang intuitif',
      fullDescription: 'Aplikasi mobile banking yang aman dan user-friendly dengan fitur transfer, pembayaran tagihan, dan investment tracking. Menggunakan React Native untuk cross-platform development dan implementasi biometric authentication untuk keamanan maksimal.',
      image: '🏦',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'Biometric Auth'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'mobile',
      date: '2023-12',
      status: 'completed'
    },
    {
      id: '3',
      title: 'AI Chat Assistant',
      description: 'Chatbot AI untuk customer service dengan natural language processing',
      fullDescription: 'Sistem chatbot AI yang dapat memahami dan merespons pertanyaan customer dalam bahasa alami. Terintegrasi dengan OpenAI API dan memiliki kemampuan learning dari interaction sebelumnya. Dilengkapi dengan dashboard admin untuk monitoring dan analytics.',
      image: '🤖',
      technologies: ['Python', 'OpenAI', 'Flask', 'PostgreSQL', 'Docker'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'ai',
      date: '2024-02',
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Portfolio Website',
      description: 'Website portfolio dengan animasi 3D dan interactive elements',
      fullDescription: 'Website portfolio modern dengan animasi 3D yang smooth, interactive elements, dan responsive design. Menggunakan Three.js untuk 3D graphics dan Framer Motion untuk animasi yang engaging. Optimized untuk performance dan SEO.',
      image: '🎨',
      technologies: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
      date: '2024-03',
      status: 'completed'
    },
    {
      id: '5',
      title: 'Task Management System',
      description: 'Sistem manajemen tugas untuk tim dengan kolaborasi real-time',
      fullDescription: 'Platform manajemen tugas yang memungkinkan tim untuk berkolaborasi secara real-time. Fitur include kanban board, time tracking, file sharing, dan video call integration. Built dengan mikroservice architecture untuk scalability.',
      image: '📋',
      technologies: ['Vue.js', 'Express.js', 'Socket.io', 'Redis', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
      date: '2023-11',
      status: 'maintenance'
    },
    {
      id: '6',
      title: 'IoT Smart Home',
      description: 'Aplikasi kontrol smart home dengan IoT integration',
      fullDescription: 'Aplikasi untuk mengontrol perangkat smart home menggunakan IoT. Dapat mengontrol lampu, AC, keamanan, dan monitoring energy consumption. Real-time updates dan automated scheduling untuk efficiency maksimal.',
      image: '🏠',
      technologies: ['Flutter', 'IoT', 'Firebase', 'Arduino', 'MQTT'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'iot',
      date: '2024-01',
      status: 'completed'
    }
  ];

  const categories = [
    { id: 'all', label: 'Semua Project', count: projects.length },
    { id: 'web', label: 'Web Development', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Mobile App', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'ai', label: 'AI & ML', count: projects.filter(p => p.category === 'ai').length },
    { id: 'iot', label: 'IoT', count: projects.filter(p => p.category === 'iot').length }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'maintenance': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'in-progress': return 'Dalam Proses';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  return (
    <section ref={sectionRef} id="project" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-40 w-80 h-80 bg-primary rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-secondary rounded-full blur-3xl floating-animation" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Project Portfolio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Koleksi project yang telah saya kerjakan dengan berbagai teknologi modern
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 nav-3d ${
                  activeFilter === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category.label}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`grid md:grid-cols-2 xl:grid-cols-3 gap-8 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="card-float card-gradient rounded-2xl overflow-hidden border border-border group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
                {project.image}
                
                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Eye className="w-6 h-6 text-white" />
                  </button>
                  <a
                    href={project.liveUrl}
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.date).toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full btn-3d py-3 rounded-lg text-white font-medium"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto bounce-in">
            {/* Modal Header */}
            <div className="relative p-6 border-b border-border">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{selectedProject.image}</div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedProject.title}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedProject.date).toLocaleDateString('id-ID', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                    <div className={`ml-2 px-2 py-1 rounded-full text-white text-xs ${getStatusColor(selectedProject.status)}`}>
                      {getStatusLabel(selectedProject.status)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Deskripsi Project</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {selectedProject.fullDescription}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Teknologi yang Digunakan
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Project Links</h3>
                  <div className="space-y-3">
                    <a
                      href={selectedProject.liveUrl}
                      className="flex items-center gap-3 p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group"
                    >
                      <ExternalLink className="w-5 h-5 text-primary" />
                      <span className="font-medium">Live Demo</span>
                    </a>
                    
                    <a
                      href={selectedProject.githubUrl}
                      className="flex items-center gap-3 p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors group"
                    >
                      <Github className="w-5 h-5" />
                      <span className="font-medium">Source Code</span>
                    </a>
                  </div>

                  {/* Project Features */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Fitur Utama</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Responsive Design
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Real-time Updates
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Modern UI/UX
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Performance Optimized
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectSection;