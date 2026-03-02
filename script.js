/*

    © 2026 Abilash Sanjayan. All rights reserved.
    Do not remove the attribution link to the original project repository without permission.
    https://github.com/abilash-dev/Portfolio

*/

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

function sendMessage() {
  const subject = document.getElementById('formSubject').value;
  const message = document.getElementById('formMessage').value;

  if (subject && message) {
    const mailtoLink = `mailto:contact@abilash.link?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Redirecting...</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding-top: 50px; color: #333; }
            a { color: #007BFF; text-decoration: none; font-weight: bold; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h3>Redirecting you to your email application...</h3>
          <p>If you are not redirected automatically, <a href="${mailtoLink}">click here</a>.</p>
          
          <script>
            setTimeout(function() {
              window.location.href = "${mailtoLink}";
            }, 1000);
          </script>
        </body>
        </html>
      `;
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      document.getElementById('formSubject').value = '';
      document.getElementById('formMessage').value = '';
    } else {
      alert('Pop-up blocked! Please allow pop-ups for this website to open your email client.');
    }

  } else {
    alert('All fields are required.');
  }
}

/*

    © 2026 Abilash Sanjayan. All rights reserved.
    Do not remove the attribution link to the original project repository without permission.
    https://github.com/abilash-dev/Portfolio

*/