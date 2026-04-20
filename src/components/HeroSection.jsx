import React, { useLayoutEffect, useRef } from 'react';
import Section from './Section';
import { initScrollAnimations } from '../animations/scrollAnimations';

// Import images
import img1 from '../assets/mma1.jpeg';
import img2 from '../assets/mma2.jpeg';
import img3 from '../assets/mma5.jpeg';
import img4 from '../assets/mma4.jpeg';

const sectionsData = [
  {
    title: "MASTER THE ART",
    description: "Step into the cage and redefine your limits. Professional training in MMA, Boxing, and Jiu-Jitsu for those who refuse to settle.",
    image: img1
  },
  {
    title: "IRON SHARPENS IRON",
    description: "Join a community of warriors dedicated to the grind. Where elite coaching meets absolute discipline to forge the champions of tomorrow.",
    image: img2
  },
  {
    title: "LEGACY STARTS HERE",
    description: "Whether you're training for the octagon or peak physical dominance, Combat Club provides the battlefield for your transformation.",
    image: img3
  },
  {
    title: "LIMITLESS POWER",
    description: "Push past the plateaus. Our high-intensity strength and conditioning programs are designed to build the explosive power needed for ultimate victory.",
    image: img4
  }
];

const HeroSection = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useLayoutEffect(() => {
    const cleanup = initScrollAnimations(containerRef, sectionsRef);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="hero-container bg-dark w-full">
      {sectionsData.map((data, index) => (
        <Section
          key={index}
          ref={addToRefs}
          index={index}
          title={data.title}
          description={data.description}
          imageSrc={data.image}
        />
      ))}
    </div>
  );
};

export default HeroSection;
