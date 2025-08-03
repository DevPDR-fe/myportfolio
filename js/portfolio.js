document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) {
      alvo.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const h2 = document.getElementById("dev");
  const text = h2.textContent;
  h2.textContent = "";

  let index = 0;

  function typeLetter() {
    if (index < text.length) {
      h2.textContent += text.charAt(index);
      index++;
      setTimeout(typeLetter, 120);
    }
  }

  typeLetter();
});