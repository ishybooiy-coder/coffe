import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAPAnimations() {
  const isReady = useRef(false);

  const initAnimations = useCallback(() => {
    if (isReady.current) return;
    isReady.current = true;

    // Kill any existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach(st => st.kill());

    // ---- HERO ANIMATIONS ----
    // Hero title stagger
    gsap.from('.hero-title-word', {
      y: 100,
      opacity: 0,
      rotateX: -40,
      duration: 1.2,
      stagger: 0.12,
      ease: 'power4.out',
      delay: 0.5,
    });

    gsap.from('.hero-subtitle', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 1.2,
    });

    gsap.from('.hero-cta', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 1.6,
    });

    gsap.from('.scroll-indicator', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 2.2,
      ease: 'power2.out',
    });

    // ---- MARQUEE ----
    // Marquee auto-scroll handled by CSS

    // ---- ABOUT SECTION ----
    gsap.from('.about-label', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.about-heading', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    });

    gsap.from('.about-text', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // ---- STATS COUNTER ----
    document.querySelectorAll('.stat-number').forEach((el) => {
      gsap.to(el as HTMLElement, {
        textContent: 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: function () {
          el.textContent = Math.round(parseFloat(el.textContent)).toLocaleString();
        },
      });
    });

    // ---- PRODUCT CARDS ----
    gsap.from('.product-card', {
      scrollTrigger: {
        trigger: '.products-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out',
    });

    // ---- PROCESS SECTION ----
    gsap.from('.process-step', {
      scrollTrigger: {
        trigger: '.process-section',
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
      x: -60,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: 'power3.out',
    });

    gsap.from('.process-line', {
      scrollTrigger: {
        trigger: '.process-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.5,
      ease: 'power3.inOut',
    });

    // ---- GALLERY PARALLAX ----
    const galleryItems = gsap.utils.toArray<HTMLElement>('.gallery-item');
    galleryItems.forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60 + (i % 2) * 30,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
      });

      // Parallax effect
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        yPercent: i % 2 === 0 ? -5 : 5,
        ease: 'none',
      });
    });

    // ---- TESTIMONIALS ----
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // ---- CTA SECTION ----
    gsap.from('.cta-heading', {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    });

    gsap.from('.cta-button', {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
    });

    // ---- NAVBAR SCROLL EFFECT ----
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { className: 'nav-scrolled', targets: '.navbar' },
    });

    // ---- SMOOTH SCROLL LINKS ----
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // ---- PROGRESS BAR ----
    const progressBar = document.querySelector('.scroll-progress') as HTMLElement | null;
    if (progressBar) {
      gsap.to(progressBar, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
        scaleX: 1,
        ease: 'none',
      });
    }
  }, []);

  return { initAnimations, isReady };
}

// Custom cursor hook
export function useCustomCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let cursorX = 0, cursorY = 0;
    let currentX = 0, currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX - 10;
      cursorY = e.clientY - 10;
    };

    const animate = () => {
      currentX += (cursorX - currentX) * 0.15;
      currentY += (cursorY - currentY) * 0.15;
      cursor.style.left = currentX + 'px';
      cursor.style.top = currentY + 'px';
      requestAnimationFrame(animate);
    };

    animate();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, .product-card');
    const onEnter = () => cursor.classList.add('hover');
    const onLeave = () => cursor.classList.remove('hover');

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeChild(cursor);
    };
  }, []);
}
