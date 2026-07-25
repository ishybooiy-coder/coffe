import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    particles: THREE.Points | null;
    animationId: number;
  }>({ scene: null, camera: null, renderer: null, particles: null, animationId: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfaf6f1, 0.0008);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Coffee/gold tones
      const goldRatio = Math.random();
      if (goldRatio < 0.3) {
        colors[i3] = 0.78;
        colors[i3 + 1] = 0.66;
        colors[i3 + 2] = 0.49;
      } else if (goldRatio < 0.6) {
        colors[i3] = 0.24;
        colors[i3 + 1] = 0.14;
        colors[i3 + 2] = 0.08;
      } else {
        colors[i3] = 0.9;
        colors[i3 + 1] = 0.85;
        colors[i3 + 2] = 0.8;
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for glowing particles
    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      varying float vDistance;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vDistance = -mvPosition.z;
        gl_PointSize = size * (100.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vDistance;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - dist * 2.0;
        alpha *= 0.6;
        vec3 glow = vColor * (1.0 + alpha);
        gl_FragColor = vec4(glow, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add floating coffee bean shapes (small spheres)
    const beanGroup = new THREE.Group();
    const beanCount = 30;
    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x6b4226,
      roughness: 0.4,
      metalness: 0.3,
    });

    for (let i = 0; i < beanCount; i++) {
      const beanGeo = new THREE.SphereGeometry(0.3 + Math.random() * 0.4, 8, 8);
      const bean = new THREE.Mesh(beanGeo, beanMaterial);
      bean.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );
      bean.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      );
      bean.scale.set(1.5, 0.8, 1);
      beanGroup.add(bean);
    }
    scene.add(beanGroup);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xc8a87e, 0.5);
    scene.add(ambientLight);

    // Directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    // Point light
    const pointLight = new THREE.PointLight(0xc8a87e, 1, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    sceneRef.current = { scene, camera, renderer, particles, animationId: 0 };

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Scroll interaction
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll);

    // Animation loop
    let time = 0;
    const animate = () => {
      sceneRef.current!.animationId = requestAnimationFrame(animate);
      time += 0.003;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      if (particles) {
        particles.rotation.y = time + targetX * 0.3;
        particles.rotation.x = targetY * 0.2;
        particles.rotation.z = Math.sin(time) * 0.05;

        // Pulse effect
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          positions[i3 + 1] += Math.sin(time * 2 + i * 0.01) * 0.01;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      if (beanGroup) {
        beanGroup.rotation.y = time * 0.5;
        beanGroup.rotation.x = Math.sin(time * 0.3) * 0.1;
        beanGroup.children.forEach((bean, i) => {
          bean.position.y += Math.sin(time * 2 + i) * 0.003;
        });
      }

      // Camera parallax with scroll
      if (camera) {
        camera.position.y = -scrollY * 0.005;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const onResize = () => {
      if (!sceneRef.current?.camera || !sceneRef.current?.renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(sceneRef.current!.animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
  );
}
