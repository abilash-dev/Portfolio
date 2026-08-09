/*

    © 2026 Abilash Sanjayan. All rights reserved.
    Do not remove the attribution link to the original project repository without permission.
    https://github.com/abilash-dev/Portfolio

*/

// Canvas Background Animation
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    let numParticles = (width * height) / 15000;
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 243, 255, ${0.2 - dist/500})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function () {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const typewriterText = document.getElementById('typewriter-text');
const texts = ['IT Undergraduate', 'Web Developer', 'Desktop App Developer', 'Discord Bot Developer', 'Graphic Designer', 'Tech Explorer', 'Freelancer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typewriterText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeWriter, 3000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeWriter, 800);
  } else {
    setTimeout(typeWriter, isDeleting ? 100 : 150);
  }
}

typeWriter();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

async function sendMessage() {
  const subject = document.getElementById('formSubject').value;
  const email = document.getElementById('formEmail').value;
  const message = document.getElementById('formMessage').value;
  const output = document.getElementById('terminal-output');

  if (!subject || !email || !message) {
    if (output) output.innerHTML = '<span style="color: #ff3333;">[ERROR] Mission failed. All fields are required.</span>';
    else alert('All fields are required.');
    return;
  }

  if (output) {
    output.innerHTML = 'Encrypting payload...<br>';
    
    try {
        const response = await fetch('https://formspree.io/f/mvkpkple', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                subject: subject,
                email: email,
                message: message
            })
        });
        
        const result = await response.json();
        
        setTimeout(() => {
            output.innerHTML += 'Establishing secure connection to server...<br>';
            setTimeout(() => {
                if (response.status === 200) {
                    output.innerHTML += '<span style="color: #00f3ff;">[SUCCESS] Payload delivered successfully. Secure connection closed.</span>';
                    document.getElementById('formSubject').value = '';
                    document.getElementById('formEmail').value = '';
                    document.getElementById('formMessage').value = '';
                } else {
                    output.innerHTML += `<span style="color: #ff3333;">[ERROR] Transmission failed: ${result.error || 'Server rejected the request.'}</span>`;
                }
            }, 600);
        }, 600);
    } catch (error) {
        setTimeout(() => {
            output.innerHTML += '<span style="color: #ff3333;">[ERROR] Connection terminated unexpectedly. Network failure.</span>';
        }, 800);
    }
  }
}

/*

    © 2026 Abilash Sanjayan. All rights reserved.
    Do not remove the attribution link to the original project repository without permission.
    https://github.com/abilash-dev/Portfolio

*/