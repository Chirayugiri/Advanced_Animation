import React, { forwardRef } from 'react';

const Section = forwardRef(({ title, description, imageSrc, index }, ref) => {
  return (
    <section 
      ref={ref} 
      className="section-pin relative h-screen w-full bg-dark overflow-hidden"
    >
      {/* Full-Screen Background Image with Parallax */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <img 
          src={imageSrc} 
          alt={title}
          className="parallax-img w-full h-[120%] object-cover object-center scale-110"
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
        {/* Content */}
        <div className="flex flex-col items-start space-y-6 max-w-4xl">
          <h1 className="text-title text-6xl md:text-8xl lg:text-9xl font-black text-accent leading-[0.9] tracking-tighter drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-desc text-white/80 text-lg md:text-2xl max-w-xl font-light leading-relaxed drop-shadow-lg">
            {description}
          </p>
          <button className="text-btn group relative px-10 py-4 bg-transparent border-2 border-accent text-accent overflow-hidden transition-all hover:text-dark mt-4">
            <span className="relative z-10 font-bold uppercase tracking-widest text-lg">[ JOIN THE GRIND ]</span>
            <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
          </button>
        </div>
      </div>

      {/* Decorative Index */}
      <div className="absolute bottom-10 left-10 text-white/10 text-9xl font-black select-none pointer-events-none z-10">
        0{index + 1}
      </div>
    </section>
  );
});

export default Section;
