
import React, { useEffect, useRef, useState } from 'react';
import { Github, ArrowUpRight, Lock, Layers, Globe, Smartphone, Shield, Activity, X, Server, Cpu, Network, FileCode, Database, Key, Code2 } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { triggerHaptic } from '../utils/haptics';

// 3D Tilt Card Component
const ProjectCard: React.FC<{ 
    project: Project; 
    index: number; 
    onClick: (e: React.MouseEvent, p: Project) => void; 
    getStatusColor: (s: string) => string;
}> = ({ project, index, onClick, getStatusColor }) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      
      const rx = ((y - cy) / cy) * -5; // Tilt X
      const ry = ((x - cx) / cx) * 5;  // Tilt Y
      
      setRotate({ x: rx, y: ry });
      setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, o: 1 });
    };
    
    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
      setGlare(prev => ({ ...prev, o: 0 }));
    };

    return (
        <div 
            className="group relative transition-all duration-700 animate-fade-in-up perspective-1000"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* MOCKUP CONTAINER WITH TILT */}
            <div 
                className="relative h-80 w-full bg-zinc-900/30 border border-zinc-800 rounded-lg overflow-hidden mb-6 group-hover:border-emerald-500/30 transition-all duration-100 ease-out shadow-xl cursor-crosshair transform-gpu"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => onClick(e, project)}
                style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
                }}
            >
                {/* Glare Effect */}
                <div 
                    className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15), transparent 60%)`,
                        opacity: glare.o
                    }}
                />
                
                {/* Fundo Personalizado Padrão (Grid + Glow) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none"></div>

                {/* Scanline Effect Container */}
                <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-[20%] bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent absolute -top-full group-hover:top-full transition-all duration-[1.5s] ease-linear"></div>
                </div>

                {/* Project Status Badge */}
                <div className="absolute top-4 right-4 z-50">
                    <div className={`px-3 py-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest rounded-sm border backdrop-blur-md shadow-lg ${getStatusColor(project.status)}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'DEPLOYED' ? 'bg-emerald-400 animate-pulse' : project.status === 'AUDITED' ? 'bg-blue-400' : 'bg-yellow-400'}`}></div>
                        {project.status}
                    </div>
                </div>

                {/* MOBILE MOCKUP */}
                <div className="absolute top-8 left-6 w-[25%] h-[65%] bg-zinc-950 rounded-[1.5rem] border-[4px] border-zinc-800 shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 transform -rotate-6 group-hover:-rotate-3 group-hover:scale-105 transition-all duration-700 ease-out flex flex-col">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[30%] h-4 bg-black rounded-full z-30 flex items-center justify-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                    </div>
                    <div className="w-full h-full rounded-[1.2rem] overflow-hidden bg-zinc-950 relative flex flex-col items-center justify-center p-2">
                        <div className="text-center">
                            <div className="font-mono font-bold text-emerald-500 text-[10px] leading-tight mb-1 animate-pulse">
                                Developer<br/>PDR
                            </div>
                            <div className="w-4 h-0.5 bg-zinc-800 mx-auto mb-1"></div>
                            <div className="font-mono text-zinc-600 text-[6px] uppercase tracking-widest">
                                Desenvolvendo
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                </div>

                {/* LAPTOP MOCKUP */}
                <div className="absolute top-12 right-[-10%] w-[85%] h-[90%] bg-zinc-950 rounded-t-xl border-t-[1px] border-l-[1px] border-zinc-700 shadow-2xl z-10 transform rotate-1 group-hover:rotate-0 group-hover:translate-x-[-5%] transition-all duration-700 ease-out origin-bottom-right">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-zinc-600 rounded-full z-20"></div>
                    <div className="absolute inset-1 bg-zinc-900 rounded-t-lg overflow-hidden flex items-center justify-center bg-[#050505]">
                         <div className="text-center relative z-10">
                            <Code2 className="w-8 h-8 text-zinc-800 mx-auto mb-3" />
                            <h3 className="font-mono font-bold text-emerald-500 text-xl tracking-tighter mb-2 animate-pulse">
                                Developer PDR
                            </h3>
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-pulse"></span>
                                <span className="font-mono text-zinc-500 text-xs uppercase tracking-[0.2em]">
                                    Desenvolvendo
                                </span>
                            </div>
                         </div>
                        <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    <div className="absolute -bottom-3 left-0 right-0 h-3 bg-zinc-800 rounded-b-md border-t border-zinc-950"></div>
                </div>
            </div>
            
            {/* Details */}
            <div className="flex justify-between items-start px-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        ID: PRJ_0{project.id}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600/50 uppercase tracking-wider">
                        // {project.category}
                      </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm max-w-md mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags && project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 text-[10px] font-mono uppercase hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-[0_0_8px_rgba(16,185,129,0.1)] transition-all cursor-default flex items-center gap-1">
                            <span className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-emerald-500"></span>
                            {tag}
                        </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button onClick={(e) => onClick(e, project)} className="p-2 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 rounded bg-zinc-950 transition-all group/btn" title="View Code">
                    <Github className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => onClick(e, project)} className="p-2 text-black hover:bg-emerald-400 bg-emerald-500 rounded transition-all font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)] group/btn" title="Live Demo">
                    <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
            </div>
        </div>
    );
};

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'WEB' | 'MOBILE' | 'SECURITY'>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredProjects = activeCategory === 'ALL' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DEPLOYED': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'AUDITED': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'PROTOTYPE': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  const handleProjectClick = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    triggerHaptic();
    setSelectedProject(project);
  };

  const closeProject = () => {
    triggerHaptic();
    setSelectedProject(null);
  };

  const categories = [
    { id: 'ALL', label: 'ALL_SYSTEMS', icon: <Layers size={14} /> },
    { id: 'WEB', label: 'WEB_DEV', icon: <Globe size={14} /> },
    { id: 'SECURITY', label: 'SEC_OPS', icon: <Shield size={14} /> },
    { id: 'MOBILE', label: 'MOBILE_APPS', icon: <Smartphone size={14} /> },
  ];

  const getProjectDetails = (project: Project) => {
    const architecture = project.category === 'MOBILE' ? 'Clean Architecture (MVVM)' : 
                         project.category === 'SECURITY' ? 'Event-Driven Pipeline' : 'Microservices (Dockerized)';
    
    const securityProto = project.category === 'SECURITY' ? 'Real-time Packet Inspection' :
                          project.category === 'WEB' ? 'WAF + Rate Limiting' : 'Biometric Auth + AES-256';
    
    const dbType = project.tags?.includes('Firebase') ? 'NoSQL (Real-time)' : 'PostgreSQL (Acid Compliant)';

    return { architecture, securityProto, dbType };
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-black relative border-t border-zinc-900 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-900 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-900 pb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span className="font-mono text-emerald-500 text-sm uppercase tracking-wider">Project_Database_V1</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Arquivos de Projetos</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-mono border rounded-sm transition-all ${
                    activeCategory === cat.id 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[400px]">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onClick={handleProjectClick} 
                getStatusColor={getStatusColor} 
            />
          ))}
        </div>
      </div>

       {/* TECHNICAL BLUEPRINT / DOSSIER MODAL */}
       {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-fade-in">
           <div className="bg-zinc-950 border border-zinc-800 w-full max-w-4xl h-[85vh] shadow-[0_0_50px_rgba(16,185,129,0.1)] relative rounded-sm flex flex-col animate-fade-in-up overflow-hidden">
             
             <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-4">
                   <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded">
                      <FileCode className="text-emerald-500 w-6 h-6" />
                   </div>
                   <div>
                      <h2 className="text-xl font-bold font-mono text-white tracking-tight">{selectedProject.title}</h2>
                      <div className="flex gap-3 text-[10px] font-mono text-zinc-500 uppercase">
                        <span>ID: PRJ_0{selectedProject.id}</span>
                        <span className="text-zinc-700">|</span>
                        <span>CLASSIFICATION: <span className="text-emerald-500">RESTRICTED</span></span>
                      </div>
                   </div>
                </div>
                <button onClick={closeProject} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors">
                  <X size={24} />
                </button>
             </div>

             <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
                <div className="p-6 lg:col-span-2 space-y-8">
                    <div className={`px-4 py-3 border rounded-sm flex items-center justify-between ${
                        selectedProject.status === 'DEPLOYED' ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-zinc-900 border-zinc-800'
                    }`}>
                         <span className="text-xs font-mono text-zinc-400 uppercase">Current Status</span>
                         <span className={`text-sm font-bold font-mono flex items-center gap-2 ${
                             selectedProject.status === 'DEPLOYED' ? 'text-emerald-400' : 'text-blue-400'
                         }`}>
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                            </span>
                            {selectedProject.status}
                         </span>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-white font-mono uppercase mb-4 flex items-center gap-2">
                           <Layers size={16} className="text-emerald-500" /> System Overview
                        </h3>
                        <p className="text-zinc-400 leading-relaxed text-sm">
                            {selectedProject.description}
                            <br/><br/>
                            Este projeto está sendo construído utilizando as melhores práticas de engenharia de software e segurança.
                            A arquitetura visa escalabilidade horizontal e resiliência contra falhas.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-white font-mono uppercase mb-4 flex items-center gap-2">
                           <Cpu size={16} className="text-emerald-500" /> Technology Stack
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {selectedProject.tags && selectedProject.tags.map((tag, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 bg-zinc-900/50 border border-zinc-800 rounded hover:border-emerald-500/30 transition-colors">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                    <span className="text-xs font-mono text-zinc-300">{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden border border-zinc-800 opacity-80 hover:opacity-100 transition-opacity bg-black h-48 flex flex-col items-center justify-center relative">
                         <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%]"></div>
                         <h3 className="font-mono font-bold text-emerald-500 text-2xl tracking-tighter mb-2 animate-pulse">
                            Developer PDR
                         </h3>
                         <span className="font-mono text-zinc-600 text-sm uppercase tracking-widest">
                            Em desenvolvimento
                         </span>
                    </div>
                </div>

                <div className="p-6 bg-zinc-900/20 space-y-8">
                    <div>
                        <h3 className="text-xs font-bold text-zinc-500 font-mono uppercase mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
                           <Server size={14} /> Architecture
                        </h3>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-zinc-500 uppercase">Pattern</span>
                                <span className="text-sm text-white font-mono">{getProjectDetails(selectedProject).architecture}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-zinc-500 uppercase">Database</span>
                                <div className="flex items-center gap-2">
                                    <Database size={12} className="text-blue-500" />
                                    <span className="text-sm text-white font-mono">{getProjectDetails(selectedProject).dbType}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-zinc-500 font-mono uppercase mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
                           <Shield size={14} /> Security Protocols
                        </h3>
                        <div className="space-y-3">
                             <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                                <Lock size={12} className="text-emerald-500" />
                                {getProjectDetails(selectedProject).securityProto}
                             </div>
                             <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                                <Key size={12} className="text-emerald-500" />
                                Hardened API Endpoints
                             </div>
                             <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                                <Network size={12} className="text-emerald-500" />
                                DDOS Mitigation Layer
                             </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-8">
                        <button className="w-full py-3 bg-zinc-900 hover:bg-emerald-600 text-zinc-400 hover:text-white border border-zinc-800 hover:border-emerald-500 transition-all font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm mb-3">
                            <Github size={14} /> View Source Code
                        </button>
                        <button className="w-full py-3 bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm opacity-50">
                            <Lock size={14} /> Live Demo (Offline)
                        </button>
                        <p className="text-[10px] text-center text-zinc-600 mt-2 font-mono">
                            * Acesso direto restrito por motivos de segurança.
                        </p>
                    </div>
                </div>
             </div>

             <div className="h-2 w-full bg-zinc-900 border-t border-zinc-800 flex">
                <div className="w-1/3 bg-emerald-900/20 h-full"></div>
                <div className="w-1/3 bg-transparent h-full"></div>
                <div className="w-1/3 bg-emerald-500 h-full animate-pulse"></div>
             </div>
           </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
