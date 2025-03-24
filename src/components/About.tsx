
import React from 'react';

const skills = [
  { category: 'Design', items: ['UX/UI Design', 'Wireframing', 'Prototyping', 'User Research'] },
  { category: 'Frontend', items: ['React', 'Vue.js', 'TypeScript', 'CSS/SCSS'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'GraphQL', 'RESTful APIs'] },
  { category: 'Tools', items: ['Figma', 'Adobe XD', 'Git', 'VS Code'] },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <div className="animate-reveal">
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-4 inline-block">
                ABOUT ME
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              I blend art and technology to create meaningful digital experiences
            </h2>
            
            <p className="text-muted-foreground text-lg mb-4">
              With a background in both design and development, I approach each project with a holistic perspective, ensuring that aesthetics and functionality work together harmoniously.
            </p>
            
            <p className="text-muted-foreground text-lg mb-8">
              I believe that the best digital products arise from a deep understanding of user needs, combined with thoughtful design and precise implementation. Every pixel and interaction matters.
            </p>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Education</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">Master of Interaction Design</p>
                    <p className="text-muted-foreground">Design Institute, 2018-2020</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">BSc in Computer Science</p>
                    <p className="text-muted-foreground">Tech University, 2014-2018</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-reveal">
            <div className="space-y-8">
              <h3 className="text-xl font-semibold mb-6">Skills & Expertise</h3>
              
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
                <h4 className="font-medium text-lg mb-4">My Approach</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span><strong>Research-driven:</strong> Understanding the problem space thoroughly before designing solutions.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span><strong>User-centered:</strong> Placing the user's needs at the core of every design decision.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span><strong>Detail-oriented:</strong> Focusing on the small details that create exceptional experiences.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3"></div>
                    <span><strong>Iterative process:</strong> Continuously refining based on feedback and new insights.</span>
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
