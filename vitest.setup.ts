// Match media mocking
function createMatchMedia(width: number) {
  return (query: string) => ({
    matches: query.includes(`${width}`),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Definir el mock en el objeto window global
global.window.matchMedia = createMatchMedia(window.innerWidth);
