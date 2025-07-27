import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'john.doe@email.com',
      href: 'mailto:john.doe@email.com',
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+62 812-3456-7890',
      href: 'tel:+6281234567890',
      color: 'text-green-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Jakarta, Indonesia',
      href: 'https://maps.google.com/?q=Jakarta,Indonesia',
      color: 'text-red-400'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com',
      color: 'hover:text-sky-400'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com',
      color: 'hover:text-pink-400'
    }
  ];

  return (
    <section ref={sectionRef} id="kontak" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-40 w-96 h-96 bg-primary rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-40 right-40 w-80 h-80 bg-secondary rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mari Berkolaborasi
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Siap untuk memulai project baru? Mari diskusikan ide Anda dan wujudkan solusi terbaik bersama-sama
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Hubungi Saya
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Saya selalu terbuka untuk diskusi tentang project baru, peluang kolaborasi, 
                  atau sekadar berbagi pengalaman tentang teknologi. Jangan ragu untuk menghubungi saya!
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="block card-float card-gradient rounded-xl p-6 border border-border group"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full bg-current/10 ${contact.color}`}>
                        <contact.icon className={`w-6 h-6 ${contact.color}`} />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{contact.label}</div>
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {contact.value}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Follow Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`p-4 rounded-full border border-border hover:border-primary transition-all duration-300 nav-3d group ${social.color}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      title={social.label}
                    >
                      <social.icon className="w-6 h-6 text-muted-foreground group-hover:scale-110 transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="card-gradient rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full pulse-glow"></div>
                  <span className="font-semibold text-foreground">Available for Work</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Saat ini saya terbuka untuk project freelance dan peluang kerja full-time. 
                  Response time: 24 jam.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
            <div className="card-gradient rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Kirim Pesan
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors bg-background text-foreground"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors bg-background text-foreground"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors bg-background text-foreground"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors bg-background text-foreground resize-none"
                    placeholder="Ceritakan tentang project atau ide yang ingin Anda diskusikan..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : isSubmitting
                      ? 'bg-primary/50 text-primary-foreground cursor-not-allowed'
                      : 'btn-3d text-white hover:shadow-xl'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Pesan Terkirim!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>

              {/* Form Success Message */}
              {isSubmitted && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg bounce-in">
                  <div className="flex items-center gap-3 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">
                      Terima kasih! Pesan Anda sudah diterima. Saya akan membalas dalam 24 jam.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-20 text-center ${isVisible ? 'bounce-in' : 'opacity-0'}`}>
          <div className="card-gradient rounded-2xl p-12 border border-border max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Siap Memulai Project Bersama?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dari konsep hingga deployment, saya siap membantu mewujudkan ide digital Anda menjadi kenyataan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:john.doe@email.com"
                className="btn-3d px-8 py-4 rounded-lg text-white font-semibold text-lg inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Langsung
              </a>
              <a
                href="https://calendly.com/johndoe"
                className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 nav-3d inline-flex items-center gap-2"
              >
                📅 Schedule Meeting
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`mt-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', number: '< 24h', label: 'Response Time' },
              { icon: '🎯', number: '100%', label: 'Project Success' },
              { icon: '🌟', number: '50+', label: 'Happy Clients' },
              { icon: '💬', number: '24/7', label: 'Available Support' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center card-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-gradient rounded-xl p-6 border border-border">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-xl font-bold text-primary mb-1">{stat.number}</div>
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

export default ContactSection;