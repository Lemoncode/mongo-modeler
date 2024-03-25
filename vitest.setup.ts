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

// Define the mock in the global Window object
global.window.matchMedia = createMatchMedia(window.innerWidth);
