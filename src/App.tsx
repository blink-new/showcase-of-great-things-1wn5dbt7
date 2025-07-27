import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Menu, X, Github, Linkedin, Mail, Phone, MapPin, 
  ExternalLink, Calendar, Award, Users, Code, 
  ChevronUp, Star, Briefcase, GraduationCap, MessageCircle
} from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import SkillChart from './components/SkillChart';

const AnimatedCounter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
};

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0 
      }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ChevronUp size={24} />
    </motion.button>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sample project data with skills
  const projectSkills = [
    { name: 'React', percentage: 90, color: '#61dafb' },
    { name: 'TypeScript', percentage: 85, color: '#3178c6' },
    { name: 'Node.js', percentage: 80, color: '#339933' },
    { name: 'MongoDB', percentage: 75, color: '#47a248' },
    { name: 'AWS', percentage: 70, color: '#ff9900' },
  ];

  const internshipSkills = [
    { name: 'Python', percentage: 88, color: '#3776ab' },
    { name: 'Django', percentage: 82, color: '#092e20' },
    { name: 'PostgreSQL', percentage: 78, color: '#336791' },
    { name: 'Docker', percentage: 75, color: '#2496ed' },
    { name: 'Git', percentage: 92, color: '#f05032' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'experience', 'achievements', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden transition-all duration-500">
        {/* Dynamic Gradient Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 dynamic-bg transition-all duration-1000" />
          
          {/* Animated Gradient Orbs */}
          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 gradient-orb-1 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -150, 100, 0],
              y: [0, 100, -50, 0],
              scale: [1, 0.8, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 gradient-orb-2 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 80, -80, 0],
              y: [0, -80, 80, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 gradient-orb-3 rounded-full blur-3xl"
          />
          
          {/* Additional floating orbs for more dynamic effect */}
          <motion.div
            animate={{
              x: [0, -80, 60, 0],
              y: [0, 60, -40, 0],
              scale: [1, 0.9, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-3/4 left-1/3 w-48 h-48 gradient-orb-1 rounded-full blur-2xl opacity-60"
          />
          <motion.div
            animate={{
              x: [0, 120, -90, 0],
              y: [0, -70, 50, 0],
              scale: [1, 1.3, 0.7, 1],
              rotate: [360, 270, 180, 90, 0],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/6 right-1/3 w-72 h-72 gradient-orb-2 rounded-full blur-3xl opacity-40"
          />
        </div>
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform-origin-0 z-50"
          style={{ scaleX }}
        />



        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Portfolio
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-button px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 relative rounded-lg ${
                      activeSection === item.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? 'auto' : 0,
            }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-button block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                    activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-16 md:pt-20 min-h-screen flex items-center justify-center relative overflow-hidden hero-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
              </motion.div>

              <div className="space-y-4 md:space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    John Doe
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed"
                >
                  Full Stack Developer & UI/UX Designer passionate about creating amazing digital experiences
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
                >
                  <motion.button
                    onClick={() => scrollToSection('projects')}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className="w-full sm:w-auto px-8 py-4 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 text-base md:text-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get In Touch
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                I'm a passionate developer with a love for creating beautiful, functional, and user-friendly applications.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  With over 5 years of experience in web development, I specialize in creating modern, 
                  responsive applications using cutting-edge technologies. My journey began with a 
                  curiosity about how websites work, and it has evolved into a passion for crafting 
                  digital experiences that make a difference.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I believe in writing clean, maintainable code and staying up-to-date with the latest 
                  industry trends. When I'm not coding, you can find me exploring new technologies, 
                  contributing to open-source projects, or sharing knowledge with the developer community.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { label: 'Projects Completed', value: 50, suffix: '+' },
                  { label: 'Years Experience', value: 5, suffix: '+' },
                  { label: 'Happy Clients', value: 30, suffix: '+' },
                  { label: 'Code Commits', value: 1000, suffix: '+' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      <AnimatedCounter end={stat.value} />
                      {stat.suffix}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  My Projects
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Here are some of my recent projects that showcase my skills and experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: 'E-Commerce Platform',
                  description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB.',
                  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
                  technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                  github: '#',
                  live: '#',
                },
                {
                  title: 'Task Management App',
                  description: 'A collaborative task management application with real-time updates.',
                  image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
                  technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
                  github: '#',
                  live: '#',
                },
                {
                  title: 'Weather Dashboard',
                  description: 'A beautiful weather dashboard with location-based forecasts.',
                  image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop',
                  technologies: ['React', 'OpenWeather API', 'Chart.js'],
                  github: '#',
                  live: '#',
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.a
                        href={project.github}
                        className="p-2 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={16} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        className="p-2 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Skills Chart for first project */}
                  {index === 0 && (
                    <SkillChart 
                      skills={projectSkills} 
                      title="Technologies Used & Proficiency"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                My professional journey and the experiences that shaped my career.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />

              <div className="space-y-12">
                {[
                  {
                    title: 'Senior Full Stack Developer',
                    company: 'Tech Solutions Inc.',
                    period: '2022 - Present',
                    description: 'Leading development of enterprise applications using React, Node.js, and cloud technologies.',
                    icon: <Briefcase className="w-6 h-6" />,
                    type: 'work'
                  },
                  {
                    title: 'Software Development Intern',
                    company: 'StartupXYZ',
                    period: 'Summer 2021',
                    description: 'Developed mobile applications using React Native and contributed to backend API development.',
                    icon: <GraduationCap className="w-6 h-6" />,
                    type: 'internship'
                  },
                  {
                    title: 'Frontend Developer',
                    company: 'Digital Agency',
                    period: '2020 - 2022',
                    description: 'Created responsive web applications and improved user experience for client projects.',
                    icon: <Code className="w-6 h-6" />,
                    type: 'work'
                  },
                  {
                    title: 'Web Development Intern',
                    company: 'Local Business',
                    period: 'Summer 2020',
                    description: 'Built company website and learned fundamentals of web development and database management.',
                    icon: <GraduationCap className="w-6 h-6" />,
                    type: 'internship'
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <motion.div
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <div className={`flex items-center gap-3 mb-3 ${
                          index % 2 === 0 ? 'justify-end' : 'justify-start'
                        }`}>
                          <div className={`p-2 rounded-full ${
                            item.type === 'internship' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }`}>
                            {item.icon}
                          </div>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            item.type === 'internship'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }`}>
                            {item.type === 'internship' ? 'Internship' : 'Full-time'}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                          {item.company}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 flex items-center gap-1">
                          <Calendar size={14} />
                          {item.period}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Internship Skills Chart */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <SkillChart 
                skills={internshipSkills} 
                title="Skills Gained During Internships"
              />
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Achievements
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Recognition and accomplishments throughout my journey.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: 'Best Developer Award',
                  organization: 'Tech Conference 2023',
                  description: 'Recognized for outstanding contribution to open-source projects.',
                  icon: <Award className="w-8 h-8" />,
                  color: 'from-yellow-400 to-orange-500',
                },
                {
                  title: 'Hackathon Winner',
                  organization: 'Global Hack 2022',
                  description: 'First place in the sustainability category for eco-friendly app.',
                  icon: <Star className="w-8 h-8" />,
                  color: 'from-green-400 to-blue-500',
                },
                {
                  title: 'Community Leader',
                  organization: 'Developer Community',
                  description: 'Led workshops and mentored 50+ junior developers.',
                  icon: <Users className="w-8 h-8" />,
                  color: 'from-purple-400 to-pink-500',
                },
              ].map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group perspective-1000"
                >
                  <motion.div
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform-gpu"
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      rotateX: 5,
                    }}
                  >
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${achievement.color} text-white mb-4`}>
                      {achievement.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                      {achievement.organization}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {achievement.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Extracurricular Activities */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h3 className="text-3xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Extracurricular Activities
                </span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Tech Club President',
                    period: '2021-2022',
                    description: 'Organized coding workshops and tech talks for 200+ students.',
                  },
                  {
                    title: 'Open Source Contributor',
                    period: '2020-Present',
                    description: 'Active contributor to popular React and Node.js libraries.',
                  },
                  {
                    title: 'Volunteer Coding Instructor',
                    period: '2019-2021',
                    description: 'Taught programming basics to underprivileged children.',
                  },
                  {
                    title: 'Startup Weekend Mentor',
                    period: '2022-Present',
                    description: 'Mentored teams on technical implementation and product development.',
                  },
                ].map((activity, index) => (
                  <motion.div
                    key={activity.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {activity.title}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3 text-sm">
                      {activity.period}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {activity.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Skills & Certifications
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Technologies I work with and certifications I've earned.
              </p>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
              {[
                { name: 'React', level: 95, color: '#61dafb' },
                { name: 'TypeScript', level: 90, color: '#3178c6' },
                { name: 'Node.js', level: 85, color: '#339933' },
                { name: 'Python', level: 80, color: '#3776ab' },
                { name: 'AWS', level: 75, color: '#ff9900' },
                { name: 'Docker', level: 70, color: '#2496ed' },
                { name: 'GraphQL', level: 85, color: '#e10098' },
                { name: 'MongoDB', level: 80, color: '#47a248' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.div
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 10,
                      rotateX: 5,
                    }}
                  >
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: skill.color }}
                      >
                        {skill.name.charAt(0)}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
                        {skill.name}
                      </h3>
                      <div className="relative">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="h-2 rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 block">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Certifications
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    title: 'AWS Certified Developer',
                    issuer: 'Amazon Web Services',
                    date: '2023',
                    badge: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop',
                  },
                  {
                    title: 'React Developer Certification',
                    issuer: 'Meta',
                    date: '2022',
                    badge: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop',
                  },
                  {
                    title: 'Google Cloud Professional',
                    issuer: 'Google Cloud',
                    date: '2023',
                    badge: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
                  },
                ].map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 text-center"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <img
                      src={cert.badge}
                      alt={cert.title}
                      className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
                    />
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {cert.title}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {cert.date}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Get In Touch
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Let's discuss your next project or just say hello!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 md:space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'john.doe@example.com' },
                      { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+1 (555) 123-4567' },
                      { icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp', value: '+1 (555) 123-4567', href: 'https://wa.me/15551234567' },
                      { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: 'San Francisco, CA' },
                    ].map((contact, index) => (
                      <motion.div
                        key={contact.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50 ${
                          contact.href ? 'cursor-pointer hover:shadow-md transition-all duration-300' : ''
                        }`}
                        onClick={() => contact.href && window.open(contact.href, '_blank')}
                        whileHover={contact.href ? { scale: 1.02, y: -2 } : {}}
                      >
                        <div className={`p-2 rounded-full ${
                          contact.label === 'WhatsApp' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        }`}>
                          {contact.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{contact.label}</p>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{contact.value}</p>
                          {contact.href && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Click to chat</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    Follow Me
                  </h3>
                  <div className="flex gap-4">
                    {[
                      { icon: <Github className="w-5 h-5" />, href: '#', color: 'hover:text-gray-800' },
                      { icon: <Linkedin className="w-5 h-5" />, href: '#', color: 'hover:text-blue-600' },
                      { icon: <MessageCircle className="w-5 h-5" />, href: 'https://wa.me/15551234567', color: 'hover:text-green-600' },
                      { icon: <Mail className="w-5 h-5" />, href: '#', color: 'hover:text-red-600' },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className={`p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <form className="space-y-6 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                      placeholder="Project Discussion"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  John Doe
                </h3>
                <p className="text-gray-400 mb-6">
                  Full Stack Developer & UI/UX Designer
                </p>
                <div className="flex justify-center gap-6 mb-8">
                  {[
                    { icon: <Github className="w-5 h-5" />, href: '#' },
                    { icon: <Linkedin className="w-5 h-5" />, href: '#' },
                    { icon: <MessageCircle className="w-5 h-5" />, href: 'https://wa.me/15551234567' },
                    { icon: <Mail className="w-5 h-5" />, href: '#' },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  © 2024 John Doe. All rights reserved.
                </p>
              </motion.div>
            </div>
          </div>
        </footer>

        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
};

export default App;