window.addEventListener('load', function () {
    window.scrollTo(0, 0);
  });

document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) {
      alvo.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

  const contactToggle = document.getElementById('contactToggle');
  const contactMenu = document.getElementById('contactMenu');

  contactToggle.addEventListener('click', () => {
    contactMenu.style.display = contactMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', function (e) {
    if (!contactToggle.contains(e.target) && !contactMenu.contains(e.target)) {
      contactMenu.style.display = 'none';
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const h2 = document.getElementById("dev");
  const text = h2.textContent;

  h2.textContent = "";            
  h2.style.opacity = "0";          
  h2.style.transition = "opacity 0.3s ease-in";

  setTimeout(() => {
    h2.style.opacity = "1";        

    let index = 0;
    function typeLetter() {
      if (index < text.length) {
        h2.textContent += text.charAt(index);
        index++;
        setTimeout(typeLetter, 200);
      }
    }

    typeLetter();
  }, 1500);
});

window.addEventListener("load", () => {
    document.querySelectorAll('.wakanda').forEach(el => {
      el.classList.add('loaded');
    });
  });

  window.addEventListener("load", () => {
    document.querySelectorAll('.headline p').forEach(el => {
      el.classList.add('loaded');
    });
  });

  window.addEventListener("load", () => {
    document.querySelectorAll('.headline h2').forEach(el => {
      el.classList.add('loaded');
    });
  });

  window.addEventListener("load", () => {
    document.querySelectorAll('.contact-button').forEach(el => {
      el.classList.add('loaded');
    });
  });

  window.addEventListener("load", () => {
    document.querySelectorAll('.navbar').forEach(el => {
      el.classList.add('loaded');
    });
  });

  particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#000000"  // ← preto
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
    },
    "opacity": {
      "value": 0.5,
      "random": false
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#000000",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    },
    "modes": {
      "repulse": {
        "distance": 100,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});