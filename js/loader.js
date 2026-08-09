/* ==========================================================================
   THARANI K - 3D ANIMATED LOADER MODULE
   Handles 3D WebGL Torus Mesh & Floating Particles, progress counter, 
   and 3D perspective shutter transition
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const loaderScreen = document.getElementById('loader-screen');
  const progressBar = document.getElementById('loader-progress-bar');
  const counterText = document.getElementById('loader-counter');
  const body = document.body;

  // --- THREE.JS 3D PRELOADER ANIMATION ---
  const canvas = document.getElementById('loader-3d-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    initLoader3D(canvas);
  }

  let progress = 0;
  const interval = setInterval(() => {
    // Increment progress smoothly
    progress += Math.floor(Math.random() * 8) + 4;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      if (progressBar) progressBar.style.width = '100%';
      if (counterText) counterText.textContent = '100%';

      // Trigger 3D Exit & Shutter Reveal
      setTimeout(() => {
        if (loaderScreen) loaderScreen.classList.add('exiting');
        
        setTimeout(() => {
          body.classList.add('loaded');
          if (window.initHeroAnimations) {
            window.initHeroAnimations();
          }
        }, 600);
      }, 400);
    } else {
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (counterText) counterText.textContent = `${progress}%`;
    }
  }, 50);
});

// Three.js 3D WebGL Mesh & Particle Scene
function initLoader3D(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 4.5;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 1. Glowing 3D TorusKnot Geometry
  const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
  const material = new THREE.PointsMaterial({
    color: 0xff3300,
    size: 0.025,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const torusKnot = new THREE.Points(geometry, material);
  scene.add(torusKnot);

  // 2. Ambient Floating 3D Particles
  const particlesGeo = new THREE.BufferGeometry();
  const count = 400;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 12;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particlesMat = new THREE.PointsMaterial({
    color: 0xffaa00,
    size: 0.03,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  const particleSystem = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particleSystem);

  // Mouse Parallax Interaction
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Continuous 3D rotation
    torusKnot.rotation.x += 0.008;
    torusKnot.rotation.y += 0.012;
    particleSystem.rotation.y -= 0.003;

    // Smooth camera mouse follow
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  // Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
