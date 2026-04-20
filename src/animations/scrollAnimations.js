import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = (containerRef, sectionsRef) => {
  const sections = sectionsRef.current;

  if (!sections || sections.length === 0) return;

  // Use gsap.context for easy and bulletproof cleanup in React
  const ctx = gsap.context(() => {

    sections.forEach((section, index) => {
      // 1. Image Parallax Optimization
      // Keeping movement subtle (-10 to 10 yPercent) instead of large margins
      // using translate3d under the hood by GSAP
      const image = section.querySelector('.parallax-img');
      if (image) {
        // Set initial state for performance
        gsap.set(image, { willChange: 'transform', scale: 1.05 });

        gsap.fromTo(image,
          {
            yPercent: -10, // Start slightly up
          },
          {
            yPercent: 10,  // Move slightly down
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom', // Start when section top enters bottom of viewport
              end: 'bottom top',   // End when section bottom leaves top of viewport
              scrub: 0.5,          // Optimized scrub value for smoothness (not true)
            }
          }
        );
      }

      // 2. Text Reveal Animations
      const title = section.querySelector('.text-title');
      const desc = section.querySelector('.text-desc');
      const btn = section.querySelector('.text-btn');

      const textElements = [title, desc, btn].filter(Boolean);

      if (textElements.length > 0) {
        gsap.set(textElements, { autoAlpha: 0, y: 40, willChange: 'transform, opacity' });

        // For the very first section, animate in immediately without scroll requirement
        if (index === 0) {
          gsap.to(textElements, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2
          });
        } else {
          // Standard scroll trigger for other sections
          ScrollTrigger.create({
            trigger: section,
            start: 'top 75%', // Trigger slightly earlier for better UX
            onEnter: () => {
              gsap.to(textElements, {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power3.out'
              });
            },
            // Note: intentionally not reversing on leave to prevent distracting re-animations
            // but can be added if needed via onLeaveBack or toggleActions
          });
        }
      }

      // 3. Section overlapping transition (Underlap feel)
      if (index < sections.length - 1) {
        const nextSection = sections[index + 1];

        gsap.to(section, {
          scale: 0.95, // Subtler scale down
          filter: 'brightness(0.4)', // Less aggressive darkening
          ease: 'power2.in', // Exponential curve: delays the effect until the very end
          scrollTrigger: {
            trigger: nextSection,
            start: 'top 80%', // Wait until the next section is 20% up the screen before starting
            end: 'top top',
            scrub: true
          }
        });
      }

    });

    // Refresh ScrollTrigger to calculate proper heights after dynamic loads
    ScrollTrigger.refresh();

  }, containerRef); // Scope context to container

  // Return cleanup function for React's useLayoutEffect
  return () => {
    ctx.revert(); // Automatically kills all ScrollTriggers and animations in context
  };
};
