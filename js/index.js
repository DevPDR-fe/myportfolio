gsap.to(".bar", {
  width: "100%",
  duration: 3, // duração do carregamento
  ease: "power1.inOut",
  onComplete: () => {
    // Redirecionar após terminar
    window.location.href = "portfolio.html";
  }
});