// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Loading Overlay fade out
    const loader = document.querySelector('.loader-overlay');
    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.inOut",
        onComplete: () => loader.style.display = 'none'
    });

    // 2. Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Add hover states to interactable elements
    const interactables = document.querySelectorAll('a, button, .product-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // 3. Hero 3D Scroll Interaction
    // We target the model-viewer and slightly animate its rotation/scale on scroll
    const modelViewer = document.querySelector('model-viewer');
    
    gsap.to(modelViewer, {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        scale: 1.2,
        y: 100, // Move down slightly
        ease: "none"
    });

    // Fake SplitText for basic reveal (since SplitText is premium GSAP)
    const titles = document.querySelectorAll('.hero-title');
    gsap.from(titles, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        delay: 1,
        ease: "power4.out"
    });

    const fadeUps = document.querySelectorAll('.fade-up');
    fadeUps.forEach(target => {
        gsap.from(target, {
            scrollTrigger: {
                trigger: target,
                start: "top 85%", // when top of element hits 85% of viewport
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // 4. Dynamic Theme Morphing
    const morphSections = document.querySelectorAll('.morph-section');
    const body = document.body;

    morphSections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 50%", // changing theme when section reaches halfway up
            end: "bottom 50%",
            onEnter: () => {
                body.className = '';
                body.classList.add(`theme-${section.dataset.theme}`);
            },
            onEnterBack: () => {
                body.className = '';
                body.classList.add(`theme-${section.dataset.theme}`);
            }
        });
    });

    // 5. Marquee Animation
    const marqueeTrack = document.querySelector('.marquee-track');
    
    // Simple infinite horizontal scroll
    gsap.to(marqueeTrack, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
    });

    // 6. Scroll To Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    scrollTopBtn.addEventListener('click', () => {
        // smooth scroll built-in or via gsap
        gsap.to(window, {
            scrollTo: 0, 
            duration: 1.5, 
            ease: "expo.inOut"
        });
    });
});
