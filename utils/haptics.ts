
export const triggerHaptic = (pattern: number | number[] = 15) => {
  // Verifica se o navegador suporta a API de vibração
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Falha silenciosa em dispositivos não suportados ou contextos restritos
    }
  }
};
