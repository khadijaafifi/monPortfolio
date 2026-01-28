import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Code, Sparkles, Rocket, Mail, Github, Linkedin, ExternalLink, Terminal, Briefcase, Award } from 'lucide-react';
import './index.css';
// Configuration API
const API_URL = 'http://localhost:8000/api';

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Récupération des données depuis Laravel API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, skillsRes] = await Promise.all([
          axios.get(`${API_URL}/profile`),
          axios.get(`${API_URL}/projects`),
          axios.get(`${API_URL}/skills`)
        ]);
        
        setProfile(profileRes.data);
        setProjects(projectsRes.data);
        setSkills(skillsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Fonction pour envoyer un message de contact
  const handleContact = async (formData) => {
    try {
      await axios.post(`${API_URL}/contact`, formData);
      alert('Message envoyé avec succès!');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi du message');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-2xl animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Cursor personnalisé */}
      <div 
        className="fixed w-6 h-6 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        </div>

        <div className="relative z-10 text-center px-6" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          {/* Photo de profil */}
          <div className="relative inline-block mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-75 group-hover:opacity-100 animate-pulse" />
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-cyan-400 overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
              <img 
                src={profile?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"} 
                alt={profile?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping" style={{ animationDuration: '3s' }} />
          </div>

          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm">{profile?.title || 'Développeur Full-Stack'}</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            {profile?.name || 'AFIFI Khadija'}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {profile?.bio || 'Je transforme des idées en expériences digitales exceptionnelles'}
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
              Voir mes projets
              <Rocket className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition-all duration-300">
              Me contacter
            </button>
          </div>

          <div className="flex gap-6 justify-center">
            {[
              { Icon: Github, url: profile?.github },
              { Icon: Linkedin, url: profile?.linkedin },
              { Icon: Mail, url: `mailto:${profile?.email}` }
            ].map(({ Icon, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-gray-700 rounded-full flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 cursor-pointer group">
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section Compétences */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Code className="w-8 h-8 text-cyan-400" />
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Compétences
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-300 group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-3xl p-8">
              <Sparkles className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Philosophie</h3>
              <p className="text-gray-400 leading-relaxed">
                {profile?.philosophy || 'Je crois en la puissance du code propre et des solutions innovantes.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Projets */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="w-8 h-8 text-purple-400" />
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projets Récents
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div 
                key={project.id}
                className="group relative bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-xl mb-6 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.map((tech, j) => (
                      <span key={j} className="px-3 py-1 bg-gray-800 text-xs rounded-full border border-gray-700 group-hover:border-purple-500/50 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-400 group-hover:gap-4 transition-all">
                    <span className="text-sm font-semibold">Voir le projet</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6 text-center text-gray-500">
        <p>© 2025 {profile?.name} - Développeur Web Full-Stack</p>
      </footer>
    </div>
  );
}

export default App;