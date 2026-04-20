import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = (containerRef, sectionsRef) => {
  const sections = sectionsRef.current;
  
  if (!sections || sections.length === 0) return;

  sections.forEach((section, index) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=100%',
        scrub: 1.5, // Smooth feel
        pin: true,
        pinSpacing: false, // For overlapping effect
        // markers: true // for debugging
      }
    });

    // 1. Current section scale down effect (overlapping feel)
    if (index < sections.length - 1) {
      timeline.to(section, {
        scale: 0.95,
        opacity: 0.5,
        ease: 'none',
      }, 0);
    }

    // 2. Parallax and Zoom on image
    const image = section.querySelector('.parallax-img');
    if (image) {
      gsap.fromTo(image, 
        { 
          y: '20%',
          scale: 1.1,
        },
        {
          y: '-20%',
          scale: 1.2,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Blur to sharp effect
      gsap.fromTo(image,
        { filter: 'blur(10px) brightness(0.5)' },
        { 
          filter: 'blur(0px) brightness(1)',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          }
        }
      );
    }

    // 3. Text Stagger Animations
    const title = section.querySelector('.text-title');
    const desc = section.querySelector('.text-desc');
    const btn = section.querySelector('.text-btn');

    // For the first section, we want it visible immediately or with a quick entrance
    if (index === 0) {
      gsap.fromTo([title, desc, btn], 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15, 
          duration: 1.2, 
          ease: 'power4.out',
          delay: 0.5 // Small delay for the initial wow factor
        }
      );
    } else {
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%', // Trigger earlier
          toggleActions: 'play none none reverse', // Don't fade out mid-section
        }
      });

      textTimeline.fromTo([title, desc, btn], 
        { 
          opacity: 0, 
          y: 60 
        },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          duration: 1, 
          ease: 'power4.out' 
        }
      );
    }
  });

  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
};
