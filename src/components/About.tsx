
import React from 'react';

const skills = [
  { category: 'Langages', items: ['HTML5', 'CSS', 'JavaScript', 'TypeScript'] },
  { category: 'Frameworks', items: ['Angular', 'React', 'Next.js'] },
  { category: 'Design', items: ['UX/UI Design', 'Interface Utilisateur', 'Responsive Design'] },
  { category: 'Outils', items: ['Adobe XD', 'Figma', 'Talend', 'Power BI'] },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24">
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
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Éducation</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">Ingénieur d'État en Génie Informatique</p>
                    <p className="text-muted-foreground">Université Privée de Fès, 2022-2024</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">Technicien en Fabrication Mécanique</p>
                    <p className="text-muted-foreground">ISTA, Route Immouzer, Fès, 2020-2022</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">Sciences Mathématiques et Informatiques</p>
                    <p className="text-muted-foreground">Faculté Dhar El Mahraz, 2016-2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-reveal">
            <div className="space-y-8">
              <h3 className="text-xl font-semibold mb-6">Compétences & Expertise</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category} className="space-y-4">
                    <h4 className="font-medium text-lg">{skillGroup.category}</h4>
                    <ul className="space-y-2">
                      {skillGroup.items.map((skill) => (
                        <li key={skill} className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3"></div>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-2xl bg-secondary">
                <h4 className="font-medium text-lg mb-4">Certifications</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span>HTML5, CSS, Tailwind, JavaScript</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span>JavaScript (Intermediate) - Certifié HackerRank</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span>SQL (Advanced) - Certifié HackerRank</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span>Java (Basic) - Certifié HackerRank</span>
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
