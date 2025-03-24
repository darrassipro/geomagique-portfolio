
import React from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Développement d'un Chatbot Multi-Agent avec IHM",
    company: "3D Smart Factory",
    location: "Mohammedia",
    period: "Février 2024 - Juin 2024",
    description: [
      "Conception de l'interface utilisateur pour améliorer l'interaction avec les utilisateurs."
    ]
  },
  {
    title: "Application Web de Segmentation des Arcades 3D",
    company: "3D Smart Factory",
    location: "Mohammedia",
    period: "Juillet 2023 - Septembre 2023",
    description: [
      "Création d'une interface intuitive pour la visualisation des données 3D."
    ]
  },
  {
    title: "Application Web de Gestion de Parapharmacie",
    company: "FSDM",
    location: "Fès",
    period: "2020",
    description: [
      "Design et développement d'une interface utilisateur efficace pour la gestion des stocks."
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-secondary clip-path-diagonal">
      <div className="container px-4 md:px-6 pt-8">
        <div className="animate-reveal text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-4 inline-block">
              EXPÉRIENCE
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Mon parcours professionnel
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez mes expériences professionnelles dans le domaine du design et du développement web.
          </p>
        </div>

        <div className="space-y-12 max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="animate-reveal bg-background rounded-2xl p-8 shadow-sm neo-glass"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <p className="text-primary/80 mt-1">
                    {exp.company} • {exp.location}
                  </p>
                </div>
                <div className="text-muted-foreground mt-2 md:mt-0 md:text-right">
                  <span className="whitespace-nowrap">{exp.period}</span>
                </div>
              </div>
              
              <ul className="space-y-2 mt-4">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
