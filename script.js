document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('timesule-canvas');
  const ctx = canvas.getContext('2d');
  const title = document.getElementById('timesule-title');
  const subtitle = document.getElementById('timesule-subtitle');
  const container = document.querySelector('.container');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  let particles = [];
  const particleCount = 5;
  let pathPosition = 0;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const pathSpeed = isMobile ? 0.006 : 0.004;
  const baseParticleSpeedY = isMobile ? 2 : 5;
  const baseParticleSize = isMobile ? 4 : 10;

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * baseParticleSize + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * baseParticleSpeedY - baseParticleSpeedY / 2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.1) this.size -= 0.05;
    }

    draw() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  function predefinedPath(t) {
    const x = t * canvas.width;
    const y = canvas.height / 2;
    return { x, y };
  }

  function createParticlesOnPath() {
    const position = predefinedPath(pathPosition);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(position.x, position.y));
    }
    pathPosition += pathSpeed;
    if (pathPosition > 2) {
      delete this
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createParticlesOnPath();
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].size <= 0.1) {
        particles.splice(i, 1);
        i--;
      }
    }

    if (pathPosition >= 0.45 && pathPosition <= 0.9) {
      title.style.opacity = (pathPosition - 0.45) * 4;
    } else if (pathPosition > 0.9) {
      title.style.opacity = 1;
    }

    if (pathPosition >= 0.55 && pathPosition <= 1) {
      subtitle.style.opacity = (pathPosition - 0.55) * 4;
    } else if (pathPosition > 1) {
      subtitle.style.opacity = 1;
    }

    if (particles.length > 0) {
      requestAnimationFrame(animateParticles);
    }
  }

  animateParticles();
});
