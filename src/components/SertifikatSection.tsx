import React, { useEffect, useRef, useState } from 'react';
import { Award, Calendar, ExternalLink, Eye, X, CheckCircle, Star } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  description: string;
  skills: string[];
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  validUntil?: string;
  badge: string;
}

const SertifikatSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
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

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'Professional Cloud Architect',
      issuer: 'Google Cloud Platform',
      issueDate: '2023-03',
      credentialId: 'GCP-PCA-2023-001',
      verificationUrl: '#',
      description: 'Comprehensive certification covering cloud architecture design, implementation, and management on Google Cloud Platform. Includes hands-on experience with compute, storage, networking, and security services.',
      skills: ['Cloud Architecture', 'GCP Services', 'Kubernetes', 'Security', 'Networking'],
      category: 'cloud',
      level: 'expert',
      validUntil: '2026-03',
      badge: '☁️'
    },
    {
      id: '2',
      title: 'React Developer Professional Certificate',
      issuer: 'Meta (Facebook)',
      issueDate: '2023-01',
      credentialId: 'META-RDP-2023-002',
      verificationUrl: '#',
      description: 'Advanced React development course covering modern React patterns, state management, performance optimization, and testing. Includes capstone project building a full-featured web application.',
      skills: ['React.js', 'Redux', 'TypeScript', 'Testing', 'Performance'],
      category: 'frontend',
      level: 'advanced',
      validUntil: '2025-01',
      badge: '⚛️'
    },
    {
      id: '3',
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2022-11',
      credentialId: 'AWS-CSA-2022-003',
      verificationUrl: '#',
      description: 'Professional certification demonstrating expertise in designing distributed systems on AWS. Covers compute, storage, database, and networking AWS services.',
      skills: ['AWS Services', 'System Design', 'Security', 'Cost Optimization', 'High Availability'],
      category: 'cloud',
      level: 'advanced',
      validUntil: '2025-11',
      badge: '🛡️'
    },
    {
      id: '4',
      title: 'Machine Learning Specialization',
      issuer: 'Stanford University (Coursera)',
      issueDate: '2022-10',
      credentialId: 'STAN-ML-2022-004',
      verificationUrl: '#',
      description: 'Comprehensive machine learning course by Andrew Ng covering supervised learning, unsupervised learning, and deep learning fundamentals with practical implementations.',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'Neural Networks', 'Deep Learning'],
      category: 'ai',
      level: 'intermediate',
      badge: '🤖'
    },
    {
      id: '5',
      title: 'Certified Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      issueDate: '2022-09',
      credentialId: 'CNCF-CKA-2022-005',
      verificationUrl: '#',
      description: 'Hands-on certification testing skills in Kubernetes cluster administration, including installation, configuration, troubleshooting, and maintenance.',
      skills: ['Kubernetes', 'Container Orchestration', 'Docker', 'DevOps', 'Cluster Management'],
      category: 'devops',
      level: 'advanced',
      validUntil: '2025-09',
      badge: '⚙️'
    },
    {
      id: '6',
      title: 'MongoDB Developer Certification',
      issuer: 'MongoDB University',
      issueDate: '2022-08',
      credentialId: 'MONGO-DEV-2022-006',
      verificationUrl: '#',
      description: 'Professional certification covering MongoDB database design, development, and performance optimization. Includes aggregation framework and indexing strategies.',
      skills: ['MongoDB', 'Database Design', 'Aggregation', 'Performance Tuning', 'NoSQL'],
      category: 'database',
      level: 'intermediate',
      validUntil: '2025-08',
      badge: '🍃'
    },
    {
      id: '7',
      title: 'Certified Ethical Hacker',
      issuer: 'EC-Council',
      issueDate: '2022-06',
      credentialId: 'EC-CEH-2022-007',
      verificationUrl: '#',
      description: 'Comprehensive cybersecurity certification covering ethical hacking methodologies, penetration testing, and security assessment techniques.',
      skills: ['Cybersecurity', 'Penetration Testing', 'Network Security', 'Web Security', 'Risk Assessment'],
      category: 'security',
      level: 'advanced',
      validUntil: '2025-06',
      badge: '🔒'
    },
    {
      id: '8',
      title: 'Full Stack Web Development',
      issuer: 'The Odin Project',
      issueDate: '2021-12',
      credentialId: 'TOP-FSWD-2021-008',
      description: 'Comprehensive full-stack development program covering HTML, CSS, JavaScript, Node.js, databases, and deployment. Includes multiple full-featured projects.',
      skills: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Git'],
      category: 'fullstack',
      level: 'intermediate',
      badge: '💻'
    }
  ];

  const categories = [
    { id: 'all', label: 'Semua', count: certificates.length },
    { id: 'cloud', label: 'Cloud Computing', count: certificates.filter(c => c.category === 'cloud').length },
    { id: 'frontend', label: 'Frontend', count: certificates.filter(c => c.category === 'frontend').length },
    { id: 'ai', label: 'AI & ML', count: certificates.filter(c => c.category === 'ai').length },
    { id: 'devops', label: 'DevOps', count: certificates.filter(c => c.category === 'devops').length },
    { id: 'database', label: 'Database', count: certificates.filter(c => c.category === 'database').length },
    { id: 'security', label: 'Security', count: certificates.filter(c => c.category === 'security').length },
    { id: 'fullstack', label: 'Full Stack', count: certificates.filter(c => c.category === 'fullstack').length }
  ];

  const filteredCertificates = activeFilter === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === activeFilter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-blue-500';
      case 'advanced': return 'bg-purple-500';
      case 'expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Pemula';
      case 'intermediate': return 'Menengah';
      case 'advanced': return 'Lanjutan';
      case 'expert': return 'Ahli';
      default: return level;
    }
  };

  const isExpiringSoon = (validUntil?: string) => {
    if (!validUntil) return false;
    const expiryDate = new Date(validUntil);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    return expiryDate <= sixMonthsFromNow;
  };

  return (
    <section ref={sectionRef} id="sertifikat" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-32 w-80 h-80 bg-primary rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-secondary rounded-full blur-3xl floating-animation" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sertifikat & Lisensi
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Koleksi sertifikat profesional dan pencapaian dalam berbagai bidang teknologi
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 nav-3d ${
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

        {/* Certificates Stats */}
        <div className={`mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏆', number: certificates.length.toString(), label: 'Total Sertifikat', color: 'text-yellow-400' },
              { icon: '⭐', number: certificates.filter(c => c.level === 'expert' || c.level === 'advanced').length.toString(), label: 'Level Tinggi', color: 'text-purple-400' },
              { icon: '✅', number: certificates.filter(c => !c.validUntil || new Date(c.validUntil) > new Date()).length.toString(), label: 'Masih Valid', color: 'text-green-400' },
              { icon: '🌟', number: certificates.filter(c => c.credentialId).length.toString(), label: 'Terverifikasi', color: 'text-blue-400' }
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

        {/* Certificates Grid */}
        <div className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate, index) => (
              <div
                key={certificate.id}
                className="card-float card-gradient rounded-2xl overflow-hidden border border-border group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Certificate Header */}
                <div className="relative p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{certificate.badge}</div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getLevelColor(certificate.level)}`}>
                        {getLevelLabel(certificate.level)}
                      </span>
                      {certificate.validUntil && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isExpiringSoon(certificate.validUntil) 
                            ? 'bg-yellow-500/10 text-yellow-600' 
                            : 'bg-green-500/10 text-green-600'
                        }`}>
                          {isExpiringSoon(certificate.validUntil) ? 'Expiring Soon' : 'Valid'}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {certificate.title}
                  </h3>
                  
                  <p className="text-primary font-semibold mb-3">
                    {certificate.issuer}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(certificate.issueDate)}
                    {certificate.validUntil && (
                      <>
                        <span>-</span>
                        <span>{formatDate(certificate.validUntil)}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {certificate.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                          +{certificate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCertificate(certificate)}
                      className="flex-1 btn-3d py-2 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Detail
                    </button>
                    {certificate.verificationUrl && (
                      <a
                        href={certificate.verificationUrl}
                        className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 nav-3d"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continuous Learning Note */}
        <div className={`mt-16 text-center ${isVisible ? 'bounce-in' : 'opacity-0'}`}>
          <div className="card-gradient rounded-2xl p-8 border border-border max-w-3xl mx-auto">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-4">
              Komitmen Pembelajaran Berkelanjutan
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Teknologi terus berkembang, dan saya berkomitmen untuk selalu mengikuti perkembangan terbaru. 
              Setiap sertifikat yang saya peroleh adalah langkah dalam perjalanan pembelajaran yang tidak pernah berhenti.
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto bounce-in">
            {/* Modal Header */}
            <div className="relative p-6 border-b border-border bg-gradient-to-br from-primary/10 to-secondary/10">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{selectedCertificate.badge}</div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{selectedCertificate.title}</h2>
                  <p className="text-lg text-primary font-semibold mb-2">{selectedCertificate.issuer}</p>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getLevelColor(selectedCertificate.level)}`}>
                      {getLevelLabel(selectedCertificate.level)}
                    </span>
                    {selectedCertificate.credentialId && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Deskripsi Sertifikat</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {selectedCertificate.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Skills yang Dipelajari</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Detail Sertifikat</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Tanggal Terbit</div>
                      <div className="font-semibold">{formatDate(selectedCertificate.issueDate)}</div>
                    </div>
                    
                    {selectedCertificate.validUntil && (
                      <div className="p-4 bg-secondary/20 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Valid Hingga</div>
                        <div className="font-semibold">{formatDate(selectedCertificate.validUntil)}</div>
                      </div>
                    )}
                    
                    {selectedCertificate.credentialId && (
                      <div className="p-4 bg-secondary/20 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Credential ID</div>
                        <div className="font-mono text-sm">{selectedCertificate.credentialId}</div>
                      </div>
                    )}

                    {selectedCertificate.verificationUrl && (
                      <a
                        href={selectedCertificate.verificationUrl}
                        className="flex items-center gap-3 p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group w-full"
                      >
                        <ExternalLink className="w-5 h-5 text-primary" />
                        <span className="font-medium">Verifikasi Sertifikat</span>
                      </a>
                    )}
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

export default SertifikatSection;