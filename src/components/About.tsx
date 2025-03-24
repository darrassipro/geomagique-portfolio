
import React from 'react';
import { Hexagon, Code, Layout, Database, Cpu } from 'lucide-react';

const skills = [
  { category: 'Langages', items: ['HTML5', 'CSS', 'JavaScript', 'TypeScript'] },
  { category: 'Frameworks', items: ['Angular', 'React', 'Next.js'] },
  { category: 'Design', items: ['UX/UI Design', 'Interface Utilisateur', 'Responsive Design'] },
  { category: 'Outils', items: ['Adobe XD', 'Figma', 'Talend', 'Power BI'] },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <div className="animate-reveal">
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-4 inline-block">
                À PROPOS DE MOI
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Je crée des expériences numériques intuitives et attrayantes
            </h2>
            
            <p className="text-muted-foreground text-lg mb-4">
              Passionné par le design web et les nouvelles technologies, je recherche un poste qui me permettra de mettre en pratique mes compétences en design tout en continuant à apprendre.
            </p>
            
            <p className="text-muted-foreground text-lg mb-8">
              Mon approche combine esthétique et fonctionnalité pour créer des interfaces utilisateur qui répondent aux besoins des utilisateurs tout en étant visuellement attrayantes.
            </p>
            
            <div className="space-y-8">
              <h3 className="text-xl font-semibold flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 mr-3">
                  <Code className="h-4 w-4 text-primary" />
                </div>
                Éducation
              </h3>
              <div className="space-y-6 ml-4 border-l border-border/60 pl-8">
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full border-2 border-border bg-background flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="neo-card bg-background/30 backdrop-blur-sm border border-border/40 rounded-xl p-5">
                    <p className="font-medium text-lg">Ingénieur d'État en Génie Informatique</p>
                    <p className="text-muted-foreground">Université Privée de Fès, 2022-2024</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full border-2 border-border bg-background flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="neo-card bg-background/30 backdrop-blur-sm border border-border/40 rounded-xl p-5">
                    <p className="font-medium text-lg">Technicien en Fabrication Mécanique</p>
                    <p className="text-muted-foreground">ISTA, Route Immouzer, Fès, 2020-2022</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full border-2 border-border bg-background flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="neo-card bg-background/30 backdrop-blur-sm border border-border/40 rounded-xl p-5">
                    <p className="font-medium text-lg">Sciences Mathématiques et Informatiques</p>
                    <p className="text-muted-foreground">Faculté Dhar El Mahraz, 2016-2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-reveal">
            <div className="space-y-8">
              <h3 className="text-xl font-semibold flex items-center mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 mr-3">
                  <Hexagon className="h-4 w-4 text-primary" />
                </div>
                Compétences & Expertise
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {skills.map((skillGroup, idx) => (
                  <div key={skillGroup.category} className="relative">
                    <div className="absolute -top-3 left-4 px-2 bg-background z-10">
                      <h4 className="font-medium text-lg flex items-center">
                        {idx === 0 && <Layout className="h-4 w-4 mr-2 text-primary" />}
                        {idx === 1 && <Code className="h-4 w-4 mr-2 text-primary" />}
                        {idx === 2 && <Cpu className="h-4 w-4 mr-2 text-primary" />}
                        {idx === 3 && <Database className="h-4 w-4 mr-2 text-primary" />}
                        {skillGroup.category}
                      </h4>
                    </div>
                    <div className="border border-border/60 rounded-xl p-5 pt-6">
                      <ul className="space-y-3 mt-2">
                        {skillGroup.items.map((skill) => (
                          <li key={skill} className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3"></div>
                            <span className="text-muted-foreground">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 backdrop-blur-sm border border-white/5">
                <h4 className="font-medium text-lg mb-4 flex items-center">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary/10 mr-2">
                    <Cpu className="h-3 w-3 text-primary" />
                  </div>
                  Certifications
                </h4>
                <ul className="space-y-3 ml-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span className="text-muted-foreground">HTML5, CSS, Tailwind, JavaScript</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span className="text-muted-foreground">JavaScript (Intermediate) - Certifié HackerRank</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span className="text-muted-foreground">SQL (Advanced) - Certifié HackerRank</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span className="text-muted-foreground">Java (Basic) - Certifié HackerRank</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
