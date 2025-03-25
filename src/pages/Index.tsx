
import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import Experience from '../components/Experience';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Contact />
    </Layout>
  );
};

export default Index;
