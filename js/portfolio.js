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

  document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const group = entry.target.dataset.group;
        const index = parseInt(entry.target.dataset.index, 10);
        const delay = index * 0.2; // cada item +0.2s

        setTimeout(() => {
          entry.target.classList.add('active');
        }, delay * 1000);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // grupos na ordem desejada
  const animationGroups = [
    ['.text-subtitle', '.text-tagline'],
    ['.intro', '.name'],
    ['.description', '.btn'],
    ['.profile-pic'],
    ['.stat-card.left', '.stat-card.right']
  ];

  animationGroups.forEach((group, groupIndex) => {
    group.forEach((selector, index) => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('reveal');
        el.dataset.group = groupIndex;
        el.dataset.index = index;
        observer.observe(el);
      });
    });
  });
});